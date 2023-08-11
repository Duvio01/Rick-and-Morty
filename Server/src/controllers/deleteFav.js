const { Favorite } = require('../DB_connection')

const deleteFav = async(req, res) => {
    try {
        const { id } = req.params

        const deleteFavorite = await Favorite.findByPk(id)
        if(deleteFavorite) await deleteFavorite.destroy()
        const allFavorites = await Favorite.findAll()

        res.status(200).json(allFavorites) 

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteFav