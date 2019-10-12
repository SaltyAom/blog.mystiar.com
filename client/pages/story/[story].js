import { Fragment, useState, useEffect } from "react"

import Head from "next/head"
import dynamic from "next/dynamic"

import { useQuery } from "@apollo/react-hooks"
import { getBlogBy } from "helpers/query"

import {
	normalizeAssets,
	normalizeContent,
	normalizeEditor,
	renderNormalizedContent
} from "helpers/normalize"

import { Title, Description, Tag, SEOImage } from "components/head"
import StoryPreload from "components/storyPreload"

import "stylus/story.styl"

const StoryTitle = dynamic(() => import("components/storyTitle"))
const Editor = dynamic(() => import("components/editor"))
const AdditionalFooter = dynamic(() => import("components/additionalFooter"))
const Error = dynamic(() => import("components/error"))
const StoryTools = dynamic(() => import("components/storyTools"))

const Blog = ({ storyName }) => {
	let [isParsing, setParsing] = useState(true),
		[isComputed, setComputed] = useState(true)

	/* Apollo GraphQL */
	let { data, isLoading, error } = useQuery(getBlogBy, {
		variables: { name: storyName },
		ssr: true
	})

	let [focusedImage, setFocusedImage] = useState(""),
		[isFocusedImageVisible, setFocusedImageVisible] = useState(false)

	let showFocusedImage = src => {
		setFocusedImage(src)
		setFocusedImageVisible(true)
	}	

	if (error) return <Error />

	/* Check if data loading */
	useEffect(() => {
		if (typeof data === "undefined") return setParsing(true)
		if (typeof data.getBlogBy === "undefined") return setParsing(true)
		setParsing(false)
	}, [data])

	if (isLoading || isParsing) return <StoryPreload />

	/* If story are valid */
	let assets, content, editor

	assets = normalizeAssets(data.getBlogBy.includes.Asset)
	content = normalizeContent(data.getBlogBy.items[0])
	editor = normalizeEditor(data.getBlogBy.includes.Entry, assets)

	let structureData = `
		{
			"@context":"https://schema.org/",
			"@type":"Article",
			"name":"${content.title}",
			"datePublished": "${content.createdAt}",
			"dateModified": "${content.updatedAt}",
			"description": "${content.content[0].content[0].value}",
			"headline": "${content.title}",
			"image": "${assets[content.thumbnail].url}",
			"inLanguage": "Thai",
			"mainEntityOfPage": "https://blog.mystiar.com/blog/${storyName}",
			"url": "https://blog.mystiar.com/blog/${storyName}"
		}
	`.replace(/\n|\t|  /g, "")

	let computeComplete = () => setComputed(true)

	let renderedNormalizedContent = renderNormalizedContent(
		content,
		assets,
		computeComplete,
		showFocusedImage
	)

	if (!isComputed) return <StoryPreload />

	return (
		<Fragment>
			{/* SEO */}
			<Title>{content.title} - Mystiar Blog</Title>
			<Description>{content.content[0].content[0].value}</Description>
			<Tag tags={content.tags} />
			<SEOImage
				href={assets[content.thumbnail].url}
				alt={assets[content.thumbnail].alt}
			/>
			<Head>
				<title>{content.title} - Mystiar Blog</title>
				{/** Structured Data (schema) */}
				<meta
					property="article:published_time"
					content={content.createdAt}
				/>
				<meta
					property="article:modified_time"
					content={content.updatedAt}
				/>
				<meta name="robots" content="index, follow" />

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: structureData
					}}
				/>
			</Head>

			<main id="story">
				<StoryTools />
				{/* Preview Image */}
				{isFocusedImageVisible ? (
					<div
						id="focus-image-overlay"
						className="active"
						onClick={() => setFocusedImageVisible(false)}
					>
						<img id="focus-image" src={focusedImage} />
					</div>
				) : focusedImage ? (
					<div
						id="focus-image-overlay"
						className="is-not-active"
					></div>
				) : null}

				{/* Blog */}
				<article className="article">
					{/* Visible on large device */}
					<header id="story-title-large">
						<StoryTitle
							title={content.title}
							editor={editor.name}
							createdAt={content.createdAt}
						/>
					</header>

					<figure className="thumbnail">
						<img
							className="image"
							src={assets[content.thumbnail].url}
							loading="lazy"
							onClick={event =>
								showFocusedImage(event.target.src)
							}
						/>
						<div className="thumbnail-edge" />
					</figure>

					{/* Visible on small device */}
					<header id="story-title">
						<StoryTitle
							title={content.title}
							editor={editor.name}
							createdAt={content.createdAt}
						/>
					</header>

					{/* Blog content */}
					<section id="story-data">
						{renderedNormalizedContent}
					</section>

					<AdditionalFooter tags={content.tags} title={content.title} />

					{/* Editor's detail */}
					<Editor editor={editor} />
				</article>
			</main>
		</Fragment>
	)
}

Blog.getInitialProps = (ctx) => {
	return { storyName: ctx.query.story }
}

export default Blog
