const {createPool} = require("mysql");
const path = require("path")
const dotenv = require("dotenv")

dotenv.config({path: path.resolve(__dirname,"../.env")});

const pool = createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
pool.getConnection((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database Connected..")
    }
})

module.exports= pool;