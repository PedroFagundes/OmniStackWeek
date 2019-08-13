const Dev = require('../models/Dev')

module.exports = {
  async store(request, response) {
    const { targetId } = request.params
    const { user } = request.headers

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(targetId)

    if (!targetDev) {
      return response.status(400).json({ error: "Dev doesn't exist" })
    }

    loggedDev.dislikes.push(targetDev._id)

    await loggedDev.save()

    return response.json(loggedDev)
  }
}