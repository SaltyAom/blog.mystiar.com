import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="th">
                <Head key={"_document.jsx"}>
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta property="og:locale" content="th_TH" />
                    <meta property="og:site_name" content="Mystiar Blog" />
                    <meta property="og:type" content="blog" />
                    <meta name="robots" content="index, follow" />

                    <link rel="icon" href="/icon/mystiar.png" />
                    <link rel="preload" as="stylesheet" href="/static/css/dark-theme.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}