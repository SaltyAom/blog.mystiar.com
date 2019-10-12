const path = require("path")
const withCSS = require("@zeit/next-css")
const withStylus = require("@zeit/next-stylus")
const withOffline = require("next-offline")

module.exports = withCSS(
	withStylus(
		withOffline({
			target: "serverless",
			dontAutoRegisterSw: true,
			workboxOpts: {
				swDest: "static/service-worker.js",
				runtimeCaching: [
					{
						urlPattern: /.js$|.ttf$|.otf$|.css$/,
						handler: "CacheFirst"
					}
				]
			},
			webpack(config, options) {
				config.resolve.alias["react"] = "preact/compat"
				config.resolve.alias["react-dom"] = "preact/compat"
				config.resolve.alias["react-ssr-prepass"] = "preact-ssr-prepass"
				config.resolve.alias["react-render-to-string"] =
					"preact-render-to-string"
				config.resolve.alias["assets"] = path.join(
					__dirname,
					"public/static/assets"
				)
				config.resolve.alias["stylus"] = path.join(
					__dirname,
					"public/static/stylus"
				)
				config.resolve.alias["components"] = path.join(
					__dirname,
					"components"
				)
				config.resolve.alias["static"] = path.join(__dirname, "public/static")
				config.resolve.alias["stores"] = path.join(__dirname, "stores")
				config.resolve.alias["helpers"] = path.join(
					__dirname,
					"helpers"
				)
				config.resolve.alias["icon"] = path.join(
					__dirname,
					"components/icon"
				)

				return config
			},
			env: {
				space_id: process.env.space_id,
				access_token: process.env.access_token
			}
		})
	)
)
