import { useEffect } from 'react'

import { connect } from "react-redux"

const mapStateToProps = state => {
	return {
		store: {
			view: {
				theme: state.view.theme
			}
		}
	}
}

const ThemeManager = ({ store, dispatch }) => {
	let { view } = store,
		{ theme } = view

	useEffect(() => {
		if(typeof window === "undefined") return
		localStorage.setItem("theme", theme)
	}, [theme])

	if (theme === "dark")
		return (
			<link
				rel="stylesheet"
				type="text/css"
				href="/css/dark-theme.css"
			/>
		)

	return null
}

export default connect(
	mapStateToProps,
	null
)(ThemeManager)