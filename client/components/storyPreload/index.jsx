import dynamic from "next/dynamic"

const AdditionalFooter = dynamic(() => import("components/additionalFooter"))
const StoryTools = dynamic(() => import("components/storyTools"))

const StoryPreload = () => (
	<main id="story">
		<StoryTools />

		{/* Blog */}
		<article className="article">
			{/* Visible on large device */}
			<header id="story-title-large">
				<h1 className="title preload" />
				<p className="detail preload">
					<span className="preload" />
					<a className="inline-editor preload" />
					<time className="publish-date preload" />
				</p>
			</header>

			<figure className="thumbnail preload">
				<div className="thumbnail-edge" />
			</figure>

			{/* Visible on small device */}
			<header id="story-title">
				<h1 className="title preload" />
				<p className="detail preload">
					<span className="preload" />
					<a className="inline-editor preload" />
					<time className="publish-date preload" />
				</p>
			</header>

			<section id="story-data">
				<p className="preload" />
				<p className="preload" />
				<p className="preload" />
				<p className="preload half" />
				<hr className="story-hr" />

				<p className="preload" />
				<p className="preload" />
				<p className="preload" />
				<p className="preload half" />
				<hr className="story-hr" />

				<p className="preload" />
				<p className="preload" />
				<p className="preload" />
				<p className="preload half" />
			</section>

			<AdditionalFooter preload tags={[""]} title="" />
		</article>
	</main>
)

export default StoryPreload
