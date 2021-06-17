import { FormEvent, useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Axios from 'axios';

// import classNames from 'classnames';
import { useAuthDispatch, useAuthState } from '../context/auth';

import InputGroup from '../components/inputGroup';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push('/');

  const submitForm = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const res = await Axios.post('auth/login', {
        username,
        password,
      });

      dispatch('LOGIN', res.data);

      router.back();
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container flex items-center justify-center h-full mx-auto">
        <section className="py-20">
          <h1 className="text-5xl font-semibold text-gray-900 dark:text-gray-100">
            Login to <u>Post</u>itt
          </h1>
          <small className="text-lg font-light text-gray-600 clear-left dark:text-gray-100">
            {"Don't"} have an account?
            <Link href="/register">
              <a className="ml-1 text-blue-400 ">Register</a>
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
              className="relative flex flex-wrap items-stretch w-full mb-8"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.password}
              password
            />
            <button type="submit" className="w-full my-3 btn-postitt">
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
