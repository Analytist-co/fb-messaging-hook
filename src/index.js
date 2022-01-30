import express from 'express'
import { routes } from './routes.js'
import { config } from './config.js'

const app = express()

app.listen(config.port, () => console.log(`webhook is listening on port ${config.port}`))

app.use('/', routes)

export { app }