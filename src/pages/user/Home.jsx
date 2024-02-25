import React from 'react';

const Post = () => {
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center p-4 border-b border-gray-300">
        <img
          src="https://source.unsplash.com/random/50x50"
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold">Username</span>
      </div>
      {/* Post Image */}
      <img
        src="https://source.unsplash.com/random/800x600"
        alt="Post"
        className="object-cover w-full h-64"
      />
      {/* Post Actions */}
      <div className="p-2 flex justify-between items-center">
        <div className="flex">
          <button className="text-gray-700 hover:text-black mr-4">
            Like
          </button>
          <button className="text-gray-700 hover:text-black">Comment</button>
        </div>
        <button className="text-gray-700 hover:text-black">Bookmark</button>
      </div>
    </div>
  );
};

export default Post;
