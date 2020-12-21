import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Axios from 'axios';

import { useRouter } from 'next/router';
import { AuthProvider } from '../context/auth';

import '../styles/index.css';
import Nav from '../components/nav';

Axios.defaults.baseURL = 'http://localhost:5000/api';
Axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <SWRConfig
      value={{
        fetcher: (url) => Axios.get(url).then((res) => res.data),
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!authRoute && <Nav />}
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  );
}
export default App;
