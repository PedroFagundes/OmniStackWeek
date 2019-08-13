const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index(request, response) {
    const { user } = request.headers

    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ]
    })

    return response.json(users)
  },

  async store(request, response) {
    const { username } = request.body

    const userExists = await Dev.findOne({ username })

    if (userExists) {
      return response.json(userExists)
    }

    const api_response = await axios.get(`https://api.github.com/users/${username}`)

    const { name, bio, avatar_url: avatar } = api_response.data

    const dev = await Dev.create({
      name,
      username,
      bio,
      avatar
    })

    return response.json(dev)
  }
}