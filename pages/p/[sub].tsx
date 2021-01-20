import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, createRef, Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import PostCard from '../../components/PostCard';
import { Sub } from '../../types';
import Image from 'next/image';
import { useAuthState } from '../../context/auth';
import classNames from 'classnames';
import Axios from 'axios';
import SideBar from '../../components/SideBar';

export default function SubPage() {
  //local state
  const [ownSub, setOwnSub] = useState(false);
  //global state
  const { authenticated, user } = useAuthState();
  //utils

  const router = useRouter();
  const fileInputRef = createRef<HTMLInputElement>();
  const subName = router.query.sub;

  const { data: sub, error, revalidate } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  useEffect(() => {
    if (!sub) return;
    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownSub) return;
    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current.name);

    try {
      await Axios.post<Sub>(`/subs/${sub.name}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return (
      <Fragment>
        <div className="container flex pt-5 text-center bg-gray-200 rounded">
          <div className="w-160">
            <p className="text-lg">Sub not found...</p>
            <small className="font-light text-gray-600 clear-left text-md dark:text-gray-100">
              Why don't you create it?
            </small>
          </div>
        </div>
      </Fragment>
    );
  }

  let postsMarkup;

  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = (
      <p className="text-lg text-center text-gray-900 dark:text-gray-100">
        No posts submitted yet!
      </p>
    );
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} revalidate={revalidate} />
    ));
  }
  return (
    <div>
      <Head>
        <title>{sub?.title}</title>
      </Head>
      {sub && (
        <Fragment>
          <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
          {/* Sub info & Images */}
          <div>
            {/* Banner Image */}
            <div
              className={classNames('bg-button-blue', {
                'cursor-pointer': ownSub,
              })}
              onClick={() => openFileInput('banner')}
            >
              {sub.bannerUrl ? (
                <div
                  className="h-20 bg-button-blue"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              ) : (
                // if no banner, display default background
                <div className="h-20 bg-button-blue"></div>
              )}
            </div>
            {/* Sub metadata */}
            <div className="h-20 bg-white dark:bg-gray-800">
              <div className="container relative flex">
                <div className="absolute rounded-full" style={{ top: -15 }}>
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    className={classNames(
                      // TODO: #22 Make the white ring not cut off
                      'rounded-full',
                      {
                        'cursor-pointer': ownSub,
                      },
                    )}
                    width={70}
                    height={70}
                    onClick={() => openFileInput('image')}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {sub.title}
                    </h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">/p/{sub.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Posts & Sidebar */}
          <div className="container flex pt-5">
            <div className="w-full px-4 md:w-160 md:p-0">{postsMarkup}</div>
            <SideBar sub={sub} />
          </div>
        </Fragment>
      )}
    </div>
  );
}
