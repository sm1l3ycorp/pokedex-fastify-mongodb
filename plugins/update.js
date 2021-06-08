const schemas = require('../schemas/update')

const Update = async (fastify, ops, next) => {
  fastify.route({
    method: 'PATCH',
    url: '/Update',
    schema: schemas.update,
    handler: async (request, reply) => {
      try {
        const { number } = request.query
        const { name } = request.body
        const db = fastify.mongo.client.db('PokeMongo')
        if (number && name) {
          const myquery = { number: parseInt(number, 10) }
          const newvalues = { $set: { name: name.toString() } }
          const update = await db.collection('Pokemon').updateOne(myquery, newvalues)
          if (update.result.ok) {
            reply.code(200).send()
          } else {
            reply.code(500).send()
          }
        } else {
          reply.code(400).send()
        }
      } catch (error) {
        console.log(error)
        reply.code(500).send()
      }
    },
  })
  next()
}

module.exports = Update
