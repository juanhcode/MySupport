const Pool = require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
    user: process.env.POSTGRESQL_ADDON_USER,
    host: process.env.POSTGRESQL_ADDON_HOST,
    database: process.env.POSTGRESQL_ADDON_DB,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    port: 5432
});

pool.connect((err,connection)=>{
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATBASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection){
        connection.release();
    }
    console.log('DB Conectada');
    return;
})

module.exports = pool;