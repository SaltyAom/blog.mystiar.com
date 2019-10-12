import { Fragment, useState, useEffect } from "react"

import Head from "next/head"
import dynamic from "next/dynamic"

import { useQuery } from "@apollo/react-hooks"
import { getEditorWithBlogs } from "helpers/query"

import {
	normalizeAssets,
	normalizeEditor,
	normalizeCard,
	renderCard
} from "helpers/normalize"

import { Title, Description, Tag, SEOImage } from "components/head"

import "stylus/editor.styl"

const Error = dynamic(() => import("components/error"))

const Editor = ({ editorName }) => {
	let [isParsing, setParsing] = useState(true)

	/* Apollo GraphQL */
	let { data, isLoading, error } = useQuery(getEditorWithBlogs, {
		variables: { name: editorName },
		ssr: true
	})

	if (error) return <Error />

	/* Check if data loading */
	useEffect(() => {
		if (typeof data === "undefined") return setParsing(true)
		if (typeof data.getEditorWithBlogs === "undefined")
			return setParsing(true)
		setParsing(false)
	}, [data])

	if (isLoading || isParsing)
		return (
			<main id="editor">
				<header className="thumbnail">
					<div className="image" />
				</header>
				<article id="editor-detail">
					<figure className="profile">
					</figure>
					<h1 className="title preload" />
					<p className="bio preload" />
				</article>
				<h3 className="detail preload" />
				<footer id="editor-more-story" />
			</main>
		)

	/* If story are valid */
	let assets, editor, card, tags

	assets = normalizeAssets(data.getEditorWithBlogs.blog.includes.Asset)
	editor = normalizeEditor(data.getEditorWithBlogs.editor.items, assets)
	card = normalizeCard(data.getEditorWithBlogs.blog.items, assets)

	tags = [editor.name, "Mystiar Blog", "editor"]

	return (
		<Fragment>
			{/* SEO */}
			<Title>{editor.name} - Editor on Mystiar Blog</Title>
			<Description>{editor.bio}</Description>
			<Tag tags={tags} />
			<SEOImage href={editor.cover.url} alt={editor.cover.alt} />
			<Head>
				<title>{editor.name} - Editor on Mystiar Blog</title>
				{/** Structured Data (schema) */}
				<meta name="robots" content="index, follow" />

				{/*
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: structureData
					}}
				/>
                */}
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
				<footer id="editor-more-story">{renderCard(card)}</footer>
			</main>
		</Fragment>
	)
}

Editor.getInitialProps = ctx => {
	return { editorName: ctx.query.editor }
}

export default Editor
