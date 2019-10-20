import Link from "next/link"

import { LazyLoadImage } from "react-lazy-load-image-component"

import "./card.styl"

const Card = ({
	children,
	editor = "",
	src = "",
	alt = "",
	href = "",
	preload = false
}) => {
	if (preload)
		return (
			<div className="card-link">
				<article className="card">
					<figure className="cover">
						<span className="lazy-load-image preload" />
					</figure>
					<h3 className="title preload" /> 
					<footer className="footer">
						<p className="editor preload" />
					</footer>
				</article>
			</div>
		)

	return (
		<Link href="/story/[story]" as={`/story/${href}`}>
			<a className="card-link">
				<article className="card">
					<figure className="cover">
						<LazyLoadImage
							className="image"
							loading="lazy"
							src={src}
							alt={alt}
							placeholder={<span className="lazy-load-image" />}
						/>
					</figure>
					<h3 className="title">{children}</h3>
					<footer className="footer">
						<p className="editor">{editor}</p>
					</footer>
				</article>
			</a>
		</Link>
	)
}

export default Card
