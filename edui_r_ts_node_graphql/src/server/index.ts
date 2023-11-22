import express from 'express'
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/http'
// import { gQlSchema } from '~/server/gql-schema'

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: `Query`,
		fields: {
			hello: {
				type: GraphQLString,
				resolve: () => `world`,
			},
		},
	}),
})

export const app = express()

if (!process.env.VITE) {
	const frontendFiles = process.cwd() + `/dist`
	app.use(express.static(frontendFiles))
	app.get(`/*`, (_, res) => {
		res.send(frontendFiles + `/index.html`)
	})
	app.listen(process.env.PORT)
}

app.all(`/api/graphql`, createHandler({ schema }))

app.get(`/api/hello`, (_, res) =>
	res.json({ greeting: `Hello from Express server!` }
	)
)

app.get(`/api/hello/:pied`, (_, res) =>
	res.json({ greeting: `Hello from Express server! ${_.params.pied}` }
	)
)
