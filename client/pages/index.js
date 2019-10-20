import { Fragment } from "react"

import Head from "next/head"

import Carousel from "components/carousel"
import Card from "components/card"
import EditorList from "components/editorList"

import { getLanding } from "helpers/query"

import {
	normalizeAssets,
	normalizeEditor,
	normalizeMetadata,
	normalizeLandingCard,
	createEditorKeys,
	isServer
} from "helpers/normalize"

import { Title, Description, Tag, SEOImage } from "components/head"

import "stylus/landing.styl"

const Index = ({ landingData }) => {
	if (isServer)
		return (
			<Fragment>
				{/* SEO */}
				<Title>
					Mystiar Blog - Blog of developer who like to create silly
					thing.
				</Title>
				<Description>
					Developed by developer who like to create silly things and
					write down useful thing about software development.
				</Description>
				<SEOImage href="/assets/cover.png" alt="Mystiar Blog" />
				<Head>
					<title>
						Mystiar Blog - Blog of developer who like to create
						silly thing.
					</title>
				</Head>
				<header id="mystiar-blog">
					<img
						className="icon"
						src="/icon/mystiar.png"
						alt="Mystiar Blog's icon"
					/>
					<h1 className="title">Mystiar Blog</h1>
				</header>
				<main id="landing">
					<Carousel preload />
					<section id="landing-body">
						<h2 className="title">Recently</h2>
						<section id="recent">
							{[1, 2, 3, 4, 5, 6].map(card => (
								<Card key={card} preload />
							))}
						</section>

						<h2 className="title">Editors</h2>
						<EditorList preload />
					</section>
					<footer id="footer">
						&copy; Mystiar Blog {new Date().getFullYear()}
					</footer>
				</main>
			</Fragment>
		)

	let normalizedEditorsAssets = normalizeAssets(
			landingData.editors.includes.Asset
		),
		normalizedEditors = landingData.editors.items.map(editor =>
			normalizeEditor(editor, normalizedEditorsAssets)
		),
		editorKeys = createEditorKeys(
			landingData.editors.items,
			normalizedEditors
		)

	let normalizedBlogByPopularityAssets = normalizeAssets(
			landingData.popularity.includes.Asset
		),
		normalizedBlogByPopularityMetadata = landingData.popularity.items.map(
			blogsByPopularity => normalizeMetadata(blogsByPopularity)
		),
		normalizedLandingPopularityCard = normalizeLandingCard(
			normalizedBlogByPopularityMetadata,
			normalizedBlogByPopularityAssets,
			editorKeys
		)

	let normalizedBlogByRecentAssets = normalizeAssets(
			landingData.recent.includes.Asset
		),
		normalizedBlogByRecentMetadata = landingData.recent.items.map(
			blogsByRecent => normalizeMetadata(blogsByRecent)
		),
		normalizedLandingRecentCard = normalizeLandingCard(
			normalizedBlogByRecentMetadata,
			normalizedBlogByRecentAssets,
			editorKeys
		)

	return (
		<Fragment>
			{/* SEO */}
			<Title>
				Mystiar Blog - Blog of developer who like to create silly thing.
			</Title>
			<Description>
				Developed by developer who like to create silly things and write
				down useful thing about software development.
			</Description>
			<SEOImage href="/assets/cover.png" alt="Mystiar Blog" />
			<Head>
				<title>
					Mystiar Blog - Blog of developer who like to create silly
					thing.
				</title>
			</Head>
			<header id="mystiar-blog">
				<img
					className="icon"
					src="/icon/mystiar.png"
					alt="Mystiar Blog's icon"
				/>
				<h1 className="title">Mystiar Blog</h1>
			</header>
			<main id="landing">
				<Carousel data={normalizedLandingPopularityCard} />
				<section id="landing-body">
					<h2 className="title">Recently</h2>
					<section id="recent">
						{normalizedLandingRecentCard.map((card, index) => (
							<Card
								key={index}
								href={card.title}
								editor={card.editor.name}
								src={card.thumbnail.url}
								alt={card.thumbnail.alt}
							>
								{card.title}
							</Card>
						))}
					</section>

					<h2 className="title">Editors</h2>
					<EditorList editors={normalizedEditors} />
				</section>
				<footer id="footer">
					&copy; Mystiar Blog {new Date().getFullYear()}
				</footer>
			</main>
		</Fragment>
	)
}

Index.getInitialProps = async ctx => {
	let landingData = await ctx.apolloClient.query({
		query: getLanding,
		ssr: true
	})

	return { landingData: landingData.data.getLanding }
}

export default Index
