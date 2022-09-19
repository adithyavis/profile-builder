import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Profile viewer app by adithyavis" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <title>Profile Viewer</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
