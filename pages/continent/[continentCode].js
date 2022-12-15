import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Header from '../Header'


export default function Continents({ continent }) {

  return (
    <div className="p-5">
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
        <ul className="flex justify-between flex-wrap text-xl text-slate-200 mt-5">
          {continent.countries.map(country => {
            return (
              <li className="my-9 mx-5 w-1/5">
              <Link href={`../country/${country.code}`} className="flex flex-row justify-center p-4 bg-slate-800 rounded-xl">
              <div>{country.name}</div>
              <div className="pl-3">{country.emoji}</div>
              </Link>
              </li>
            );
          })}
        </ul>
    </div>
  )
}


export async function getStaticProps({params}) {
  
  const { continentCode } = params

  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache()
  });

  const query = gql`
  query GetCountriesByContinent($code: ID!) {
    continent(code: $code){
      name
      countries {
        emoji
        name
        code
      }
    }
  }
  `;

  const { data } = await client.query({
    query: query,
    variables: {
      code: continentCode
    }
  })

  return {
    props: {
      continent: data.continent,
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { continentCode: 'AF' } },
      { params: { continentCode: 'AN' } },
      { params: { continentCode: 'AS' } },
      { params: { continentCode: 'EU' } },
      { params: { continentCode: 'NA' } },
      { params: { continentCode: 'OC' } },
      { params: { continentCode: 'SA' } },
    ],
    fallback: false
  };
}