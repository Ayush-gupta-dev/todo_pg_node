const {Pool} = require("pg")

const pool = new Pool({
    user:"postgres",
    password:"123",
    database:"perntodo",
    port: 5432,
    host: "db"

})

module.exports=pool;