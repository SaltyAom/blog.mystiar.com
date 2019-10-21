import { Fragment } from "react"

import App from "next/app"
import Head from "next/head"

import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "helpers/withApollo"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "stores"

import NProgress from "next-nprogress/component"

import { isServer } from "helpers/normalize"

import { initGA, logPageView } from "helpers/analytics"

import ThemeManager from "components/themeManager"

import "stylus/init.styl"

class MyApp extends App {
	componentDidMount() {
		if (
			"serviceWorker" in navigator &&
			process.env.NODE_ENV === "production" &&
			!isServer
		) {
			window.addEventListener("load", function() {
				navigator.serviceWorker.register(
					"/_next/static/service-worker.js",
					{ scope: "/" }
				)
			})
		}

		if (!isServer && !window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
		}
		logPageView()

		if (!isServer) {
			document.addEventListener("touchstart", () => null, true)
		}
	}

	render() {
		const { Component, pageProps, apollo } = this.props

		return (
			<Fragment>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, viewport-fit=cover"
					/>
				</Head>
				<NProgress color="#007aff" spinner={false} />
				<ApolloProvider client={apollo}>
					<ReduxProvider store={store}>
						<ThemeManager />
						<Component {...pageProps} />
					</ReduxProvider>
				</ApolloProvider>
			</Fragment>
		)
	}
}

export default withApollo(MyApp)
