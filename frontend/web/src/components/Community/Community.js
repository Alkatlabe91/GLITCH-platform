import { useEffect, useState } from "react";
import { community, createPostComment } from "../../services/domines";

function Community() {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    community()
      .then((response) => {
        setPosts(response);
      })
      .catch((err) => {});
  };

  const handleReactToPost = (post, reaction) => {
    createPostComment(post.user_post_id, reaction)
      .then(() => {
        getPosts();
      })
      .catch((err) => {});
  };

  const handleAddComment = (post) => {
    const comment = newComment[post.user_post_id];
    if (comment) {
      createPostComment(post.user_post_id, comment)
        .then(() => {
          setNewComment({ ...newComment, [post.user_post_id]: "" });
          getPosts();
        })
        .catch((err) => {});
    }
  };

  return (
    <div>
      {posts.map((_post, index) => {
        const post = _post.post;
        const comments = _post.comments;

        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p className="font-semibold mb-2">
              {post.first_name} {post.last_name}
            </p>
            <p>{post.content}</p>
            <div className="flex mt-2 space-x-4">
              {comments &&
                Object.entries(comments).map(([emoji, details], index) => (
                  <div
                    key={index}
                    className="relative flex items-center"
                    onMouseEnter={(e) => {
                      const tooltip = document.createElement("div");
                      tooltip.className =
                        "absolute bottom-full mb-2 p-2 bg-gray-700 text-white text-xs rounded shadow-lg";
                      tooltip.innerText = details.users.join(", ");
                      e.currentTarget.appendChild(tooltip);
                    }}
                    onMouseLeave={(e) => {
                      const tooltip = e.currentTarget.querySelector("div");
                      if (tooltip) e.currentTarget.removeChild(tooltip);
                    }}
                  >
                    <span className="mr-1">{emoji}</span>
                    <span>{details.count}</span>
                  </div>
                ))}
            </div>
            <div className="mt-2 bg-gray-100 p-3">
              <button
                className="mr-2 hover:bg-red-500"
                onClick={() => handleReactToPost(post, "👍")}
              >
                👍
              </button>
              <button onClick={() => handleReactToPost(post, "❤️")} className="mr-2">
                ❤️
              </button>
              <button onClick={() => handleReactToPost(post, "😜")} className="mr-2">
                😜
              </button>
              <button onClick={() => handleReactToPost(post, "🎉")} className="mr-2">
                🎉
              </button>
              <button onClick={() => handleReactToPost(post, "😍")} className="mr-2">
                😍
              </button>
            </div>
            <div className="mt-4">
            <input
                type="text"
                value={newComment[post.user_post_id] || ""}
                onChange={(e) =>
                  setNewComment({ ...newComment, [post.user_post_id]: e.target.value })
                }
                placeholder="Add a comment..."
                className="border p-2 rounded w-full"
              />
              <button
                onClick={() => handleAddComment(post)}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Add Comment
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Community;
