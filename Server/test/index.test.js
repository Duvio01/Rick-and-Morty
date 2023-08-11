const server = require('../src/app')
const session = require('supertest')
const agent = session(server)

describe('Test de rutas', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async()=> {
            await agent.get('/rickandmorty/character/1').expect(200)
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async()=>{
            const response = await agent.get('/rickandmorty/character/1')
            const props = ["id", "name", "species", "gender", "status", "origin", "image"]
            props.forEach((prop)=> {
                expect(response.body).toHaveProperty(prop)
            })
        })

        it('Si hay un error responde con status: 500', async() => {
            await agent.get('/rickandmorty/character/10000').expect(500)
        })
    })
})

describe("GET /rickandmorty/login", () => {
    it('Si la informacion de login es correcta', async()=>{
        const access = { access: true}
        const response = await agent.get('/rickandmorty/login?email=jerdate01@gmail.com&password=Pruebas1')
        expect(response.body).toEqual(access)
    })

    it('La informacion de login es incorrecta', async() => {
        const access = {error: "Contraseña incorrecta"}
        const response = await agent.get('/rickandmorty/login?email=jerdate01@gmail.com&password=Pruebas12')
        expect(response.body).toEqual(access)
    })
})

let character1
beforeEach(()=>{
    character1 = {
        id: 1,
        name: 'Rick Sanchez',
        species: 'Human',
        gender: 'Male',
        status: 'Alive',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    }

    return character1
})

describe("POST /rickandmorty/fav", () => {
    const character2 = {
        id: 158,
        name: 'Hookah Alien',
        species: 'Alien',
        gender: 'unknown',
        status: 'Alive',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/158.jpeg'
    }
    it('Devuelve el elemento en un array', async()=>{
        const response = await agent.post('/rickandmorty/fav').send(character1)
        expect(response.body).toContainEqual(character1)
    })

    it('Devuelve el elemento previamente creado', async()=>{
        const response = await agent.post('/rickandmorty/fav').send(character2)
        expect(response.body).toContainEqual(character1) 
        expect(response.body).toContainEqual(character2) 
    })
})

describe('DELETE /rickandmorty/fav/:id', ()=>{
    const character2 = { 
        id: 158,
        name: 'Hookah Alien',
        species: 'Alien',
        gender: 'unknown',
        status: 'Alive',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/158.jpeg'
    }

    it('Devuelve un arreglo si no se elimina ningun personaje', async()=> {
        const response = await agent.delete('/rickandmorty/fav/45')
        expect(response.body).toContainEqual(character1)
        expect(response.body).toContainEqual(character2)
    })

    it('Elimina correctamente al personaje con el ID especificado', async()=> {
        const response = await agent.delete('/rickandmorty/fav/1') 
        expect(response.body).toContainEqual(character2)
    })
})