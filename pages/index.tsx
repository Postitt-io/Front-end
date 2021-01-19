import Head from 'next/head';
import useSWR, { useSWRInfinite } from 'swr';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { GetServerSideProps } from 'next';

import { Fragment, useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Post, Sub } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from '../context/auth';

dayjs.extend(relativeTime);

export default function IndexPage() {
  const [observedPost, setObservedPost] = useState('');

  // const { data: posts } = useSWR<Post[]>('/posts');
  const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    mutate,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  const posts: Post[] = data ? [].concat(...data) : [];

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(element);
  };

  return (
    <Fragment>
      <Head>
        <title>Postitt.io</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts Feed */}
        <div className="w-full px-4 md:w-160 md:p-0">
          {isValidating && (
            <p className="text-lg text-center text-gray-900 dark:text-gray-100">Loading...</p>
          )}
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} revalidate={revalidate} />
          ))}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center text-gray-900 dark:text-gray-100">
              Loading more posts...
            </p>
          )}
        </div>
        {/* Sidebar */}
        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">Top Postitt Boards</p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div key={sub.name} className="flex items-center px-4 py-2 text-xs border-b">
                  <Link href={`p/${sub.name}`}>
                    <a>
                      <Image
                        src={sub.imageUrl}
                        alt={sub.name}
                        className="overflow-hidden rounded-full cursor-pointer"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </a>
                  </Link>

                  <Link href={`p/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">p/{sub.name}</a>
                  </Link>
                  <p className="ml-auto font-medium">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/boards/create">
                  <a className="w-full px-2 py-1 text-sm btn-postitt">Create Board</a>
                </Link>
              </div>
            )}
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
