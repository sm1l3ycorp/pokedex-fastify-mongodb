const update = {
  querystring: {
    number: { type: 'number' },
    name: { type: 'string' },
  },
  response: {
    200: {
      type: 'array',
      properties: {
        number: { type: 'number' },
        name: { type: 'string' },
        type: { type: 'array' },
      },
    },
  },
}

module.exports = update
