import { useState, useEffect } from "react"

import Link from "next/link"

import "./carousel.styl"

const Carousel = ({ data = [], preload = false }) => {
	if (preload)
		return (
			<header id="carousel">
				<div id="carousel-scroller" className="preload">
					{[1, 2, 3, 4, 5].map((pane, index) => (
						<div id={`carousel-${index}`} className="pane preload">
							<h3 className="name preload" />
							<div className="overlay" />
						</div>
					))}
					<div id="carousel-end" />
				</div>
				<div className="progress">
					<button className="bar active" />
					{[2, 3, 4, 5].map((data, index) => (
						<button className="bar" />
					))}
				</div>
			</header>
		)

	let [currentPane, setCurrentPane] = useState(0),
		[isDragged, setDragged] = useState(false)

	const handleCarouselDrag = event => {
		let dragStart = event.screenX,
			carousel = document.getElementById("carousel-scroller"),
			carouselPosition = carousel.scrollLeft,
			dragLeft = false,
			isTouched = false

		carousel.classList.add("scrolling")

		carousel.ontouchstart = () => isTouched = true

		carousel.onmousemove = event => {
			let dragDifferent = (event.screenX - dragStart) * -1

			if(!isTouched)
				carousel.scrollTo({
					top: 0,
					left: carouselPosition + dragDifferent
				})

			dragLeft = dragDifferent < 0 ? true : false

			if(!isDragged) setDragged(true)
		}

		/* Cleanup */
		carousel.onmouseup = () => {
			carousel.classList.remove("scrolling")
			carousel.onmousemove = null

			if(!isTouched)
				carousel.scrollTo({
					top: 0,
					left: dragLeft
						? carousel.scrollLeft - window.innerWidth / 2.25
						: carousel.scrollLeft + window.innerWidth / 2.25,
					behavior: "smooth"
				})
		}
	}

	const handleScroll = event => {
		setCurrentPane(
			Math.round(
				event.target.scrollLeft /
					document.getElementById("carousel-0").offsetWidth
			)
		)
	}

	const scrollTo = pane => {
		let carousel = document.getElementById("carousel-scroller")
		carousel.scrollTo({
			top: 0,
			left: pane * document.getElementById("carousel-0").offsetWidth,
			behavior: "smooth"
		})
	}

	const viewStory = (event) => {
		if(!isDragged) return null
		event.preventDefault()
		setDragged(false)
	}

	return (
		<header id="carousel">
			<div
				id="carousel-scroller"
				onScroll={event => handleScroll(event)}
				onMouseDown={event => handleCarouselDrag(event)}
			>
				{data.map((pane, index) => (
					<Link href="/story/[story]" as={`/story/${pane.title}`}>
						<a
							id={`carousel-${index}`}
							className="pane"
							onClick={(event) => viewStory(event)}
							style={{
								backgroundImage: `url(${pane.thumbnail.url})`
							}}
						>
							<h3 className="name">{pane.title}</h3>
							<div className="overlay" />
						</a>
					</Link>
				))}
				<div id="carousel-end" />
			</div>
			<div className="progress">
				{data.map((data, index) => (
					<button
						onClick={() => scrollTo(index)}
						className={`${
							currentPane === index ? "active" : ""
						} bar`}
					/>
				))}
			</div>
		</header>
	)
}

export default Carousel
