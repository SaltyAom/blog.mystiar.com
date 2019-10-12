import { connect } from 'react-redux'

import "./story-tools.styl"

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

const StoryTools = ({ store, dispatch }) => {
	let { view } = store,
		{ theme } = view

	let { updateTheme } = dispatch

	return (
		<div id="story-tools-position">
			<aside id="story-tools">
				<svg
					className="tool"
					onClick={() => updateTheme(theme !== "light" ? "light" : "dark")}
					tabIndex={1}
					aria-label="Invert color"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M24 0H0v24h24z" fill="none" />
					<path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z" />
				</svg>
			</aside>
		</div>
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryTools)
