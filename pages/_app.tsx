import { AppProps } from 'next/app';
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
    <AuthProvider>
      {!authRoute && <Nav />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default App;
