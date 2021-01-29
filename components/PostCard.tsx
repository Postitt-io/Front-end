import Link from 'next/link';
import Axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';

import { Post } from '../types';
import ActionButton from './ActionButton';
import { useAuthState } from '../context/auth';
import { useRouter } from 'next/router';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
  revalidate?: Function;
}

export default function PostCard({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  revalidate,
}: PostCardProps) {
  const { authenticated } = useAuthState();
  const router = useRouter();
  const isInSubPage = router.pathname === '/p/[sub]';

  const vote = async (value: number) => {
    if (!authenticated) router.push('/login');

    if (value === userVote) value = 0;

    try {
      await Axios.post('/misc/vote', {
        identifier,
        slug,
        value,
      });

      if (revalidate) revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={identifier} className="flex mb-4 bg-white rounded shadow-inner" id={identifier}>
      {/* Vote Section */}
      {/* Plus Button */}
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
        <div
          className="w-6 mx-auto text-gray-400 transition duration-75 rounded cursor-pointer hover:bg-gray-300 hover:text-button-blue"
          onClick={() => vote(1)}
        >
          <i
            className={classNames('far fa-plus-square', {
              'text-button-blue': userVote === 1,
            })}
          ></i>
        </div>
        {/* Vote Count */}
        <p className="text-xs font-bold">{voteScore}</p>
        {/* Minus Button */}
        <div
          className="w-6 mx-auto text-gray-400 transition duration-75 rounded cursor-pointer hover:bg-gray-300 hover:text-red-300"
          onClick={() => vote(-1)}
        >
          <i
            className={classNames('far fa-minus-square', {
              'text-red-300': userVote === -1,
            })}
          ></i>
        </div>
      </div>
      {/* Post data section */}
      <div className="w-full p-2">
        <div className="flex items-center">
          {/* Sub  Icon */}
          {!isInSubPage && (
            <>
              <Link href={`/p/${subName}`}>
                <img src={sub.imageUrl} className="w-6 h-6 mr-1 rounded-full cursor-pointer" />
              </Link>
              {/* Sub Name */}
              <Link href={`/p/${subName}`}>
                <a className="text-xs font-semibold cursor-pointer hover:underline">p/{subName}</a>
              </Link>
              <span className="mx-1 text-xs text-gray-500">•</span>
            </>
          )}
          <p className="text-xs text-gray-500">
            Posted by
            {/* Username */}
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">u/{username}</a>
            </Link>
            {/* Timestamp */}
            <Link href={url}>
              <a className="mx-1 hover:underline">{dayjs(createdAt).fromNow()}</a>
            </Link>
          </p>
        </div>
        {/* Title */}
        <Link href={url}>
          <a className="my-1 text-lg font-semibold">{title}</a>
        </Link>
        {/* Body if applicable */}
        {body && <p className="my-1 text-sm">{body}</p>}
        <div className="flex">
          {/* Comments button */}
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                <span className="font-semibold">
                  {commentCount}
                  {commentCount === 1 ? ' comment' : ' comments'}
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
  );
}
