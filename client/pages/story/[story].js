import { Fragment, useState, useEffect } from "react"

import { useLazyQuery } from '@apollo/react-hooks'

import Head from "next/head"
import dynamic from "next/dynamic"

import { getBlogBy, getBlogDataBy } from "helpers/query"

import {
	normalizeAssets,
	normalizeMetadata,
	normalizeEditor,
	renderNormalizedContent,
	isServer
} from "helpers/normalize"

import { Title, Description, Tag, SEOImage } from "components/head"

import "stylus/story.styl"

const StoryPreload = dynamic(() => import("components/storyPreload"))
const StoryTitle = dynamic(() => import("components/storyTitle"))
const Editor = dynamic(() => import("components/editor"))
const AdditionalFooter = dynamic(() => import("components/additionalFooter"))
const Error = dynamic(() => import("components/error"))
const StoryTools = dynamic(() => import("components/storyTools"))

const Blog = ({ blog, storyName }) => {
	if (
		typeof blog.getBlogBy === "undefined" ||
		blog.getBlogBy.includes === null
	)
		return <Error />

	let assets, metadata, editor

	assets = normalizeAssets(blog.getBlogBy.includes.Asset)
	metadata = normalizeMetadata(blog.getBlogBy.items[0])
	editor = normalizeEditor(blog.getBlogBy.includes.Entry, assets)

	let structureData = `
		{
			"@context":"https://schema.org/",
			"@type":"Article",
			"datePublished": "${metadata.createdAt}",
			"dateModified": "${metadata.updatedAt}",
			"description": "${storyName}",
			"headline": "${storyName}",
			"image": ["${assets[metadata.thumbnail].url}"],
			"inLanguage": "Thai",
			"mainEntityOfPage": "https://blog.mystiar.com/blog/${storyName}",
			"url": "https://blog.mystiar.com/blog/${storyName}",
			"publisher": {
				"@type": "Organization",
				"name": "Mystiar Blog",
				"logo": {			
					"@type": "imageObject",
					"width": "512",
					"height": "512",
					"url": "https://blog.mystiar.com/icon/mystiar.png"
				}
			},
			"author": {
				"name": "${editor.name}",
				"image": {
					"@type": "imageObject",
					"width": "512",
					"height": "512",
					"url": "${editor.image.url}"
				}
			}
		}
	`.replace(/\n|\t|  /g, "")

	let [focusedImage, setFocusedImage] = useState(""),
		[isFocusedImageVisible, setFocusedImageVisible] = useState(false)

	let showFocusedImage = src => {
		setFocusedImage(src)
		setFocusedImageVisible(true)
	}

	/* Client Side Rendering */
	let [ loadBlogData, blogData ] = useLazyQuery(getBlogDataBy, {
		variables: { name: storyName, type: "content" },
		ssr: true,
	})

	useEffect(() => {
		setTimeout(() => {
			loadBlogData()
		}, 250)
	}, [])

	return (
		<Fragment>
			{/* SEO */}
			<Title>{storyName} - Mystiar Blog</Title>
			<Description>{storyName}</Description>
			<Tag tags={metadata.tags} />
			<SEOImage
				href={assets[metadata.thumbnail].url}
				alt={assets[metadata.thumbnail].alt}
			/>
			<Head>
				<title>{storyName} - Mystiar Blog</title>
				{/** Structured Data (schema) */}
				<meta
					property="article:published_time"
					content={metadata.createdAt}
				/>
				<meta
					property="article:modified_time"
					content={metadata.updatedAt}
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
							title={storyName}
							editor={editor.name}
							createdAt={metadata.createdAt}
						/>
					</header>

					<figure className="thumbnail">
						<img
							className="image"
							src={assets[metadata.thumbnail].url}
							onClick={event =>
								showFocusedImage(event.target.src)
							}
						/>
						<div className="thumbnail-edge" />
					</figure>

					{/* Visible on small device */}
					<header id="story-title">
						<StoryTitle
							title={storyName}
							editor={editor.name}
							createdAt={metadata.createdAt}
						/>
					</header>

					{/* Blog content */}
					<section id="story-data">
						{!isServer && !blogData.loading && typeof blogData.data !== "undefined" ? (
							renderNormalizedContent(
								blogData.data.getBlogBy.items[0].fields.content,
								assets,
								showFocusedImage
							)
						) : (
							<StoryPreload />
						)}
					</section>

					<AdditionalFooter
						tags={metadata.tags}
						title={storyName}
					/>

					{/* Editor's detail */}
					<Editor editor={editor} />
				</article>
			</main>
		</Fragment>
	)
}

Blog.getInitialProps = async ctx => {
	const apolloClient = ctx.apolloClient
	let blog = await apolloClient.query({
		query: getBlogBy,
		variables: { name: ctx.query.story.replace(/-/g, " "), type: "metadata" }
	})

	return { blog: blog.data, storyName: ctx.query.story.replace(/-/g, " ") }
}

export default Blog
