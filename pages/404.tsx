import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    // TODO: #25 Make this look nice
    <div className="flex flex-col items-center">
      <h1 className="mt-10 mb-4 text-5xl font-thin text-gray-800 dark:text-gray-200">
        Error 404: Page Not Found!
      </h1>
      <div className="mb-4 bg-gray-800 rounded shadow-inner">
        <Image src={'/error-bw.png'} width={500} height={350} />
      </div>
      <Link href="/">
        <a className="px-4 py-2 btn-postitt">Home</a>
      </Link>
    </div>
  );
}
