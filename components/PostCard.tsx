import dayjs from 'dayjs';
import Link from 'next/link';
import Axios from 'axios';

import { Post } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';
import { useAuthState } from '../context/auth';
import { useRouter } from 'next/router';
import ActionButton from './ActionButton';

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
  },
  revalidate,
}: PostCardProps) {
  const router = useRouter();
  const { authenticated } = useAuthState();

  const vote = async (value: number) => {
    if (!authenticated) router.push('/login');
    if (value === userVote) value = 0;
    try {
      Axios.post('/misc/vote', {
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
    <div key={identifier} className="flex mb-4 bg-white rounded shadow-inner">
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
          <Link href={`/p/${subName}`}>
            <img
              // TODO: #59 make the post card display the sub image
              src={'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
              className="w-6 h-6 mr-1 rounded-full cursor-pointer"
            />
          </Link>
          {/* Sub Name */}
          <Link href={`/p/${subName}`}>
            <a className="text-xs font-semibold cursor-pointer hover:underline">p/{subName}</a>
          </Link>
          <p className="text-xs text-gray-500">
            <span className="mx-1">•</span>
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
                <span className="font-semibold">{commentCount} comments</span>
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
