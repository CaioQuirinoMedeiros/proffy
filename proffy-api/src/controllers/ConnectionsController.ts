import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Connection from '../entities/Connection'

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    const connectionsRepository = getRepository(Connection)

    const connections = await connectionsRepository.count()

    return response.status(200).send({ total: connections })
  }

  async create(request: Request, response: Response) {
    const { user_id: teacher_id } = request.body
    const { user_id } = request

    const connectionsRepository = getRepository(Connection)

    const connectionExists = await connectionsRepository.findOne({
      where: { user_id, teacher_id }
    })

    if (connectionExists) {
      return response.status(204).send()
    }

    const connection = connectionsRepository.create({ user_id, teacher_id })

    await connectionsRepository.save(connection)

    return response.status(201).send()
  }
}
