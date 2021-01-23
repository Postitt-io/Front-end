import { Fragment } from 'react';

export default function SkeletonPost() {
  return (
    <Fragment>
      <div className="flex mb-4 bg-white rounded shadow-inner">
        {/* Vote Section */}
        {/* Plus Button */}
        <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
          <div className="animate-pulse">
            <div className="w-6 mx-auto ">
              <i className={'far fa-plus-square text-gray-500'}></i>
            </div>
            <div className="text-xs text-gray-500"> ? </div>
            {/* Minus Button */}
            <div className="w-6 mx-auto ">
              <i className={'far fa-minus-square text-gray-500'}></i>
            </div>
          </div>
        </div>
        {/* Post data section */}
        <div className="animate-pulse">
          <div className="w-full p-2">
            <div className="flex items-center">
              <div className="w-6 h-6 mb-3 mr-1 bg-gray-300 rounded-full cursor-pointer" />
              <span className="mx-1 mb-3 mr-2 text-xs text-gray-300 ">•</span>
              <div className="h-4 mb-3 bg-gray-300 rounded-md cursor-pointer w-36" />
            </div>
            {/* Title */}
            <div className="h-6 mb-3 bg-gray-300 rounded-md w-72" />
            {/* Body */}
            <div className="w-56 h-4 mb-1 bg-gray-300 rounded-md" />
            <div className="h-4 mb-1 bg-gray-300 rounded-md w-96" />
            <div className="w-40 h-4 mb-3 bg-gray-300 rounded-md" />

            <div className="flex">
              {/* Comments button */}
              <div className="w-24 h-6 px-2 mr-1 bg-gray-300 rounded-md cursor-pointer">
                <i className="mr-1 text-gray-400 fas fa-comment-alt fa-xs"></i>
              </div>

              {/* Share button */}
              <div className="w-24 h-6 px-2 mr-1 bg-gray-300 rounded-md cursor-pointer ">
                <i className="mr-1 text-gray-400 fas fa-share fa-xs"></i>
              </div>

              {/* Save button */}

              <div className="w-24 h-6 px-2 mr-1 bg-gray-300 rounded-md cursor-pointer">
                <i className="mr-1 text-gray-400 fas fa-bookmark fa-xs"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
