import Link from 'next/link';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

import Astronaut from '../public/astronaout.json';

export default function NotFound() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: Astronaut,
    });
  }, []);

  return (
    <div
      className="h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/404-bg.jpg)`,
      }}
    >
      <div className="flex flex-col items-center ">
        <h1 className="mt-10 mb-4 text-5xl font-thin text-center text-gray-800 dark:text-gray-200">
          Error 404: Page Not Found!
        </h1>

        <div
          className="w-1/2 mb-4 bg-white rounded-full shadow-lg lg:w-1/4 bg-clip-padding bg-opacity-20"
          style={{ backdropFilter: 'blur(5px)' }} // note blur does not work on firefox
          ref={container}
        />

        <Link href="/">
          <a className="px-4 py-2 btn-postitt">Go Home</a>
        </Link>
      </div>
    </div>
  );
}
