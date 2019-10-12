import React from 'react'

import Head from 'next/head'

export const Title = ({ children }) => (
    <Head>
        <meta name="title" content={children} />
        <meta name="twitter:title" content={children} />
        <meta property="og:title" content={children} />
    </Head>
)

export const Description = ({ children }) => (
    <Head>
        <meta name="description" content={children} />
        <meta name="twitter:description" content={children} />
        <meta property="og:description" content={children} />
    </Head>
)

export const Tag = ({ tags = [] }) => (
    <Head>
        <meta name="keywords" content={ tags.toString() } />
        <meta name="article:tag" content={ tags.toString() } />
    </Head>
)

export const SEOImage = ({ href = "", width = 1366, height = 720, alt = "" }) => (
    <Head>
        <meta property="og:image" content={href} />
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
        <meta property="og:image:alt" content={alt} />
        <meta property="twitter:image" content={href} />
    </Head>
)