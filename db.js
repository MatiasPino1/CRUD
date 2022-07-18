const mysql=require("mysql")
const util=require("util")
const pool=mysql.createPool({
    connectionLimit:10,
    host:process.env.db_host,
    user:process.env.db_user,
    database:process.env.db_name,
    password:process.env.db_pass
})

pool.query=util.promisify(pool.query)
module.exports=pool;