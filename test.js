const errorHandler = require('./index'),
      express = require('express'),
      app = express()


app.get('/', (req, res, next) => {
    throw new Error('cors/origin')
})

const errors = [
    {
        key: 'cors/origin',
        status: 400,
        message: 'Origin not allowed by CORS',
        logError: true
    }
]

const loggers = [
    logData => {
        console.log({
            response: logData.response,
            message: logData.err.message,
            req: `${logData.req.method.toUpperCase()} ${logData.req.path}`,
            logger: 'Logger 1'
        })
    },
    logData => {
        console.log({
            response: logData.response,
            message: logData.err.message,
            req: `${logData.req.method.toUpperCase()} ${logData.req.path}`,
            logger: 'Logger 2'
        })
    }
]

app.use( errorHandler(errors, loggers) )


app.listen( 3000, () => console.log(`Let's catch these errors...`))