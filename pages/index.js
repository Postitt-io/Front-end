import Image from 'next/image';

import Nav from '../components/nav';

export default function IndexPage() {
  return (
    <>
      <Nav />
      <div className="py-20 justify-center">
        <Image
          src="/default.svg"
          width={250}
          height={250}
          className="bg-white rounded-lg "
        />
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Next.js + Tailwind CSS 2.0
        </h1>
      </div>
    </>
  );
}
