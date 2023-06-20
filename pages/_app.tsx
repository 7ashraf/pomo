import '../styles/tailwind.css';
import '../styles/font.css'
import Layout from '../components/Layout';
import {UserProvider} from '@auth0/nextjs-auth0/client'
import type { AppProps } from 'next/app';
import apolloClient from '../lib/apollo';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
    
  );
}

export default MyApp;
