import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

const app: express.Application = express()

//Initalise environment variables
const webRoot: string = path.join(
  __dirname,
  __dirname.split('/').pop() === 'build' ? '../../' : '../'
)
dotenv.config({
  path: path.join(webRoot, '.env')
})

//--------------------------------------------Middleware-----------------------------------------------
app.use(express.json())
//----------------------------------------End of Middleware---------------------------------------------

//Routes

//Serve in Production
if (process.env.NODE_ENV == 'production') {
  console.log('Starting in Produciton mode.')
  app.use(express.static(path.join(webRoot, 'client/build')))
  app.use('/assets', express.static(path.join(webRoot, 'assets')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(webRoot, 'client/build/index.html'))
  })
}

//Listen in on port and print what port
app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), () => {
  console.log(`Server started on port: ${app.get('port')}`)
})
