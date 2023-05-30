import { createConnection, getConnectionOptions } from 'typeorm'
import Class from '../entities/Class'
import Connection from '../entities/Connection'
import Schedule from '../entities/Schedule'
import User from '../entities/User'
import UserToken from '../entities/UserToken'

getConnectionOptions().then((connectionOptions) => {
  console.log('connectionOptions', connectionOptions)
  createConnection({
    ...connectionOptions,
    entities: [Class, Connection, Schedule, User, UserToken]
  })
    .then(() => {
      console.log('Conexões com banco de dados estabelecidas')
    })
    .catch((err) => {
      console.log('Erro ao conectar com banco de dados', err)
    })
})
