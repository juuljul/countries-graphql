import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'
import Header from './Header'


export default function Home({ continents }) {
  return (
    <div className="p-5">
      <Head>
        <title>Continents</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <ul className="flex justify-around flex-wrap text-xl text-slate-200 mt-5">
        {continents.map(continent => {
          return (
            <li className="my-9 mx-5 w-1/4">
            <Link href={`continent/${continent.code}`} className="flex flex-row justify-center p-4 bg-gray-200 bg-slate-800 rounded-xl ">
            <div>{continent.name}</div>
            </Link>
            </li>
          );
        })}
      </ul>

    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetContinents {
            continents {
              code
              name
            }
    }
    `
  }
  )

  return {
    props: {
      continents: data.continents
    }
  }
}