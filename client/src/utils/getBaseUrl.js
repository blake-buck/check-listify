function getBaseUrl(){
    if(process.env.VUE_APP_ENVIRONMENT === 'local'){
        return 'http://localhost:9090'
    }

    if(process.env.VUE_APP_ENVIRONMENT === 'prod'){
        return 'http://localhost:3000'
    }

    throw new Error('Environment not recognized.')
}

module.exports = {
    getBaseUrl
}