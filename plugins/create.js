const schemas = require('../schemas/create')

const Create = async (fastify, ops, next) => {
  fastify.route({
    method: 'POST',
    url: '/Create',
    schema: schemas.update,
    handler: async (request, reply) => {
      try {
        const { number, name, type } = request.body
        const db = fastify.mongo.client.db('PokeMongo')
        if (number && name && type) {
          const myquery = {
            number: parseInt(number, 10), name: name.toString(), type,
          }
          const create = await db.collection('Pokemon').insertOne(myquery)
          if (create.result.ok) {
            reply.code(201).send()
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

module.exports = Create
