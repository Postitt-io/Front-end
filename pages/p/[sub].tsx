import { useRouter } from 'next/router';
import { Fragment } from 'react';
import useSWR from 'swr';
import PostCard from '../../components/PostCard';

export default function Sub() {
  const router = useRouter();
  const subName = router.query.sub;

  const { data: sub, error } = useSWR(
    subName ? `/subs/${subName}` : null,
  );
  let postsMarkup;

  if (error) {
    router.push('/');
    // TODO: Make the below lines work instead of pushing to homepage
    // postsMarkup = (
    //   <Fragment>
    //     <p className="text-lg text-center">Sub not found...</p>
    //     <small className="text-lg font-light text-gray-600 clear-left dark:text-gray-100">
    //       Why don't you create it?
    //     </small>
    //   </Fragment>
    // );
  }

  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = (
      <p className="text-lg text-center">No posts submitted yet!</p>
    );
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <div className="container flex pt-5">
      {sub && <div className="w-160">{postsMarkup}</div>}
    </div>
  );
}
