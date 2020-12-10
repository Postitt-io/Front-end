import { FormEvent, useState } from 'react';

import Nav from '../components/nav';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Axios from 'axios';

import InputGroup from '../components/inputGroup';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const submitForm = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!agreement) {
      setErrors({
        ...errors,
        agreement: 'You must agree to T&C before proceeding',
      });
      return;
    }
    try {
      await Axios.post('/auth/register', {
        username,
        email,
        password,
      });

      router.push('/login');
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

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
          <form onSubmit={submitForm}>
            <InputGroup
              className="my-4"
              type="text"
              value={username}
              setValue={setUsername}
              placeholder="Username"
              error={errors.username}
            />
            <InputGroup
              className="my-4"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="Email"
              error={errors.email}
            />
            <InputGroup
              className="relative flex flex-wrap items-stretch w-full mb-8"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.password}
            />

            {/* <div className="relative flex flex-wrap items-stretch w-full mb-8">
              <input
                id="password"
                type="password"
                name="password"
                className={classNames('input-postitt', {
                  'border-red-500': errors.password,
                })}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-0 z-10 items-center justify-center w-8 h-full py-3 pr-3 text-base font-normal leading-snug text-center text-gray-400 bg-transparent">
                <i className="far fa-eye-slash"></i>
              </span>
            </div> */}

            <small className="font-medium text-red-600">
              {errors.password}
            </small>
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              id="agreement"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
            />
            <label
              htmlFor="agreement"
              className="text-xs font-light text-gray-600 cursor-pointer clear-left dark:text-gray-100"
            >
              I agree to get emails about cool stuff on Postitt
            </label>
            <small className="block font-medium text-red-600">
              {errors.agreement}
            </small>
            <button type="submit" className="w-full my-3 btn-postitt">
              Create Account
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
