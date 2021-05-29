const { UserInputError } = require("apollo-server");
const checkAuth = require("../../util/check-auth");
const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          error: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.FindById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          created_at: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
