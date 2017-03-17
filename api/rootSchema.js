const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

// Schemas
const dogPlaceSchema = require('./dogs')

// Flatten the schemas and resolvers
const schema = [...dogPlaceSchema.schema]
const resolvers = merge(dogPlaceSchema.resolvers)

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})
