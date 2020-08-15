import { createConnection, getConnectionOptions } from 'typeorm'

getConnectionOptions().then(connectionOptions => {
  console.log("connectionOptions", connectionOptions)
})

createConnection()
  .then(() => {
    console.log('Conexões com banco de dados estabelecidas')
  })
  .catch((err) => {
    console.log('Erro ao conectar com banco de dados', err)
  })
