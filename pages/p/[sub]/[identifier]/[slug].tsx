import useSWR from 'swr';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SideBar from '../../../../components/SideBar';
import ActionButton from '../../../../components/ActionButton';

import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from '../../../../types';
import Axios from 'axios';
import { useAuthState } from '../../../../context/auth';

dayjs.extend(relativeTime);

export default function PostPage() {
  // Local State

  //Global State
  const { authenticated } = useAuthState();

  //Utils
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null,
  );

  if (error) router.push('/');

  const vote = async (value: number) => {
    // If not logged in, go to login
    if (!authenticated) router.push('/login');

    //If vote is the same, reset vote
    if (value === post.userVote) value = 0;

    try {
      Axios.post('/misc/vote', {
        identifier,
        slug,
        value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      {/* Header */}
      <Link href={`/p/${sub}`}>
        <a>
          <div className="flex items-center w-full h-20 p-8 bg-button-blue">
            <div className="container flex">
              {post && (
                <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                  <Image
                    src={post.sub.imageUrl}
                    height={(8 * 16) / 4}
                    width={(8 * 16) / 4}
                  />
                </div>
              )}
              <p className="text-xl font-semibold text-gray-200">
                p/{sub}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="container flex pt-5">
        {/* Post */}
        <div className="w-160">
          <div className="bg-white rounded">
            {post && (
              <div className="flex">
                {/* Vote Section */}
                {/* Plus Button */}
                <div className="w-10 py-3 text-center rounded-l">
                  <div
                    className="w-6 mx-auto text-gray-400 transition duration-75 rounded cursor-pointer hover:bg-gray-300 hover:text-button-blue"
                    onClick={() => vote(1)}
                  >
                    <i
                      className={classNames('far fa-plus-square', {
                        'text-button-blue': post.userVote === 1,
                      })}
                    ></i>
                  </div>
                  {/* Vote Count */}
                  <p className="text-xs font-bold">
                    {post.voteScore}
                  </p>
                  {/* Minus Button */}
                  <div
                    className="w-6 mx-auto text-gray-400 transition duration-75 rounded cursor-pointer hover:bg-gray-300 hover:text-red-300"
                    onClick={() => vote(-1)}
                  >
                    // TODO: Why doesn't the user vote get set?
                    <i
                      className={classNames('far fa-minus-square', {
                        'text-red-300': post.userVote === -1,
                      })}
                    ></i>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500">
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
                  {/* Post title */}
                  <h1 className="my-1 text-xl font-medium">
                    {post.title}
                  </h1>
                  {/* Post Body */}
                  <p className="my-3 text-sm">{post.body}</p>
                  {/* Actions */}
                  <div className="flex">
                    {/* Comments button */}
                    <Link href={post.url}>
                      <a>
                        <ActionButton>
                          <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                          <span className="font-semibold">
                            {post.commentCount} comments
                          </span>
                        </ActionButton>
                      </a>
                    </Link>
                    {/* Share button */}
                    <ActionButton>
                      <i className="mr-1 fas fa-share fa-xs"></i>
                      <span className="font-semibold">Share</span>
                    </ActionButton>
                    {/* Save button */}
                    <ActionButton>
                      <i className="mr-1 fas fa-bookmark fa-xs"></i>
                      <span className="font-semibold">Save</span>
                    </ActionButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Sidebar */}
        {post && <SideBar sub={post.sub} />}
      </div>
    </>
  );
}
