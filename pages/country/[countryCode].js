import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { FaCity, FaMoneyBillWave } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { TbMessageLanguage } from 'react-icons/tb';
import Header from '../Header'


export default function Country({ country }) {

  return (
    <div className="p-5">
      <Head>
        <title>Country</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className="flex flex-col items-center">
      
      <div className="bg-gray-200 px-20 py-9 w-fit mt-8 bg-slate-800 rounded-xl text-slate-200">
        <div className="text-center text-9xl">
        {country.emoji}
        </div>
        <h1 className="text-center text-5xl">{country.native}
        { country.name!=country.native && <span> ({country.name}) </span>}
        </h1>

          <div className="flex justify-center">
          <div className="flex flex-col items-end ml-9 text-2xl">
            <div className='mt-7'><FaCity/></div>
            <div className='mt-8'><FaMoneyBillWave/></div>
            <div className='mt-8'><BsFillTelephoneFill/></div>
            <div className='mt-7'><TbMessageLanguage/></div>
          </div>
          <div className="flex flex-col items-start pl-4 text-2xl">
            <div className="pl-5 mt-6">{country.capital}</div>
            <div className="pl-5 mt-6">{country.currency}</div>
            <div className="pl-5 mt-6">{country.phone}</div>
            <div className="pl-5 mt-5">
            {country.languages.map(language => {
              return (
                <div >{language.name}</div>
              );})}
            </div>
          </div>
          </div>
          </div>
    </div>
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