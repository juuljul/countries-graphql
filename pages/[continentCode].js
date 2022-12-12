import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'


export default function Continents({ continent }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Countries Graphql</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          COUNTRIES
        </h1>

        <div className={styles.grid}>
          {continent.countries.map(country => {
            return (
              <>
              <div>{country.name}</div>
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
      countries {name}
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