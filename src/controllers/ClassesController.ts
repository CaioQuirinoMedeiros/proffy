import { Request, Response } from 'express'

import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'
import { removeAccents } from '../utils/removeAccents'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

interface Filters {
  week_day: string
  subject: string
  time: string
}

export default class ClassesController {
  async index(request: Request<any, any, any, Filters>, response: Response) {
    const filters = request.query

    try {
      if (!filters.week_day || !filters.subject || !filters.time) {
        return response
          .status(400)
          .send({ error: 'Falta de parametros do filtro' })
      }

      const timeInMinutes = convertHourToMinutes(filters.time)
      const subjectNormalized = removeAccents(filters.subject).toLowerCase()

      const classes = await db('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [
              Number(filters.week_day)
            ])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', 'like', subjectNormalized)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])

      return response.status(200).send(classes)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ error: 'Erro inesperado ao listar aulas' })
    }
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body

    const trx = await db.transaction()

    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })

      const [class_id] = await trx('classes').insert({
        subject: removeAccents(subject).toLowerCase(),
        cost,
        user_id
      })

      const class_schedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id
        }
      })

      await trx('class_schedule').insert(class_schedule)

      await trx.commit()

      return response.status(201).send()
    } catch {
      await trx.rollback()

      return response
        .status(400)
        .send({ error: 'Erro inesperado ao criar aula' })
    }
  }
}
