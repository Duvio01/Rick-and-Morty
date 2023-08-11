const server = require('./app')
const { conn } = require('./DB_connection')
const PORT = 3001

server.listen(PORT, async() => {
    await conn.sync({force:true})
    console.log('Puerto escuchando en puerto ' + PORT)
})