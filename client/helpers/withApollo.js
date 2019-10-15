import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"

import { HttpLink } from "apollo-link-http"

import withApollo from "next-with-apollo"
import fetch from "node-fetch"

const dev = process.env.NODE_ENV !== "production"

let link = dev
	? new HttpLink({
			uri: "http://localhost:8080",
			fetch: fetch,
			fetchPolicy: 'cache-and-network'
	  })
	: new HttpLink({
			uri: "https://cdn.blog.mystiar.com",
			fetch: fetch,
			fetchPolicy: 'cache-and-network'
	  })

export default withApollo(
	({ ctx, headers, initialState }) =>
		new ApolloClient(
			{
				link,
				cache: new InMemoryCache().restore(initialState || {}),
				ssrMode: true,
				queryDeduplication: true,
				defaultOptions: {
					watchQuery: {
						fetchPolicy: "cache-and-network"
					}
				},
				ssrForceFetchDelay: 300
			},
			{
				getDataFromTree: "ssr"
			}
		)
)
