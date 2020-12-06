import Nav from '../components/nav';
import Head from 'next/head';

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>Postitt.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700  dark:text-gray-100">
          Next.js + Tailwind CSS 2.0
        </h1>
      </div>
    </div>
  );
}
