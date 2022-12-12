
import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'


export default function Home({ continents }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Continents</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CONTINENTS
        </h1>

        <div className={styles.grid}>
          {continents.map(continent => {
            return (
              <>
              <div>{continent.code} {continent.name}</div>
              <div>------</div>
              </>
            );
          })}
        </div>
      </main>

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