module.exports = (errors, loggers) => {
    return (err, req, res, next) => {
        // Default Error Details
        const defaultDetails = {
            status: 500,
            message: 'Something failed!',
            logError: true
        }

        let response = errors.filter( error => error.key === err.message ).pop()

        if ( !response ) response = defaultDetails
        
        // Get the error response details relevant to this error
        let { status, message, logError } = response;

        // Should I log this error?
        if ( logError ) {
            // Run each of the loggers
            loggers.map( logger => logger({
                response,
                err,
                req
            }))
        }

        // Send the error response
        res.status( status ).json({ error: message })
    }
}