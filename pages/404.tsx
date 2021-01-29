// import Image from 'next/image';
import Link from 'next/link';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { Container } from 'next/app';

export default function NotFound() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../public/astronaout.json'),
    });
  }, [container]);

  return (
    // TODO: #25 Make this look nice
    <div className="flex flex-col items-center">
      <h1 className="mt-10 mb-4 text-5xl font-thin text-center text-gray-800 dark:text-gray-200">
        Error 404: Page Not Found!
      </h1>

      <div className="w-1/2 mb-4 bg-gray-800 rounded shadow-inner lg:w-1/4" ref={container}>
        {/* <Image src={'/error.png'} width={500} height={350} /> */}
      </div>

      <Link href="/">
        <a className="px-4 py-2 btn-postitt">Home</a>
      </Link>
    </div>
  );
}
