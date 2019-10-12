import Link from 'next/link'

import './editor.styl'

const Editor = ({ editor }) => {
	return (
		<Link href="/editor/[editor]" as={`/editor/${editor.name}`}>
			<a id="editor-link">
				<section id="editor-inline">
					<div className="image-wrapper">
						<img
							className="image"
							src={editor.image.url}
							alt={editor.image.url.alt}
						/>
					</div>
					<div className="detail">
						<h6 className="name">{editor.name}</h6>
						<p className="bio">{editor.bio}</p>
					</div>
				</section>
			</a>
		</Link>
	)
}

export default Editor