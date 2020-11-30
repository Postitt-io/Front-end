import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: 'register', label: 'Register' },
  { href: 'login', label: 'Login' },
];

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <Image src="/Logo.svg" width={250} height={66} />
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a
                href={href}
                className="no-underline font-semibold btn-postitt"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
