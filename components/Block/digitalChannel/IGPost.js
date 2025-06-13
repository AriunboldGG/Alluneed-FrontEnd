import React from 'react';

const IGPost = ({ post }) => {
  return (
    <div className="post">
      <img src={post.imageUrl} alt="Instagram Post" className="post-image" />
      <div className="post-info">
        <p className="post-date">Posted on: {post.postedDate}</p>
        <p className="post-likes">Likes: {post.likes}</p>
      </div>
    </div>
  );
};

export default IGPost;
