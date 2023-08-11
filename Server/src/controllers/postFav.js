const { Favorite } = require('../DB_connection')

const postFav = async(req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body
        if(!name || !origin || !status || !image || !species || !gender) return res.status(401).json( {error: 'Faltan datos'} )
        
        const addFavorite = await Favorite.findOrCreate({
            where: { id },
            defaults: {
                name,
                origin,
                status,
                image,
                species,
                gender,
            }
        })

        const allFavorites = await Favorite.findAll()
        res.status(200).json(allFavorites) 
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = postFav