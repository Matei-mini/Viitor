import mysql from "mysql2/promise";

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mateiemil2018",
    database: "mywebsite",
    waitForConnections: true,
    connectionLimit: 10,
};

if (!global._mysqlPool) global._mysqlPool = mysql.createPool(config);
export const db = global._mysqlPool;