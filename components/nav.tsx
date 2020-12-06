import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: 'register', label: 'Register' },
  { href: 'login', label: 'Login' },
];

// TODO Change image src from LogoDark to LogoLight when light mode is detected

export default function Nav() {
  return (
    <nav className="border-b-2 dark:bg-gray-800">
      <ul className="flex items-center justify-between p-3">
        <li>
          <Link href="/">
            <Image
              src="/LogoDark.svg"
              width={250}
              height={66}
              className="cursor-pointer"
            />
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link href={href}>
                <a className="btn-postitt">{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
