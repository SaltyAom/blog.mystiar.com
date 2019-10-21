/* env */
require("dotenv").config()

/* Server */
const express = require("express")
const app = express()
const cors = require("cors")
const queue = require("express-queue")
const compression = require("compression")
const apicache = require("apicache")
const bodyparser = require("body-parser")

apicache.options({
	appendKey: (req, res) => {
		return req.body.operationName + JSON.stringify(req.body.variables)
	}
})
const cache = apicache.middleware

/* Config */
const dev = process.env.NODE_ENV !== "production"

/* Server config */
let corsOptions = {
	origin: "*"
}

dev
	? corsOptions
	: (corsOptions = {
			origin: "https://blog.mystiar.com"
	  })

app.use(bodyparser.json({limit: '5mb'}))
app.use(cors(corsOptions))
if(dev) app.use(cache("6 hours"))
app.use(queue({ activeLimit: 40, queuedLimit: -1 }))
app.use(compression())

/* Apollo */
const { ApolloServer } = require("apollo-server-express")
const responseCachePlugin = require("apollo-server-plugin-response-cache")

/* Apollo config */
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")

const MystiarBlog = require("./graphql/dataSources/mystiarBlog")

/* Apollo */
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		MystiarBlog: new MystiarBlog()
	}),
	engine: {
		apiKey: "service:Mystiar-Gateway:p771Ho3LeZcci4hRUWJDDA"
	},
	plugins: [responseCachePlugin()],
	introspection: true,
	playground: dev,
	tracing: !dev,
	cacheControl: {
		defaultMaxAge: 86400,
		stripFormattedExtensions: false,
		calculateCacheControlHeaders: false
	}
})

server.applyMiddleware({
	app,
	path: "/",
	cors: false // Disable Apollo CORs default options
})

app.listen({ port: 8080 }, () => {
	console.log(`Listen on port :8080 desu!`)
})
