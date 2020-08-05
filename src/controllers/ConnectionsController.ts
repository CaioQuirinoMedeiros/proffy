import { Request, Response } from 'express'

import db from '../database/connection'

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    try {
      const [connections] = await db('connections').count('* as total')

      return response.status(200).send({ total: connections.total })
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ error: 'Erro inesperado ao criar aula' })
    }
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body

    try {
      await db('connections').insert({ user_id })

      return response.status(201).send()
    } catch {
      return response
        .status(400)
        .send({ error: 'Erro inesperado ao criar conexão' })
    }
  }
}
