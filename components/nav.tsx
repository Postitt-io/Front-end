import Axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

import SearchBar from './SearchBar';

import { useAuthState, useAuthDispatch, useMediaQuery } from '../context/auth';

const links = [
  { href: '/register', label: 'Register' },
  { href: '/login', label: 'Login' },
];

const Nav: React.FC = (): JSX.Element => {
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

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

  return (
    <nav className="bg-gray-200 border-b-2 dark:border-gray-200 dark:bg-gray-800">
      {/* Logo and title */}
      <div className="flex items-center justify-between p-3">
        <Link href="/">
          <a className="hidden cursor-pointer sm:block">
            <Image src={logoSource} alt="" width={140} height={40} />
          </a>
        </Link>
        <SearchBar />
        {/* Auth button */}
        <div className="flex items-center justify-between px-2 space-x-4 ">
          {!loading &&
            (authenticated ? (
              // show logout button
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
