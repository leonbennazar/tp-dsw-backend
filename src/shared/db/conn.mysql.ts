import mysql from 'mysql2/promise'
import 'dotenv/config'

// un pool de conexiones permite mantener varias conexiones abiertas al mismo tiempo 
// en espera a que se vayan a utilizar

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // máximo de conexiones inactivas
    idleTimeout: 60000, // tiempo máximo de inactividad
    queueLimit: 0,
    enableKeepAlive: true, //evita que de timeout del lado del servidor
    keepAliveInitialDelay: 0,
})
//le estamos informando cuanto tiempo necesitamos que las conexiones queden activas 
// cuanto es el maximo de conexiones activas e inactivas