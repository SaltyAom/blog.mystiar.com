import { Fragment } from "react"

import Head from "next/head"
import dynamic from "next/dynamic"

import { getEditorWithBlogs } from "helpers/query"

import {
	normalizeAssets,
	normalizeEditor,
	normalizeCard,
	renderCard,
	isServer
} from "helpers/normalize"

import { Title, Description, Tag, SEOImage } from "components/head"

import "stylus/editor.styl"

const Error = dynamic(() => import("components/error"))

const Editor = ({ editorDetail }) => {
	if (
		typeof editorDetail.data.getEditorWithBlogs === "undefined" ||
		editorDetail.data.getEditorWithBlogs.includes === null
	)
		return <Error />

	let assets, editor, card, tags

	assets = normalizeAssets(
		editorDetail.data.getEditorWithBlogs.blog.includes.Asset
	)
	editor = normalizeEditor(
		editorDetail.data.getEditorWithBlogs.editor.items[0],
		assets
	)
	card = normalizeCard(
		editorDetail.data.getEditorWithBlogs.blog.items,
		assets
	)

	tags = [editor.name, "Mystiar Blog", "editor"]

	let structureData = `
		{
			"@context" : "https://schema.org",
			"@type" : "Person",
			"name" : "${editor.name}",
			"url" : "https://blog.mystiar.com/editor/${editor.name}",
			"image": {
				"@type": "imageObject",
				"width": "512",
				"height": "512",
				"url": "${editor.image.url}"
			}
		}
	`.replace(/\n|\t|  /g, "")

	return (
		<Fragment>
			{/* SEO */}
			<Title>{editor.name} - Editor on Mystiar Blog</Title>
			<Description>{editor.bio}</Description>
			<Tag tags={tags} />
			<SEOImage href={editor.cover.url} alt={editor.cover.alt} />
			<Head>
				<title>{editor.name} - Editor on Mystiar Blog</title>
				<meta name="robots" content="index, follow" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: structureData
					}}
				/>
			</Head>

			<main id="editor">
				<header className="thumbnail">
					<div
						className="image"
						style={{
							backgroundImage: `url("${editor.cover.url}")`
						}}
					/>
				</header>
				<article id="editor-detail">
					<figure className="profile">
						<img
							className="image"
							src={editor.image.url}
							alt={editor.image.alt}
						/>
					</figure>
					<h1 className="title">{editor.name}</h1>
					<p className="bio">{editor.bio}</p>
				</article>
				<h3 className="detail">Stories written by {editor.name}</h3>
				<footer id="editor-more-story">
					{!isServer ? renderCard(card) : null}
				</footer>
			</main>
		</Fragment>
	)
}

Editor.getInitialProps = async ctx => {
	let editorDetail = await ctx.apolloClient.query({
		query: getEditorWithBlogs,
		variables: { name: ctx.query.editor },
		ssr: true
	})

	return { editorDetail: editorDetail }
}

export default Editor
