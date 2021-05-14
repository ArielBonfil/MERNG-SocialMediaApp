const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    created_at: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    created_at: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirm_password: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
