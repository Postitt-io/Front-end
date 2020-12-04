/* eslint-disable react/no-unescaped-entities */
import Nav from '../components/nav';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

export default function LoginPage() {
  return (
    <div>
      <Nav />
      <div className="container mx-auto flex items-center justify-center h-full">
        <section className="py-20">
          <h1 className="font-semibold text-5xl text-gray-900 dark:text-gray-100">
            Login to <u>Post</u>itt
          </h1>
          <p className="clear-left text-lg font-light py-3 text-gray-600">
            Don't have have an account?{' '}
            <a href="register" className="text-blue-400">
              Sign Up
            </a>
          </p>
          <form>
            <input
              id="username"
              type="username"
              name="username"
              className="my-4 input-postitt"
              placeholder="Username"
            />
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <input
                id="password"
                type="password"
                name="password"
                className="input-postitt"
                placeholder="Password"
              />
              <span className="z-10 h-full leading-snug font-normal text-center text-gray-400 absolute bg-transparent text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <i className="far fa-eye-slash"></i>
              </span>
            </div>
            <button className="btn-postitt w-full my-4">Login</button>
          </form>
        </section>
      </div>
    </div>
  );
}
