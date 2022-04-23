import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <title>Wish Wheels</title> */}
          {/* <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" /> */}
          {/* <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon-theme.png" /> */}
          {/* <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon-theme-invert.png" /> */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="green" />
          <meta name="apple-mobile-web-app-title" content="WishWheels" />
          {/* sizes="2048x2732" */}
          <link
            href="favicon/apple-touch-startup-image"
            rel="apple-touch-startup-image"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-touch-icon-theme-final.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
          />
          {/* <link rel="manifest" href="favicon/site.webmanifest" /> */}
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
