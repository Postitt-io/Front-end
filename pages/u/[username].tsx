import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import useSWR from 'swr';
import PostCard from '../../components/PostCard';
import { Comment, Post } from '../../types';

export default function user() {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR<any>(
    username ? `/users/${username}` : null,
  );
  if (error) router.push('/');
  return (
    <Fragment>
      <Head>
        <title>{data?.user.username}</title>
      </Head>
      {data && (
        <div className="container flex pt-5">
          <div className="w-160">
            {data.submissions.map((submission: any) => {
              if (submission.type === 'Post') {
                const post: Post = submission;
                return <PostCard key={post.identifier} post={post} />;
              } else {
                const comment: Comment = submission;
                return (
                  <div
                    key={comment.identifier}
                    className="flex my-4 bg-white rounded"
                  >
                    <div className="flex-shrink-0 w-10 py-4 text-center bg-gray-200 rounded-l">
                      <i className="text-gray-400 fas fa-comment-alt fa-md"></i>
                    </div>
                    <div className="w-full p-2">
                      <p className="mb-2 text-xs text-gray-500">
                        Commented by u/{comment.username} on{' '}
                        <Link href={comment.post.subName}>
                          <a className="cursor-pointer text-button-blue hover:underline">
                            p/{comment.post.subName}
                          </a>
                        </Link>
                        :{' '}
                        <Link href={comment.post.url}>
                          <a className="font-semibold cursor-pointer hover:underline">
                            {comment.post.title}
                          </a>
                        </Link>
                      </p>
                      <hr />
                      <p>{comment.body}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="ml-6 shadow-md w-80">
            <div className="bg-white rounded">
              <div className="p-1 rounded-t bg-button-blue">
                {/* TODO: #52 make the user profile show the user uploaded image */}
                {/* TODO: #52 convert the img tag to Next Image */}
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  className="w-16 h-16 mx-auto my-1 border-2 border-white rounded-full cursor-pointer"
                  alt="user profile image"
                />
              </div>
              <div className="p-3 text-center">
                <h1 className="mb-3 text-xl ">{username}</h1>
                <hr />
                <p className="mt-3">
                  Joined{' '}
                  {dayjs(data.user.createdAt).format('MMM YYYY')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
