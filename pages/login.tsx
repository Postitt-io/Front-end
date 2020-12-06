/* eslint-disable react/no-unescaped-entities */
import Nav from '../components/nav';
import Link from 'next/link';
import Head from 'next/head';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="container flex items-center justify-center h-full mx-auto">
        <section className="py-20">
          <h1 className="text-5xl font-semibold text-gray-900 dark:text-gray-100">
            Login to <u>Post</u>itt
          </h1>
          <small className="text-lg font-light text-gray-600 clear-left dark:text-gray-100">
            Don't have an account?
            <Link href="/register">
              <a className="ml-1 text-blue-400 ">Register</a>
            </Link>
          </small>
          <form>
            <div className="my-4">
              <input
                id="username"
                type="text"
                name="username"
                className="input-postitt"
                placeholder="Username"
              />
            </div>
            <div className="relative flex flex-wrap items-stretch w-full mb-8">
              <input
                id="password"
                type="password"
                name="password"
                className="input-postitt"
                placeholder="Password"
              />
              <span className="absolute right-0 z-10 items-center justify-center w-8 h-full py-3 pr-3 text-base font-normal leading-snug text-center text-gray-400 bg-transparent">
                <i className="far fa-eye-slash"></i>
              </span>
            </div>
            <button className="w-full btn-postitt">Login</button>
          </form>
        </section>
      </div>
    </div>
  );
}
