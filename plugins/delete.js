const schemas = require('../schemas/delete')

const Delete = async (fastify, ops, next) => {
  fastify.route({
    method: 'DELETE',
    url: '/Delete',
    schema: schemas.remove,
    handler: async (request, reply) => {
      try {
        const { number, name } = request.query
        const db = fastify.mongo.client.db('PokeMongo')
        if (number && !name) {
          const myquery = { number: parseInt(number, 10) }
          const remove = await db.collection('Pokemon').deleteOne(myquery)
          if (remove.result.ok) {
            reply.code(200).send()
          } else {
            reply.code(500).send()
          }
        } else if (!number && name) {
          const myquery = { name: name.toString() }
          const remove = await db.collection('Pokemon').deleteOne(myquery)
          if (remove.result.ok) {
            reply.code(200).send()
          } else {
            reply.code(500).send()
          }
        } else if (number && name) {
          const myquery = { number: parseInt(number, 10), name: name.toString() }
          const remove = await db.collection('Pokemon').deleteOne(myquery)
          if (remove.result.ok) {
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

module.exports = Delete
