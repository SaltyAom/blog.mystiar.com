import { Fragment } from "react"

import App from "next/app"

import { ApolloProvider } from "@apollo/react-hooks"

import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"

import { HttpLink } from "apollo-link-http"
import { toIdValue } from 'apollo-utilities'
import fetch from "node-fetch"

// import withApollo from "helpers/withApollo"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "stores"

import NProgress from "next-nprogress/component"

import ThemeManager from "components/themeManager"

import "stylus/init.styl"

const dev = process.env.NODE_ENV !== "production"

const link = dev
	? new HttpLink({
			uri: "http://localhost:8080",
			fetch: fetch
	  })
	: new HttpLink({
			uri: "https://cdn.blog.mystiar.com",
			fetch: fetch
	  })

const cache = new InMemoryCache({
	cacheRedirects: {
		Query: {
			getBlogBy: (_, args) =>
				toIdValue(
					cache.config.dataIdFromObject({
						__typename: "Blog",
						name: args.name
					})
				)
		}
	}
}).restore(typeof window !== "undefined" ? window.__APOLLO_STATE__ : null)

const client = new ApolloClient({
	link,
	cache: cache,
	ssrMode: true,
	queryDeduplication: true,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network"
		}
	},
	ssrForceFetchDelay: 300
})

class MyApp extends App {
	componentDidMount() {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", function() {
				navigator.serviceWorker.register(
					"/_next/static/service-worker.js",
					{ scope: "/" }
				)
			})
		}
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<Fragment>
				<NProgress color="#007aff" spinner={false} />
				<ApolloProvider client={client}>
					<ReduxProvider store={store}>
						<ThemeManager />
						<Component {...pageProps} />
					</ReduxProvider>
				</ApolloProvider>
			</Fragment>
		)
	}
}

export default MyApp