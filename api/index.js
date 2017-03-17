const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

const PORT = 3002;
const schema = require('./rootSchema')

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT);
