import { Fragment } from "react"

import Link from 'next/link'

import { LazyLoadImage } from "react-lazy-load-image-component"

import { Tags } from "components/additionalFooter"

export const isServer = typeof window === "undefined"

/**
 * @typedef {Array} normalizedAssets
 * @property {String} url - Asset's location (url).
 * @property {String} alt - Asset's alternate text.
 */

/**
 * Normalize Contentful's assets for easier access.
 * @param {Object} assets - contentful.includes.Assets.
 * @return {normalizedAssets} normalizedAssets - Array of normalized assets having id as array's key.
 */
export const normalizeAssets = assets => {
	let normalizedAssets = {}
	assets.forEach(asset => {
		let key = asset.sys.id
		normalizedAssets[key] = {
			url: `https:${asset.fields.file.url}`,
			alt: asset.fields.description
		}
	})
	return normalizedAssets
}

/**
 * @typedef {Object} normalizedMetadata
 * @property {String} title - Content's title.
 * @property {normalizedAssets} thumbnail - Content's thumbnail data.
 * @property {Array} tags - Content's tags.
 * @property {Date} createdAt - Content's created date.
 * @property {Date} modifiedAt - Content's modified date.
 */

/**
 * Normalized Blog's metadata for easier access.
 * @param {Object} content - contentful.items[0].
 * @return {normalizedMetadata} - Normalized Metadata.
 */
export const normalizeMetadata = content => {
	let normalizedContent = {
		title: content.fields.title,
		thumbnail: content.fields.thumbnail.sys.id,
		tags: content.fields.tags,
		editor: content.fields.editor.sys.id,
		createdAt: content.sys.createdAt,
		updatedAt: content.sys.updatedAt
	}
	return normalizedContent
}

/**
 * @typedef {Object} normalizedEditor
 * @property {String} name - Editor's name.
 * @property {String} bio - Editor's short biological data. 
 * @property {normalizedAssets} image - Editor's image data.
 * @property {normalizedAssets} cover - Editor's cover image data.
 */

/**
 * Normalized Editor's data for easier access.
 * @param {Object} editor - contentful.items[0].
 * @param {Object} normalizedContent - normalizedContent from normalizedContent(contentful.items[0]).
 * @return {normalizedEditor} - Normalized Editor's data.
 */
export const normalizeEditor = (editor, normalizedAssets) => {
	let normalizedEditor = {
		name: editor[0].fields.name,
		bio: editor[0].fields.bio,
		image: normalizedAssets[editor[0].fields.image.sys.id],
		cover: typeof editor[0].fields.cover !== "undefined" ? normalizedAssets[editor[0].fields.cover.sys.id] : ""
	}
	return normalizedEditor
}

/**
 * @typedef {Object} normalizedCard
 * @property {string} title - Card's title.
 * @property {normalizedAssets} Thumbnails - Card's thumbnail data.
 * @property {Array} tags - Card's tags.
 */

/**
 * Normalize preview blog for easier access.
 * @param {Object} shallowBlogs - Preview blog data including.
 * @param {Object} normalizedAssets - normalizedAssets from normalizeAssets(contentful.includes.Assets).
 * @return {normalizedCard} - Normalized Card's data.
 */
export const normalizeCard = (shallowBlogs, normalizedAssets) => {
	let normalizedCard = []
	shallowBlogs.forEach((shallowBlog) => {
		normalizedCard.push({
			title: shallowBlog.fields.title.replace(/ /g, "-"),
			thumbnail: normalizedAssets[shallowBlog.fields.thumbnail.sys.id],
			tags: shallowBlog.fields.tags
		})
	})
	return normalizedCard
}

/**
 * Render blog's content as React Element.
 * @param {Object} normalizedContent - normalizedContent from normalizedContent(contentful.items[0]).
 * @param {Object} normalizedAssets - normalizedAssets from normalizeAssets(contentful.includes.Assets).
 * @param {Function} expandImage - function to be invoked when the user click the image.
 * @return {React.Component} - Set of blog's data.
 */
export const renderNormalizedContent = (
	normalizedContent,
	normalizedAssets,
	expandImage
) => {
	let structure = []
	normalizedContent.content.map(content => {
		switch (content.nodeType) {
			case "paragraph":
				let paragraphs = []
				content.content.map(paragraph => {
					return paragraphs.push(renderParagraph(paragraph))
				})
				return structure.push(
					<p key={randomKey()} className="story-detail">
						{paragraphs}
					</p>
				)

			case "embedded-asset-block":
				return structure.push(
					<figure
						className="story-figure"
						key={content.data.target.sys.id}
					>
						<LazyLoadImage
							className="story-image"
							loading="lazy"
							onClick={event => expandImage(event.target.src)}
							src={
								normalizedAssets[content.data.target.sys.id].url
							}
							alt={
								normalizedAssets[content.data.target.sys.id].alt
							}
							placeholder={
								<span className="story-image lazy-load-image" />
							}
						/>
					</figure>
				)

			case "hr":
				return structure.push(
					<hr key={randomKey()} className="story-hr" />
				)

			case "unordered-list":
				let unorderedLists = []
				content.content.map(unorderedList => {
					let lists = []
					unorderedList.content.map(list => {
						let paragraphs = []
						list.content.map(paragraph => {
							return paragraphs.push(renderParagraph(paragraph))
						})
						return lists.push(
							<p className="story-detail" key={randomKey()}>
								{marksToReactComponent(paragraphs, list.marks)}
							</p>
						)
					})

					return unorderedLists.push(
						<li className="story-list" key={randomKey()}>{lists}</li>
					)
				})
				return structure.push(
					<ul className="story-unordered-list" key={randomKey()}>
						{unorderedLists}
					</ul>
				)

			case "ordered-list":
				let orderedLists = []
				content.content.map(unorderedList => {
					let lists = []
					unorderedList.content.map(list => {
						let paragraphs = []
						list.content.map(paragraph => {
							return paragraphs.push(renderParagraph(paragraph))
						})
						return lists.push(
							<p className="story-detail" key={randomKey()}>
								{marksToReactComponent(paragraphs, list.marks)}
							</p>
						)
					})

					return orderedLists.push(
						<li className="story-list" key={randomKey()}>{lists}</li>
					)
				})
				return structure.push(
					<ol className="story-ordered-list" key={randomKey()}>
						{orderedLists}
					</ol>
				)

			case "blockquote":
				let blockquotes = []
				content.content.map(list => {
					let paragraphs = []
					list.content.map(paragraph => {
						return paragraphs.push(renderParagraph(paragraph))
					})
					return blockquotes.push(paragraphs)
				})
				return structure.push(
					<blockquote className="story-blockquote" key={randomKey()}>
						{blockquotes}
					</blockquote>
				)

			case "heading-1":
			case "heading-2":
				let h2s = []
				content.content.map(h2 => {
					return h2s.push(renderParagraph(h2))
				})
				return structure.push(
					<h2 className="story-heading-2" key={randomKey()}>
						{h2s}
					</h2>
				)

			case "heading-3":
			case "heading-4":
			case "heading-5":
			case "heading-6":
				let h3s = []
				content.content.map(h3 => {
					return h3s.push(renderParagraph(h3))
				})
				return structure.push(
					<h3 className="story-heading-3" key={randomKey()}>
						{h3s}
					</h3>
				)

			default:
				return
		}
	})
	return <Fragment>{structure}</Fragment>
}

/**
 * Render preview card as React Component.
 * @param {*} normalizedCard - normalizedCard from normalizedCard().
 * @return {React.Component} - Set of Preview cards maximum to 100.
 */
export const renderCard = (normalizedCard) => {
	let structure = []

	normalizedCard.map((card) => {
		return structure.push(
			<Link href="/story/[story]" as={`/story/${card.title}`}>
				<a className="story-more-card-link">
					<article className="story-more-card">
						<figure className="thumbnail">
							<LazyLoadImage
								className="image"
								src={card.thumbnail.url}
								alt={card.thumbnail.alt}
							/>
						</figure>
						<h3 className="title">{card.title.replace(/-/g," ")}</h3>
						<Tags tags={card.tags} />
					</article>
				</a>
			</Link>
		)
	})

	return structure
}

/**
 * Generate random key..
 * @return {Number} key - generated random key.
 */
const randomKey = () =>
	Math.random()
		.toString(36)
		.substring(7)

/**
 * Return React Component from marks data in Contentful content's fields..
 * @param {String} value - Contentful value field.
 * @param {Object} marks - Contentful's marks field.
 * @return {React.Component} - Marked data as React Component.
 */
const marksToReactComponent = (value, marks) => {
	if (marks === null) return value
	if (typeof marks === "undefined") return value
	if (marks.length === 0) return value

	if (marks.length === 1) {
		if (marks[0].type.includes("bold"))
			return <b key={randomKey()} className="story-b">{value}</b>

		if (marks[0].type.includes("code"))
			return <code key={randomKey()} className="story-code">{value}</code>
	}

	if (marks.length === 2) {
		if (
			(marks[0].type.includes("bold") &&
				marks[1].type.includes("code")) ||
			(marks[1].type.includes("bold") && marks[0].type.includes("code"))
		)
			return (
				<code key={randomKey()} className="story-code">
					<b>{value}</b>
				</code>
			)
	}
}

/**
 * Connect link (if has) as React Component.
 * @param {Object} content - Contentful's content fields.
 * @returns {React.Component} - Link connected React Component.
 */
const connectLink = content => {
	if (Object.keys(content).length === 0) return content
	return (
		<a
			className="story-link"
			href={content.data.uri}
			target="_blank"
			rel="noopener noreferrer"
			key={randomKey()}
		>
			{content.content[0].value}
		</a>
	)
}

/**
 * Render paragraph and marks content as React Component.
 * @param {Object} paragraph - Contentful's content fields.
 * @return {React.Component} - Paragraph as React Component.
 */
const renderParagraph = paragraph => {
	if (paragraph.nodeType === "hyperlink") return connectLink(paragraph)

	return marksToReactComponent(paragraph.value, paragraph.marks)
}