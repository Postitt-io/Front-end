import Head from 'next/head';
import useSWR from 'swr';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { GetServerSideProps } from 'next';

import { Fragment } from 'react';
import PostCard from '../components/PostCard';

dayjs.extend(relativeTime);

export default function IndexPage() {
  const { data: posts } = useSWR('/posts');

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
      </div>
      {/* Sidebar */}
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
