# Errora

> Configurable Error Handler Middleware for ExpressJS.


## Install

```bash
npm i -s errora
```

## Usage

Import the middleware

```JavScript
const errora = require('errora')
```

Register this middleware with Express AFTER every other middleware. 

```JavaScript
app.use(errora(errors, loggers))
```

The middleware takes in two parameters, errors and loggers.

The **first argument** is an array of objects containing the definitions for each custom error
These definitions will tell the handler what message to give, which error status code to pass and whether or 
not to log that error with the loggers provided.

```JavaScript
[
    {
        key(required): <error key>,       // The value to be passed into new Error(<here>) to trigger this error
        status: <http status code>,       // Will be the status sent in the response
        message: <custom error message>,
        logError: <boolean>               // Signifies whether or not to log the error using the loggers
        ...
        <any other data added here will be available to the loggers>
    }
]
```

The **second argument** is an array of loggers. A logger is a function with a logging function inside of it. You may use whatever logger you like. The function wrapped around the logger should take 1 parameter which will have the error details, request scope, and the response details. 

```JavaScript
[
    (logData) => {
        const { 
            response, // Object of the triggered error's response (or the default response if none)
            err,      // Error object
            req       // Request object
        } = logData

        // Logger of your choice
        logger.error({
            message: err.message,
            stack: err.stack,
            method: req.method,
            body: req.body,
            params: req.params,
            path: req.path
        })
    }
]
```

If an error is passed to the handler that isn't found in the list, it uses the default settings:

```JavaScript
{
    status: 500,
    message: 'Something failed!',
    logError: true
}
```

## License

[MIT](http://vjpr.mit-license.org)
