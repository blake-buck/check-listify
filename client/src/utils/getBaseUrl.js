function getBaseUrl(){
    if(process.env.VUE_APP_ENVIRONMENT === 'local'){
        return 'http://localhost:9090'
    }

    if(process.env.VUE_APP_ENVIRONMENT === 'prod'){
        return 'https://check-listify.com'
    }

    throw new Error('Environment not recognized.')
}

module.exports = {
    getBaseUrl
}