import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Axios from 'axios';

import { useRouter } from 'next/router';
import { AuthProvider } from '../context/auth';

import '../styles/index.css';
import Nav from '../components/nav';
import Head from 'next/head';

Axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`;
Axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <Head>
        <title>Postitt.io</title>
      </Head>
      <AuthProvider>
        {!authRoute && <Nav />}
        <div className={authRoute ? '' : ''}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}
export default App;
