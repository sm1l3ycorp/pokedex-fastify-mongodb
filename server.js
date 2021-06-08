const fastify = require('fastify')()
fastify.register(require('fastify-helmet'))
fastify.register(require('fastify-mongodb'), {
  url: 'mongodb://localhost:27017/PokeMongo',
})
fastify.register(require('fastify-cors'), {
  origin: '*',
})

fastify.register(require('./plugins/create'), { prefix: '/api/' })
fastify.register(require('./plugins/pokemon'), { prefix: '/api/' })
fastify.register(require('./plugins/update'), { prefix: '/api/' })
fastify.register(require('./plugins/delete'), { prefix: '/api/' })

try {
  fastify.get('/ping', async () => 'pong\n')
  fastify.listen(1337, '::')
} catch (error) {
  console.log(error)
  process.exit(1)
}
