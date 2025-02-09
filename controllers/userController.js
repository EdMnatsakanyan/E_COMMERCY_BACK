const userService = require('../services/userService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = process.env.secret_key

const userRegister = async(req, res) => {
    const {username, email, password, name, surname, bio} = req.body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username || username.length < 3) {
        return res.status(400).json({message: "wrong username format"})
    } else if (!password || typeof(password) !== 'string' || password.length < 4){
        return res.status(400).json({message: "wrong password format"})
    } else if (!email || !emailRegex.test(email)) {
        return res.status(400).json({message: "wrong email format"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {username, email, password: hashedPassword, name, surname, bio}

    try {
        await userService.createUser(newUser)
        return res.status(201).json({message: "user created successfully"})
    } catch(err) {
        console.log(err.stack)
        return res.status(500).json({message: err.message})
    }
}

const userLogin = async(req, res) => {
    const {password, username} = req.body

    if (!username || username.length < 3) {
        return res.status(400).json({message: "wrong username format"})
    } else if (!password || typeof(password) !== 'string' || password.length < 4){
        return res.status(400).json({message: "wrong password format"})
    } 

    let finded

    try {
        finded = await userService.findUserByUsername(username)
        if(!finded) {
            return res.status(400).json({message: 'user not found'})
        }
        const areSame = await bcrypt.compare(password, finded.password)
    
        if(!areSame) {
            return res.status(400).json({message: "wrong password"})
        }

    } catch(err) {
        console.log(err.stack)
        return res.status(400).json({message: err.message})
    }


    const token = jwt.sign({user: finded}, secret_key, {expiresIn: '1h'})

    return res.status(200).json({
            id: finded.id,
            username: finded.username,
            email: finded.email,
            name: finded.name,
            surname: finded.surname,
            bio: finded.bio,
            token: token
        })
}

const getAllUsers = async(req, res) => {
    try{
        const users = await userService.getUsers()
        return res.status(200).json(users)
    } catch(err){
        console.log(err.stack)
        return res.status(400).json({message: 'something went wrong'})
    }
}

const getUserById = async(req, res) => {
    let {id} = req.params
    id = Number(id)

    if(!(id === Math.floor(id))){
        return res.status(400).json({message: 'id must be intenger'})
    }

    try {
        const finded = await userService.findUserById(id)
        return res.status(200).json(finded)
    } catch(err) {
        console.log(err.stack)
        return res.status(500).json({message: err.message})
    }
}

const deleteUser = async(req, res) => {
    let {id} = req.params
    id = Number(id)

    if(!(id === Math.floor(id))){
        return res.status(400).json({message: 'id must be intenger'})
    }

    try {
        await userService.deleteUserById(id)
        return res.status(200).json({message: "deleted successfully"})
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    getUserById,
    userRegister,
    userLogin,
    getAllUsers,
    deleteUser
}