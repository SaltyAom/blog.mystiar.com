import { Fragment } from "react"

import App from "next/app"

import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "helpers/withApollo"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "stores"

import NProgress from "next-nprogress/component"

import ThemeManager from "components/themeManager"

import "stylus/init.styl"

class MyApp extends App {
	componentDidMount() {
		if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
			window.addEventListener("load", function() {
				navigator.serviceWorker.register(
					"/_next/static/service-worker.js",
					{ scope: "/" }
				)
			})
		}
	}

	render() {
		const { Component, pageProps, apollo } = this.props

		return (
			<Fragment>
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