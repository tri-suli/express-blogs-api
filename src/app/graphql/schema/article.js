import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import Comment from '../../models/comment';
import User from '../../models/user';
import CommentType from './comment';
import UserType from './user';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    creator: {
      type: UserType,
      async resolve (parent, args) {
        let user = null;
        const { creator } = parent;

        try {
          user = await User.findById(creator);
        } catch (error) {
          console.error(error);
        }

        return user;
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve (parent, args) {
        let comments = null;
        const { _id } = parent;

        try {
          comments = await Comment.find({ article: _id });
        } catch (error) {
          console.error(error);
        }

        return comments;
      }
    }
  })
});

export default ArticleType;
