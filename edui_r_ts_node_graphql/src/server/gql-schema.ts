// import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
// import { createHandler } from 'graphql-http/lib/use/http';

// /**
//  * Construct a GraphQL schema and define the necessary resolvers.
//  *
//  * type Query {
//  *   hello: String
//  * }
//  */
// export const gQlSchema = new GraphQLSchema({
// 	query: new GraphQLObjectType({
// 		name: `Query`,
// 		fields: {
// 			hello: {
// 				type: GraphQLString,
// 				resolve: () => `world`,
// 			},
// 		},
// 	}),
// })

// const handler = createHandler({ gQlSchema })
