const { User } = require('../DB_connection')

const login = async(req, res) => {
    try {
        const { email, password } = req.query

        if(!email || !password) return res.status(400).json({ error: 'Faltan datos' })

        const isUser = await User.findAll({
            where:{
                email
            }
        })
        if(isUser.length == 0) return res.status(404).json({ error: 'Usuario no encontrado' })
        if(isUser[0].dataValues.password != password) return res.status(403).json({ error: 'Contraseña incorrecta' })
        return res.status(200).json({ access: true })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = login