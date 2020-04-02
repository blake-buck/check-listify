const mysql = require('mysql');


const {AWS_RDS_HOST, AWS_RDS_PORT, AWS_RDS_USER, AWS_RDS_PASSWORD, AWS_RDS_DATABASE} = process.env;

// creates connections to RDS instance
const connection = mysql.createConnection({
    host:AWS_RDS_HOST,
    port:AWS_RDS_PORT,   
    user:AWS_RDS_USER,  
    password:AWS_RDS_PASSWORD,
    database:AWS_RDS_DATABASE,
    timeout:15000
});



// takes a mysql.query() call and returns a promise
// takes in a string representing the SQL statement and an array of parameters -> order is important on those parameters
async function queryToPromise(queryString, parameters){
    return new Promise((resolve, reject) => {
        connection.query(
            queryString,
            parameters,
            (err, results, field) => {
                if(err){
                    reject(err);
                }
                if(results){
                    resolve(results);
                }
                reject('An unexpected error occured')
            }
        )
    })
}

module.exports = {
    queryToPromise
}