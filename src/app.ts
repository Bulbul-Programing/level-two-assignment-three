import express, { Application, Request, Response } from 'express'
const app : Application = express()
const port = 3000
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

app.use(express.json())
app.use(cors())

app.use('/api', router)
app.use(globalErrorHandler)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

export default app