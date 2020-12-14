import { AppProps } from 'next/app';
import Axios from 'axios';

import '../styles/index.css';
import Nav from '../components/nav';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

Axios.defaults.baseURL = 'http://localhost:5000/api';
Axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <Fragment>
      {!authRoute && <Nav />}
      <Component {...pageProps} />
    </Fragment>
  );
}
export default App;
