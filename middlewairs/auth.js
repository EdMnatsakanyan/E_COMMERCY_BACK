const secret_key = process.env.secret_key
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'unauthorized'})
    }

    try {
        const {user} = jwt.verify(token, secret_key)

        if(!user) {
            return res.status(401).json({message: "unauthorized"})
        }

        req.user = user
        next()
    } catch {
        return res.status(401).json({message: "unauthorized"})
    }
}

module.exports = auth