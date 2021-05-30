import { useEffect } from 'react';
import Header from './components/Header';
import Link from 'next/link';
import Footer from './components/Footer';
import CopyWrite from './components/FooterCopyWrite';
import Head from 'next/head';
import Aos from 'aos';
import '../node_modules/aos/dist/aos.css';




export default function Layout({ children }) {
    useEffect(() => {
        Aos.init({
            duration: 2000
        })
    }, [])
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="author" content="" />
            </Head>
            <Header />
            {children}
            <Footer />
            <CopyWrite />
            <Link href="#"><a id="back-to-top" title="Back to top" style={{ display: 'none' }}>&uarr;</a></Link>
        </>
    )
}

// "dev": "nodemon server/index.js",
// "build": "nodemon server/index.js",

