import { FormEvent, useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Axios from 'axios';

import Image from 'next/image';
import InputGroup from '../components/inputGroup';
import { useAuthState } from '../context/auth';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();
  const router = useRouter();

  if (authenticated) router.push('/');

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
      </Head>
      <div
        className="h-screen bg-center bg-cover"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/register-bg.jpg)`,
        }}
      >
        <div className="container flex items-center justify-center">
          <div
            className="flex items-center w-full mx-8 mt-3 bg-white bg-opacity-50 rounded-lg lg:mx-4 sm:mt-10 sm:px-2 sm:bg-opacity-10"
            style={{ backdropFilter: 'blur(5px)' }} // note blur does not work on firefox
          >
            <div className="flex-row items-center hidden w-1/2 mx-6 bg-gray-800 rounded-lg shadow-lg sm:block">
              <Image src={'/newsletter.png'} alt="" width={500} height={350} />
            </div>
            <section className="w-full py-5 mx-4 my-5 rounded-lg sm:bg-gray-100 sm:mr-4 sm:px-5 lg:my-10 lg:py-10 sm:dark:bg-gray-800 sm:w-1/2">
              <h1 className="text-2xl font-semibold text-gray-900 md:text-4xl dark:text-gray-100">
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
                  password
                />
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
                <small className="block font-medium text-red-600">{errors.agreement}</small>
                <button type="submit" className="w-full my-3 btn-postitt">
                  Create Account
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
