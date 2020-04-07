function getBaseUrl(){
    if(process.env.VUE_APP_ENVIRONMENT === 'local'){
        return 'http://localhost:9090'
    }

    throw new Error('Environment not recognized.')
}

module.exports = {
    getBaseUrl
}