import Nav from '../components/nav';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';

export default function RegisterPage() {
  return (
    <div>
      <Nav />
      <div className="container mx-auto flex items-center justify-center h-full">
        <section className="py-20">
          <h1 className="font-semibold text-5xl text-gray-900 dark:text-gray-100">
            Sign Up to <u>Post</u>itt
          </h1>
          <p className="clear-left text-lg font-light py-3 text-gray-600 dark:text-gray-100">
            Already have an account?{' '}
            <a href="login" className="text-blue-400">
              Log In
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
            <input
              id="email"
              type="email"
              name="email"
              className="my-4 input-postitt"
              placeholder="Email"
            />
            <div className="relative flex w-full flex-wrap items-stretch my-4">
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
            <button className="no-underline rounded-lg font-semibold text-lg btn-postitt w-full my-4">
              Create Account
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
