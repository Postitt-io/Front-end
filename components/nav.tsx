import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

import { useAuthState, useAuthDispatch } from '../context/auth';
import Axios from 'axios';

const links = [
  { href: 'register', label: 'Register' },
  { href: 'login', label: 'Login' },
];

// TODO: Change image src from LogoDark to LogoLight when light mode is detected

const Nav: React.FC = () => {
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

  return (
    <nav className="bg-gray-200 border-b-2 h-15 dark:border-gray-200 dark:bg-gray-800">
      {/* Logo and title */}
      <ul className="flex items-center justify-between p-3">
        <Link href="/">
          <Image
            src="/LogoDark.svg"
            width={250}
            height={66}
            className="cursor-pointer"
          />
        </Link>
        {/* Search Input */}
        <ul className="flex items-center mx-auto transition duration-150 bg-gray-100 border rounded w-160 hover:border-button-blue hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
          <input
            type="text"
            className="py-1 pr-3 bg-transparent rounded focus:outline-none"
            placeholder="Search"
          />
        </ul>
        {/* Auth button */}
        <ul className="flex items-center justify-between space-x-4 ">
          {!loading &&
            (authenticated ? (
              //show logout button
              <button className="btn-postitt" onClick={logout}>
                Logout
              </button>
            ) : (
              <Fragment>
                {links.map(({ href, label }) => (
                  <li key={`${href}${label}`}>
                    <Link href={href}>
                      <a className="w-32 py-1 text-center btn-postitt">
                        {label}
                      </a>
                    </Link>
                  </li>
                ))}
              </Fragment>
            ))}
        </ul>
      </ul>
    </nav>
  );
};

export default Nav;
