import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { posts } from "../store/actions/actions";

const Posts = () => {
  const loadPosts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(posts())}>Load posts</button>
      <div>
        {loadPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
