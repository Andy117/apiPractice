import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Posts of the day</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
