import { Fragment } from "react"

import Link from 'next/link'

const StoryTitle = ({ title, editor, createdAt }) => (
	<Fragment>
		<h1 className="title">{title}</h1>
		<p className="detail">
			Written by{" "}
			<Link href="/editor/[editor]" as={`/editor/${editor}`}>
				<a className="inline-editor">{editor}</a>
			</Link>{" "}
			on:{" "}
			<time
				className="publish-date"
				dateTime={
					new Date(createdAt).toISOString().split("T")[0]
				}
			>
				{new Date(createdAt).toLocaleDateString()}
			</time>
		</p>{" "}
	</Fragment>
)

export default StoryTitle