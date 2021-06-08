const Create = {
  body: {
    number: { type: 'number' },
    name: { type: 'string' },
    type: { type: 'array' },
  },
  response: {
    201: {
      type: 'boolean',
    },
  },
}

module.exports = Create
