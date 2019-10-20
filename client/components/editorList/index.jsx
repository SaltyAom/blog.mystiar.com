import Link from "next/link"

import { LazyLoadImage } from "react-lazy-load-image-component"

import "./editor-list.styl"

const EditorList = ({ editors = [], preload = false }) => {
	if (preload)
		return (
			<section id="editor-list">
				{[1, 2, 3, 4, 5, 6, 7].map((editor, index) => (
					<div key={index} className="editor-badge preload">
						<span className="image lazy-load preload" />
					</div>
				))}
			</section>
		)

	return (
		<section id="editor-list">
			{editors.map((editor, index) => (
				<Link
					key={index}
					href="/editor/[editor]"
					as={`/editor/${editor.name}`}
				>
					<a
						className="editor-badge"
						aria-label={`ดูโปรไฟล์ของ ${editor.name}`}
						title={`ดูโปรไฟล์ของ ${editor.name}`}
					>
						<LazyLoadImage
							className="image"
							src={editor.image.url}
							alt={editor.image.alt}
							placeholder={<span className="lazy-load" />}
						/>
					</a>
				</Link>
			))}
		</section>
	)
}

export default EditorList
