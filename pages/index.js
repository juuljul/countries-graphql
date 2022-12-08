import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'

export default function Home({ countries }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Countries Graphql</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Countries
        </h1>

        <div className={styles.grid}>
          {countries.map(launch => {
            return (
              <>
              <div>{launch.name}</div>
              <div className={styles.emoji}>{launch.emoji} -</div>
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
      query GetCountries {
        countries {
          name
          emoji
        }
    }
    `
  });

  return {
    props: {
      countries: data.countries
    }
  }
}