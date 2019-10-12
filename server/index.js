/* env */
require("dotenv").config()

/* Server */
const express = require("express")
const app = express()
const cors = require("cors")
const queue = require("express-queue")

const compression = require("compression")

// Using queue middleware
app.use(queue({ activeLimit: 40, queuedLimit: -1 }))
app.use(compression())

/* Apollo */
const { ApolloServer } = require("apollo-server-express")
const { MemcachedCache } = require("apollo-server-cache-memcached")
const responseCachePlugin = require("apollo-server-plugin-response-cache")

/* Apollo config */
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")

const MystiarBlog = require("./graphql/dataSources/mystiarBlog")

/* Config */
const dev = process.env.NODE_ENV !== "production"

/* Apollo */
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		MystiarBlog: new MystiarBlog()
	}),
	persistedQueries: {
		cache: new MemcachedCache(
			["memcached-server-1", "memcached-server-2", "memcached-server-3"],
			{ retries: 10, retry: 10000 }
		)
	},
	engine: {
		apiKey: "service:Mystiar-Gateway:p771Ho3LeZcci4hRUWJDDA"
	},
	plugins: [responseCachePlugin()],
	introspection: dev,
	playground: dev,
	tracing: !dev,
	cacheControl: {
		defaultMaxAge: 86400,
		stripFormattedExtensions: false,
		calculateCacheControlHeaders: false
	}
})

/* Server config */
let corsOptions = {
	origin: "*"
}

dev
	? (corsOptions = {
			origin: "*"
	  })
	: (corsOptions = {
			origin: "https://blog.mystiar.com"
	  })

app.use(cors(corsOptions))
server.applyMiddleware({
	app,
	path: "/",
	cors: false // Disable Apollo CORs default options
})

app.listen({ port: 8080 }, () => {
	console.log(`Listen on port :8080 desu!`)
})
