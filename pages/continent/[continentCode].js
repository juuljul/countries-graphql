import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Continents({ continent }) {

  return (
    <div className="p-5">
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


        <ul className="flex justify-between flex-wrap text-xl text-slate-200">
          {continent.countries.map(country => {
            return (
              <li className="my-9 mx-5 w-1/4">
              <Link href={`../country/${country.code}`} className="flex flex-row justify-center p-4 bg-gray-200 bg-slate-800 rounded-xl">
              <div className="pr-5">{country.name}</div>
              <div>{country.emoji}</div>
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