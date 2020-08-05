import { Request, Response } from 'express'

import db from "../database/connection"
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default class ClassesController {
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
        subject,
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
