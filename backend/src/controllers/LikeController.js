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

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = request.connectedUsers[user]
      const targetSocket = request.connectedUsers[targetId]

      if (loggedSocket) {
        request.io.to(loggedSocket).emit('match', targetDev)
      }

      if (targetSocket) {
        request.io.to(targetSocket).emit('match', loggedDev)
      }
    }

    loggedDev.likes.push(targetDev._id)

    await loggedDev.save()

    return response.json(loggedDev)
  }
}