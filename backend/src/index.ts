import express from 'express'
import cors from 'cors'
import eventsRouter from './routes/events'
import categoriesRouter from './routes/category'

const app = express();

app.use(cors())

app.get("/", (req, res) => {
  res.send("home")
})

app.use("/api/events/", eventsRouter)

app.use("/api/categories/", categoriesRouter)

app.listen(3000)