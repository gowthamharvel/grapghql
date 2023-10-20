const { knex } = require('./connection');

const { ApolloServer,gql } = require('apollo-server');


const typeDefs = gql`

type Case {
    CASE_ID: Int
    ID_TYPE: String
    ID_NO: String
    TEST_NO: Int
    SOURCE: String
  }

  type Query {
    cases: [Case]
  }
`;

const resolvers = {
    Query: {
      cases: async() => await getCases(),
    },
  };


async function getCases()   {
    const result = await knex.select().from('cvd_case_master');
    return result;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  

  server
  .listen({ port: 5000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
  
 

 /*(async() => {
    const cases = await getCases();
    console.log(cases);
})(); */