const express = require('express')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const tagRouter = require('./routes/tag.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', tagRouter)
app.use('/auth', authRouter)

const start = async () => {
  try {
    app.listen(PORT, () => console.log('server started on port ' +  PORT))
  } catch (e) {
    console.log(e)
  }
}

start()