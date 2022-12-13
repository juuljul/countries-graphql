import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../../styles/Home.module.css'

import { GrCurrency } from 'react-icons/gr';
import { FaCity } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { TbMessageLanguage } from 'react-icons/tb';

export default function Country({ country }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Country</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        {country.emoji}
        </h1>
        <h1>{country.native}
        { country.name!=country.native && <span> ({country.name}) </span>}
        </h1>

        <div className={styles.grid}>
            <FaCity/>
              <div>{country.capital}</div>
        <BsFillTelephoneFill/>

              <div>{country.phone}</div>
             <GrCurrency/>

              <div>{country.currency}</div>
          {country.languages.map(language => {
            return (
              <>
              <TbMessageLanguage/>
              <div>{language.name}</div>
              </>
            );
          })}
        </div>
      </main>
    </div>
  )
}


export async function getStaticProps({params}) {
  
  const { countryCode } = params

  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache()
  });

  const query = gql`
  query GetCountry($code: ID!) {
    country(code: $code){
      name
      native
      capital
      emoji
      currency
      phone
      languages {
        code
        name
      }
    }
  }
  `;

  const { data } = await client.query({
    query: query,
    variables: {
      code: countryCode
    }
  })

  return {
    props: {
      country: data.country
    }
  }
}

export async function getStaticPaths() {

  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetCountryCodes {
            countries {
              code
            }
    }
    `
  }
  )

  const paths = data.countries.map((country) => {
    return { params: {countryCode: country.code} }
  });
  
  return {
    paths: paths,
    fallback: false
  };
}