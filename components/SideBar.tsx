import dayjs from 'dayjs';

import Link from 'next/link';
import { Sub } from '../types';
import { useAuthState } from '../context/auth';

export default function SideBar({ sub }: { sub: Sub }) {
  const { authenticated } = useAuthState();
  return (
    <div className="hidden ml-6 md:block w-80">
      <div className="bg-white rounded shadow-md">
        <div className="p-3 rounded-t bg-button-blue">
          <p className="font-semibold text-white">About Board</p>
        </div>
        <div className="p-3">
          <p className="mb-3 text-md">{sub.description}</p>
          <div className="flex mb-3 text-sm font-medium">
            <div className="w-1/2">
              {/* TODO: #20 Make the below line show the number of subbed users */}
              <p>5.4k</p>
              <p>users</p>
            </div>
            <div className="w-1/2">
              {/* TODO: #19 Make the below line show the number of online users */}
              <p>200</p>
              <p>online</p>
            </div>
          </div>
          <p className="my-3">
            <i className="mr-2 fas fa-sticky-note text-button-blue"></i>
            Created {dayjs(sub.createdAt).format('D MMM YYYY')}
          </p>
          {authenticated && (
            <Link href={`/p/${sub.name}/submit`}>
              <a className="w-full py-1 text-sm font-medium btn-postitt">Create Post</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
