import Slider from './components/Slider';
import Category from './components/ShopCategory';
import Blog from './components/BlogArea';
import Head from 'next/head';

export default function Home({result}) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Slider />
      <Category />
      <Blog result={result}/>
    </>
  )
}


export async function getStaticProps(ctx) {
  const res = await fetch(`https://ecommerce-203.herokuapp.com/api/blog/get_blog/${10}`)
  const result = await res.json()

  return {
    props: {result}
  }
}