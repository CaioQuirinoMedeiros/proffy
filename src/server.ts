import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

const PORT = process.env.PORT || 3333

app.listen(3333, () => {
  console.log(`server running at port ${PORT}`)
})
