import express from 'express'

const app = express()

app.use(express.json())

app.get('/users', (request, response) => {
  console.log(request.body)
  return response.send({ ola: 'mundo' })
})

app.listen(3333, () => {
  console.log('server running at 33333')
})
