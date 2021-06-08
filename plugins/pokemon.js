/* eslint-disable consistent-return */
/* eslint-disable no-inner-declarations */
const schemas = require('../schemas/pokemon')

const Pokemon = async (fastify, ops, next) => {
  fastify.route({
    method: 'GET',
    url: '/Pokemon',
    schema: schemas.Pokemon,
    handler: async (request, reply) => {
      try {
        const { number, name, type } = request.query
        const db = fastify.mongo.client.db('PokeMongo')
        // eslint-disable-next-line no-use-before-define
        db.collection('Pokemon', onCollection)

        async function onCollection(err, col) {
          if (err) return reply.code(500).send(err)
          // return all
          if (!name && !number && !type) {
            const pokemon = await db.collection('Pokemon').find().toArray()
            reply.send(pokemon)
          }
          // return pokemon by number
          if (!name && number && !type) {
            col.findOne({ number: parseInt(number, 10) }, (err, pokemon) => {
              reply.send(pokemon)
            })
          }
          // return pokemon by name and number
          if (name && number && !type) {
            col.findOne({ name, number: parseInt(number, 10) }, (err, pokemon) => {
              reply.send(pokemon)
            })
          }
          // return pokemon by name
          if (name && !number && !type) {
            col.findOne({ name }, (err, pokemon) => {
              reply.send(pokemon)
            })
          }
          // return all pokemon by type
          if (!name && !number && type) {
            const pokemon = await db.collection('Pokemon').find({ type }).toArray()
            reply.send(pokemon)
          }
        }
      } catch (error) {
        console.log(error)
        reply.code(500).send()
      }
    },
  })

  fastify.route({
    method: 'GET',
    url: '/Pokemon/Random',
    schema: schemas.pokemon,
    handler: async (request, reply) => {
      try {
        const { number, name, type } = request.query
        const db = fastify.mongo.client.db('PokeMongo')
        // eslint-disable-next-line no-use-before-define
        if (!name && !number && !type) {
          const pokemon = await db.collection('Pokemon').find().toArray()
          const random = pokemon[Math.floor(Math.random() * pokemon.length)]
          reply.send(random)
        }
      } catch (error) {
        console.log(error)
        reply.code(500).send()
      }
    },
  })
  next()
}

module.exports = Pokemon
