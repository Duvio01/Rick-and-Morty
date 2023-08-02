const axios = require('axios')
const URL = "https://rickandmortyapi.com/api/character/"

const getCharById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await axios(URL + id)
        if(response){
            const { name, gender, species, origin, image, status} = response.data
            const character = { id, name, gender, species, origin, image, status}
            return res.status(200).json(character) 
        }
        return res.status(404).send('Character not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getCharById
