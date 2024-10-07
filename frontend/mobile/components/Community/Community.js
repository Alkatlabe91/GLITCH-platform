import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {posts.map((_post, index) => {
        const post = _post.post;
        const comments = _post.comments;

        return (
          <View key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <Text className="font-semibold mb-2">
              {post.first_name} {post.last_name}
            </Text>
            <Text className="mb-4">{post.content}</Text>
            <View className="flex flex-row flex-wrap mt-2 space-x-4">
              {comments &&
                Object.entries(comments).map(([emoji, details], idx) => (
                  <View key={idx} className="relative flex items-center">
                    <Text className="mr-1">{emoji}</Text>
                    <Text>{details.count}</Text>
                  </View>
                ))}
            </View>
            <View className="flex flex-row flex-wrap mt-2 bg-gray-100 p-3 rounded-lg">
              <TouchableOpacity
                className="mr-2"
                onPress={() => handleReactToPost(post, "👍")}
              >
                <Text>👍</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mr-2"
                onPress={() => handleReactToPost(post, "❤️")}
              >
                <Text>❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mr-2"
                onPress={() => handleReactToPost(post, "😜")}
              >
                <Text>😜</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mr-2"
                onPress={() => handleReactToPost(post, "🎉")}
              >
                <Text>🎉</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mr-2"
                onPress={() => handleReactToPost(post, "😍")}
              >
                <Text>😍</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-4">
              <TextInput
                value={newComment[post.user_post_id] || ""}
                onChangeText={(text) =>
                  setNewComment({ ...newComment, [post.user_post_id]: text })
                }
                placeholder="Add a comment..."
                className="border p-2 rounded w-full mb-2"
              />
              <TouchableOpacity
                onPress={() => handleAddComment(post)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                <Text className="text-white text-center">Add Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}


export default Community;
