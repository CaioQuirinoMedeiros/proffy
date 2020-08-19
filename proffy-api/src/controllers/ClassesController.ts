import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'
import { getRepository } from 'typeorm'

import Class from '../entities/Class'
import Schedule from '../entities/Schedule'

interface CreateClassRequestBody {
  whatsapp: string
  subjects: string[]
  bio: string
  cost: number
  schedule: Array<{
    week_day: number
    from: string
    to: string
  }>
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const { week_day, subject, time, limit = '10', page = '1' } = request.query
    const { user_id } = request

    const limitNumber = Number(limit)
    const pageNumber = Number(page)

    const classesRepository = getRepository(Class)

    const skip = (pageNumber - 1) * limitNumber

    const query = classesRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.schedules', 'schedule')
      .leftJoinAndSelect('class.user', 'user')

    const subQuery = query
      .subQuery()
      .select('class_schedule.*')
      .from(Schedule, 'class_schedule')
      .where('class_schedule.class_id = class.id')

    if (week_day) {
      subQuery.andWhere('class_schedule.week_day = :week_day')
    }
    if (time) {
      subQuery.andWhere('class_schedule.from <= :time')
      subQuery.andWhere('class_schedule.to > :time')
    }

    query.where(`exists ${subQuery.getSql()}`)

    if (subject) {
      query.andWhere(':subject ilike ANY(class.subjects)')
    }

    const [classes, count] = await query
      .where('class.user_id != :user_id')
      .setParameters({ week_day, time, subject, user_id })
      .printSql()
      .skip(skip)
      .take(limitNumber)
      .getManyAndCount()

    const pages = Math.ceil(count / limitNumber)

    return response
      .status(200)
      .send({ pages, count, classes: classToClass(classes) })
  }

  async show(request: Request, response: Response) {
    const { user_id } = request

    const classesRepository = getRepository(Class)

    const my_class = await classesRepository.findOne({
      where: { user_id },
      relations: ['schedules']
    })

    return response.status(200).send(my_class)
  }

  async create(
    request: Request<any, any, CreateClassRequestBody>,
    response: Response
  ) {
    const { whatsapp, bio, subjects, cost, schedule } = request.body
    const user_id = request.user_id

    const classesRepository = getRepository(Class)
    const scheduleRepository = getRepository(Schedule)

    let teacher_class = await classesRepository.findOne({ user_id })

    if (!teacher_class) {
      teacher_class = classesRepository.create({
        bio,
        subjects,
        cost,
        user_id
      })
    }

    await classesRepository.save(
      Object.assign(teacher_class, { whatsapp, bio, subjects, cost })
    )

    await scheduleRepository
      .createQueryBuilder('class')
      .delete()
      .where('class_id = :class_id', { class_id: teacher_class.id })
      .execute()

    const classSchedule = scheduleRepository.create(
      schedule.map((scheduleItem) => ({
        week_day: scheduleItem.week_day,
        from: scheduleItem.from,
        to: scheduleItem.to,
        class_id: teacher_class?.id
      }))
    )

    await scheduleRepository.save(classSchedule)

    return response.status(201).send({ teacher_class, classSchedule })
  }
}
