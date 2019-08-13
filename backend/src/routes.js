const express = require('express')
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router()

routes.get('/devs', DevController.index)
routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' })
})

routes.post('/devs', DevController.store)

routes.post('/devs/:targetId/likes', LikeController.store)
routes.post('/devs/:targetId/dislikes', DislikeController.store)

module.exports = routes