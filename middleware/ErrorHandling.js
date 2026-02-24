const errors = (error, req, res, next) => {
    if (error.status) {
        res.status(error.status).json({message: error.message})
    }
    else {
        res.status(500).json({message: 'Something went wrong in the server'})
    }
}

module.exports = errors