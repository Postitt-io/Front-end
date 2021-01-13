import Head from 'next/head';
import useSWR from 'swr';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { GetServerSideProps } from 'next';

import { Fragment } from 'react';
import PostCard from '../components/PostCard';
import { Post, Sub } from '../types';
import Image from 'next/image';
import Link from 'next/link';

dayjs.extend(relativeTime);

export default function IndexPage() {
  const { data: posts } = useSWR<Post[]>('/posts');
  const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

  return (
    <Fragment>
      <Head>
        <title>Postitt.io</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts Feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/* Sidebar */}
        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Postitt Boards
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`p/${sub.name}`}>
                    <Image
                      src={sub.imageUrl}
                      alt={sub.name}
                      className="overflow-hidden rounded-full cursor-pointer"
                      width={(6 * 16) / 4}
                      height={(6 * 16) / 4}
                    />
                  </Link>

                  <Link href={`p/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      p/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-medium">
                    {sub.postCount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
// SSR Example
// export const getServerSideProps: GetServerSideProps = async (
//   context,
// ) => {
//   try {
//     const res = await Axios.get('/posts');

//     return { props: { posts: res.data } };
//   } catch (err) {
//     {
//       props: {
//         error: 'Something went wrong';
//       }
//     }
//   }
// };
