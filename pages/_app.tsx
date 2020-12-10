import { AppProps } from 'next/app';
import '../styles/index.css';
import Axios from 'axios';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';

Axios.defaults.baseURL = 'http://localhost:5000/api';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default App;
