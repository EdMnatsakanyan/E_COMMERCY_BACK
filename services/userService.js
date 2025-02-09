const User = require('../models/userModel')

const createUser = async(user) => {
    const userWithSameEmail = await User.findOne({
        where: { email: user.email }
    })
    const userWithSameUsername = await User.findOne({
        where: {username: user.username}
    })

    if(userWithSameEmail) throw new Error('user with that email already exists')

    await User.create(user)
}

const getUsers = async() => {
    let users = await User.findAll()
    users = users.map(user => user.dataValues)

    return users
}

const findUserByEmail = async(email) => {
    const findedUser = await User.findOne({
        where: {email: email}
    })

    return findedUser.dataValues
}

const findUserByUsername = async(username) => {
    const findedUser = await User.findOne({
        where: {username: username}
    })

    if(!findedUser){
        throw new Error('no user with that username')
    }
    return findedUser.dataValues
}

const findUserById = async(id) => {
    const findedUser = await User.findOne({
        where: {id: id}
    })

    if(!findedUser) throw new Error ('no user with such id')

    return findedUser.dataValues
}

const deleteUserById = async(id) => {
    const findedUser = await User.findOne({
        where: {id: id}
    })

    if(!findedUser) throw new Error ('no user with such id')

    await User.destroy({
        where: {id: id}
    })
}

module.exports = {
    deleteUserById,
    createUser,
    getUsers,
    findUserByEmail,
    findUserByUsername,
    findUserById
}