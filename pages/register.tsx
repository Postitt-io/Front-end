import Nav from '../components/nav';
import Link from 'next/link';
import Head from 'next/head';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';

export default function RegisterPage() {
  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="container flex items-center justify-center h-full mx-auto">
        <section className="py-20">
          <h1 className="text-5xl font-semibold text-gray-900 dark:text-gray-100">
            Sign Up to <u>Post</u>itt
          </h1>
          <small className="text-lg font-light text-gray-600 clear-left dark:text-gray-100">
            Already have an account?
            <Link href="/login">
              <a className="ml-1 text-blue-400 ">Log In</a>
            </Link>
          </small>
          <form>
            <div className="my-4">
              <input
                id="username"
                type="username"
                name="username"
                className="input-postitt"
                placeholder="Username"
              />
            </div>
            <div className="my-4">
              <input
                id="email"
                type="email"
                name="email"
                className="input-postitt"
                placeholder="Email"
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
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              id="agreement"
            />
            <label
              htmlFor="agreement"
              className="text-xs font-light text-gray-600 cursor-pointer clear-left dark:text-gray-100"
            >
              I agree to get emails about cool stuff on Postitt
            </label>
            <button className="w-full my-3 btn-postitt">
              Create Account
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
