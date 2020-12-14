import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { Post } from '../types';
import { GetServerSideProps } from 'next';

dayjs.extend(relativeTime);

export default function IndexPage({ posts }) {
  // CLIENT SIDE EXAMPLE RENDERING BELOW, PAGE USES SSR
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   Axios.get('/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div>
      <Head>
        <title>Postitt.io</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts Feed */}
        <div className="w-160">
          {posts.map((post) => (
            <div
              key={post.identifier}
              className="flex mb-4 bg-white rounded"
            >
              {/* Vote Section */}
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <p>V</p>
              </div>
              {/* Post data section */}

              <div className="w-full p-2">
                <div className="flex items-center">
                  {/* Sub  Icon */}
                  <Link href={`/p/${post.subName}`}>
                    <img
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                    />
                  </Link>
                  {/* Sub Name */}
                  <Link href={`/p/${post.subName}`}>
                    <a className="text-xs font-semibold cursor-pointer hover:underline">
                      p/{post.subName}
                    </a>
                  </Link>
                  <p className="text-xs text-gray-500">
                    <span className="mx-1">•</span>
                    Posted by
                    {/* Username */}
                    <Link href={`/u/${post.username}`}>
                      <a className="mx-1 hover:underline">
                        u/{post.username}
                      </a>
                    </Link>
                    {/* Timestamp */}
                    <Link href={post.url}>
                      <a className="mx-1 hover:underline">
                        {dayjs(post.createdAt).fromNow()}
                      </a>
                    </Link>
                  </p>
                </div>
                {/* Title */}
                <Link href={post.url}>
                  <a className="my-1 text-lg font-semibold">
                    {post.title}
                  </a>
                </Link>
                {/* Body if applicable */}
                {post.body && (
                  <p className="my-1 text-sm">{post.body}</p>
                )}
                <div className="flex">
                  {/* Comments button */}
                  <Link href={post.url}>
                    <a>
                      <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                        <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                        <span className="font-semibold">
                          {/* TODO: count comments and display here */}
                          20 comments
                        </span>
                      </div>
                    </a>
                  </Link>
                  {/* Share button */}
                  <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                    <i className="mr-1 fas fa-share fa-xs"></i>
                    <span className="font-semibold">Share</span>
                  </div>
                  {/* Save button */}
                  <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                    <i className="mr-1 fas fa-bookmark fa-xs"></i>
                    <span className="font-semibold">Save</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sidebar */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context,
) => {
  try {
    const res = await Axios.get('/posts');

    return { props: { posts: res.data } };
  } catch (err) {
    {
      props: {
        error: 'Something went wrong';
      }
    }
  }
};
