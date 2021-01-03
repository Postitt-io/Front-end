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
import { Post, Comment } from '../../../../types';
import Axios from 'axios';
import { useAuthState } from '../../../../context/auth';
import { FormEvent, useState } from 'react';

dayjs.extend(relativeTime);

export default function PostPage() {
  // Local State
  const [newComment, setnewComment] = useState('');
  //Global State
  const { authenticated, user } = useAuthState();

  //Utils
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null,
  );

  const { data: comments, revalidate } = useSWR<Comment[]>(
    identifier && slug
      ? `/posts/${identifier}/${slug}/comments`
      : null,
  );

  if (error) router.push('/');

  const vote = async (value: number, comment?: Comment) => {
    // If not logged in, go to login
    if (!authenticated) router.push('/login');

    //If vote is the same, reset vote
    if (
      (!comment && value === post.userVote) ||
      (comment && comment.userVote === value)
    )
      value = 0;

    try {
      await Axios.post('/misc/vote', {
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const sumbitComment = async (event: FormEvent) => {
    event.preventDefault();
    if (newComment.trim() === '') return;

    try {
      await Axios.post(
        `/posts/${post.identifier}/${post.slug}/comments`,
        {
          body: newComment,
        },
      );
      revalidate();
      setnewComment('');
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
              <>
                <div className="flex">
                  {/* Vote Section */}
                  {/* Plus Button */}
                  <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
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
                      {/* // TODO: Why doesn't the user vote get set? */}
                      <i
                        className={classNames('far fa-minus-square', {
                          'text-red-300': post.userVote === -1,
                        })}
                      ></i>
                    </div>
                  </div>
                  <div className="py-2 pr-2">
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
                {/* Comment input box */}
                <div className="pl-10 pr-6 mb-4">
                  {authenticated ? (
                    <div>
                      <p className="mb-1 text-xs">
                        Commenting as{' '}
                        <Link href={`/u/${user.username}`}>
                          <a
                            href=""
                            className="font-semibold text-button-blue hover:underline"
                          >
                            {user.username}
                          </a>
                        </Link>
                      </p>
                      <form onSubmit={sumbitComment}>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                          onChange={(e) =>
                            setnewComment(e.target.value)
                          }
                          value={newComment}
                        ></textarea>
                        <div className="flex justify-end">
                          <button
                            className="px-3 py-1 text-sm btn-postitt"
                            disabled={newComment.trim() === ''}
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-2 py-4 border border-gray-200 rounded">
                      <p className="font-semibold text-gray-400">
                        Log in or Sign up to leave a comment
                      </p>
                      <div>
                        <Link href="/login">
                          <a className="px-4 py-1 mr-4 text-xs btn-postitt-hollow">
                            Login
                          </a>
                        </Link>
                        <Link href="/register">
                          <a className="px-4 py-1 text-xs btn-postitt">
                            Register
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <hr />
                {/* Comments Section */}
                {comments?.map((comment) => (
                  <div className="flex" key={comment.identifier}>
                    {/* Vote Section */}
                    {/* Plus Button */}
                    <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                      <div
                        className="w-6 mx-auto text-gray-400 transition duration-75 rounded cursor-pointer hover:bg-gray-300 hover:text-button-blue"
                        onClick={() => vote(1, comment)}
                      >
                        <i
                          className={classNames(
                            'far fa-plus-square',
                            {
                              'text-button-blue':
                                comment.userVote === 1,
                            },
                          )}
                        ></i>
                      </div>
                      {/* Vote Count */}
                      <p className="text-xs font-bold">
                        {comment.voteScore}
                      </p>
                      {/* Minus Button */}
                      <div
                        className="w-6 mx-auto text-gray-400 transition duration-75 rounded cursor-pointer hover:bg-gray-300 hover:text-red-300"
                        onClick={() => vote(-1, comment)}
                      >
                        <i
                          className={classNames(
                            'far fa-minus-square',
                            {
                              'text-red-300': comment.userVote === -1,
                            },
                          )}
                        ></i>
                      </div>
                    </div>
                    <div className="py-2 pr-2">
                      <p className="mb-1 text-xs leading-none">
                        <Link href={`/u/${comment.username}`}>
                          <a className="mr-1 font-bold hover:underline">
                            {comment.username}
                          </a>
                        </Link>
                        <span className="text-gray-600">
                          {`
                            ${comment.voteScore}
                            points •
                            ${dayjs(comment.createdAt).fromNow()}
                            `}
                        </span>
                      </p>
                      <p>{comment.body}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* Sidebar */}
        {post && <SideBar sub={post.sub} />}
      </div>
    </>
  );
}
