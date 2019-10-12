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

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: {
			updateTheme: (newTheme) => dispatch({
				type: "UPDATE_THEME",
				payload: {
					view: {
						theme: newTheme
					}
				}
			})
		}
	}
}

const ThemeManager = ({ store, dispatch }) => {
	let { view } = store,
		{ theme } = view

	let { updateTheme } = dispatch

	/*
	useEffect(() => {
		if(typeof window === "undefined") return
		let localTheme = localStorage.getItem("theme")

		if(typeof localTheme === "undefined") return
		if(localTheme === "dark")
			updateTheme("dark")			
	}, [])
	*/

	useEffect(() => {
		if(typeof window === "undefined") return
		localStorage.setItem("theme", theme)
	}, [theme])

	if (theme === "dark")
		return (
			<link
				rel="stylesheet"
				type="text/css"
				href="/static/css/dark-theme.css"
			/>
		)

	return null
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThemeManager)