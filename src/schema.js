import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const people = [
  {
    id: 0,
    first_name: 'Keller',
    last_name: 'Davis',
    email: 'keller@example.com',
    username: 'keller',
    friends: [1,2]
  },
  {
    id: 1,
    first_name: 'Ollie',
    last_name: 'Davis',
    email: 'ollie@example.com',
    username: 'krd',
    friends: [0]
  },
  {
    id: 2,
    first_name: 'Scott',
    last_name: 'Z',
    email: 'scott@example.com',
    username: 'scottz',
    friends: [0]
  }
];

function getPeople() {
  return people;
}

function getPerson(id) {
  return people[id];
}

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    id: {type: GraphQLID},
    firstName: {
      type: GraphQLString,
      description: 'What you yell at me',
      resolve: obj => obj.first_name,
    },
    lastName: {
      type: GraphQLString,
      description: 'What you yell at me when I\'ve been bad',
      resolve: obj => obj.last_name,
    },
    fullName: {
      type: GraphQLString,
      description: 'A name sandwich',
      resolve: obj => `${obj.first_name} ${obj.last_name}`,
    },
    email: {
      type: GraphQLString,
      description: 'Where to send junk mail',
    },
    username: {
      type: GraphQLString,
      description: 'Log in as this',
    },
    friends: {
      type: new GraphQLList(PersonType),
      description: 'People who lent you money',
      resolve: obj => obj.friends.map(getPerson),
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      description: 'Everyone, everywhere',
      resolve: () => getPeople(),
    },
    person: {
      type: PersonType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args) => getPerson(args.id),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
