const http = require('http')
const data = require('./utils/data')
const url = require('url')

http.createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*')
    
    const id = request.url.split('/')[3]
    if(request.url === `/rickandmorty/character/${id}`){
        const characterFind = data.find(character => character.id === Number(id))
        if(characterFind){
            response.writeHead(200, { 'Content-Type': 'application/json'})
            response.end(JSON.stringify(characterFind))
        }else{
            response.writeHead(404, { 'Content-Type': 'application/json'})
            response.end(JSON.stringify(characterFind))
        }
    }

}).listen('3001', 'localhost')