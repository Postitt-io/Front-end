import Axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { Sub } from '../types';

import {
  useAuthState,
  useAuthDispatch,
  useMediaQuery,
} from '../context/auth';

const links = [
  { href: '/register', label: 'Register' },
  { href: '/login', label: 'Login' },
];

const Nav: React.FC = (): JSX.Element => {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [name, setName] = useState('');
  const [timer, setTimer] = useState(null);

  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const router = useRouter();

  const logout = () => {
    Axios.get('/auth/logout')
      .then(() => {
        dispatch('LOGOUT');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const logoSource = useMediaQuery(
    '(prefers-color-scheme: dark)',
    '/LogoDark.svg',
    '/LogoLight.svg',
  );

  useEffect(() => {
    if (name.trim() === '') {
      setSubs([]);
      setName('');
      return;
    }
    searchSubs();
  }, [name]);

  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await Axios.get(`/subs/search/${name}`);
          setSubs(data);
        } catch (err) {
          console.log(err);
        }
      }, 250),
    );
  };

  return (
    <nav className="bg-gray-200 border-b-2 dark:border-gray-200 dark:bg-gray-800">
      {/* Logo and title */}
      <div className="flex items-center justify-between p-3">
        <Link href="/">
          <a className="hidden cursor-pointer sm:block">
            <Image src={logoSource} width={250} height={66} />
          </a>
        </Link>
        {/* Search Input */}
        <div className="max-w-full px-4 w-160">
          <div className="relative flex items-center transition duration-150 bg-gray-100 border rounded hover:border-button-blue hover:bg-white">
            <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
            <input
              type="text"
              className="py-1 pr-3 bg-transparent rounded focus:outline-none"
              placeholder="Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* FIXME: #53 this overlaps the images in the top boards listt */}
            <div
              className="absolute left-0 right-0 bg-white"
              style={{ top: '100%' }}
            >
              {subs?.map(
                (sub): JSX.Element => (
                  <Link href={`/p/${sub.name}`}>
                    <div
                      className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
                      onClick={() => setName('')}
                    >
                      <a>
                        <Image
                          src={sub.imageUrl}
                          alt={sub.name}
                          className="rounded-full"
                          height={(8 * 16) / 4}
                          width={(8 * 16) / 4}
                        />
                      </a>
                      <div className="ml-4 text-sm">
                        <p className="font-medium">{sub.name}</p>
                        <p className="text-gray-600">{sub.title}</p>
                        {/* TODO: #54 show number of members in the sub */}
                        <p className="text-gray-600">420 members</p>
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Auth button */}
        <div className="flex items-center justify-between px-2 space-x-4 ">
          {!loading &&
            (authenticated ? (
              //show logout button
              <button
                className="hidden w-20 py-1 text-sm text-center lg:w-32 lg:text-lg btn-postitt sm:block"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Fragment>
                {links.map(({ href, label }) => (
                  <div key={`${href}${label}`}>
                    <Link href={href}>
                      <a className="hidden w-20 py-1 text-sm text-center lg:w-32 lg:text-lg btn-postitt sm:block">
                        {label}
                      </a>
                    </Link>
                  </div>
                ))}
              </Fragment>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
