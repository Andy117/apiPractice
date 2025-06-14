import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import PostForm from "./PostForm";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    getPosts()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startEditing = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1>Posts of the day</h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => startEditing(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
