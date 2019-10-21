import Link from "next/link"

import "./tags.styl"

export const Tags = ({ tags = [], preload = false }) => {
	if (preload)
		return (
			<section className="tags">
				{[1, 2, 3, 4, 5].map((tag, index) => (
					<Link key={index} href="">
						<a className="tag preload" />
					</Link>
				))}
			</section>
		)

	return (
		<section className="tags">
			{tags.map((tag, index) => (
				<Link key={index} href="/tag/[tag]" as={`/tag/${tag}`}>
					<a className="tag">{tag}</a>
				</Link>
			))}
		</section>
	)
}

const AdditionalFooter = ({ tags = [], title = "", preload = false }) => {
	if (preload)
		return (
			<div id="additional-footer">
				<Tags tags={tags} preload={preload} />
				<section id="share">
					{/* Facebook */}
					<a
						className="share-link"
						target="_blank"
						rel="noopener noreferrerf"
						aria-label="Share this on Twitter"
					>
						<svg className="share-icon">
							<title>Share this on Facebook</title>
							<path
								className="path"
								d="M23.2 5H5.8a.8.8 0 0 0-.8.8V23.2c0 .44.35.8.8.8h9.3v-7.13h-2.38V13.9h2.38v-2.38c0-2.45 1.55-3.66 3.74-3.66 1.05 0 1.95.08 2.2.11v2.57h-1.5c-1.2 0-1.48.57-1.48 1.4v1.96h2.97l-.6 2.97h-2.37l.05 7.12h5.1a.8.8 0 0 0 .79-.8V5.8a.8.8 0 0 0-.8-.79"
							/>
						</svg>
					</a>
					{/* Twitter */}
					<a
						className="share-link twitter-share-button"
						target="_blank"
						rel="noopener noreferrerf"
						aria-label="Share this on Twitter"
					>
						<svg className="share-icon">
							<title>Share this on Twitter</title>
							<path
								className="path"
								d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"
							></path>
						</svg>
					</a>
				</section>
			</div>
		)

	let nativeShare = event => {
		if (!navigator.share) return event
		event.preventDefault()

		navigator.share({
			title: title,
			url: `https://blog.mystiar.com/story/${title.replace(/ /g,"-")}`
		})
	}

	let shareOnFacebookURL = `https://www.facebook.com/sharer/sharer.php?u=https://blog.mystiar.com/story/${title}`,
		shareOnTwitterURL = `https://twitter.com/intent/tweet?url=https://blog.mystiar.com/story/${encodeURI(
			title
		)}`

	return (
		<div id="additional-footer">
			<Tags tags={tags} preload={preload} />
			<section id="share">
				{/* Facebook */}
				<a
					className="share-link"
					target="_blank"
					rel="noopener noreferrerf"
					href={shareOnFacebookURL}
					onClick={event => nativeShare(event)}
				>
					<svg className="share-icon">
						<path
							className="path"
							d="M23.2 5H5.8a.8.8 0 0 0-.8.8V23.2c0 .44.35.8.8.8h9.3v-7.13h-2.38V13.9h2.38v-2.38c0-2.45 1.55-3.66 3.74-3.66 1.05 0 1.95.08 2.2.11v2.57h-1.5c-1.2 0-1.48.57-1.48 1.4v1.96h2.97l-.6 2.97h-2.37l.05 7.12h5.1a.8.8 0 0 0 .79-.8V5.8a.8.8 0 0 0-.8-.79"
						/>
					</svg>
				</a>
				{/* Twitter */}
				<a
					className="share-link twitter-share-button"
					target="_blank"
					rel="noopener noreferrerf"
					href={shareOnTwitterURL}
					onClick={event => nativeShare(event)}
				>
					<svg className="share-icon">
						<path
							className="path"
							d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"
						></path>
					</svg>
				</a>
			</section>
		</div>
	)
}

export default AdditionalFooter
