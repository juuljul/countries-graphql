import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Continents({ continent, continentCode }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          COUNTRIES
        </h1>
        <h1>{continentCode}</h1>

        <div className={styles.grid}>
          {continent.countries.map(country => {
            return (
              <>
              <Link href={`../country/${country.code}`}>
              <div>{country.code} {country.name}</div>
              </Link>
              <div>-------</div>
              </>
            );
          })}
        </div>
      </main>
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
      continentCode: continentCode 
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