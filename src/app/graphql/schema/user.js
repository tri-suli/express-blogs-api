import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import Article from '../../models/article';
import Comment from '../../models/comment';
import ArticleType from './article';
import CommentType from './comment';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    articles: {
      type: new GraphQLList(ArticleType),
      async resolve (parent, args) {
        let article = null;

        try {
          article = await Article.find({
            creator: parent._id,
          });
        } catch (error) {
          console.lerror(error);
        }

        return article;
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve (parent, args) {
        let comments = null;

        try {
          comments = await Comment.find({
            creator: parent._id,
          });
        } catch (error) {
          console.lerror(error);
        }

        return comments;
      }
    }
  })
});

export default UserType;
