const mysql = require('mysql');
const {AWS_RDS_HOST, AWS_RDS_PORT, AWS_RDS_USER, AWS_RDS_PASSWORD, AWS_RDS_DATABASE} = process.env;

const connection = mysql.createConnection({
    host:AWS_RDS_HOST,
    port:AWS_RDS_PORT,   
    user:AWS_RDS_USER,  
    password:AWS_RDS_PASSWORD,
    database:AWS_RDS_DATABASE,
    timeout:15000
});

async function addUserToTable(userId){
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO users(Id, ThemeId, LineThrough, Opacity) VALUES(?, 1, 1, 1)', 
            [userId],
            (err, results, fields) => {
                if(err){
                    reject(err.message);
                }
                resolve(`User ${userId} has been added to table.`)
            }
        )
    })
}


module.exports = {
    addUserToTable
}