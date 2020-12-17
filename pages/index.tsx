import Head from 'next/head';
import Axios from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Post } from '../types';

// import { GetServerSideProps } from 'next';

import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

dayjs.extend(relativeTime);

export default function IndexPage() {
  // CLIENT SIDE RENDERING
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Head>
        <title>Postitt.io</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts Feed */}
        <div className="w-160">
          {posts.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
      {/* Sidebar */}
    </div>
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
