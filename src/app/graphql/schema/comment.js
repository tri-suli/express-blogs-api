import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

import ArticleType from './article';
import Article from '../../models/article';
import UserType from './user';
import User from '../../models/user';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    _id: { type: GraphQLID },
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
    article: {
      type: ArticleType,
      async resolve (parent, args) {
        let article = null;

        try {
          article = await Article.findById(parent.article);
        } catch (error) {
          console.error(error);
        }

        return article;
      }
    },
    body: { type: GraphQLString },
  })
});

export default CommentType;
