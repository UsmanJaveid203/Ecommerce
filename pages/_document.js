import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="images/download.jpg" />
                    <link rel="stylesheet" href="css/bootstrap.min.css" />
                    <link rel="stylesheet" href="css/style.css" />
                    <link rel="stylesheet" href="css/all.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <script src="js/jquery-3.2.1.min.js"></script>
                    <script src="js/bootstrap.min.js"></script>
                    <script src="js/all.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument