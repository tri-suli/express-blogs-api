import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import Mutation from './mutation';
import Article from '../models/article';
import User from '../models/user';
import ArticleType from './schema/article';
import UserType from './schema/user';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    creator: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve (parent, args) {
        // 
      }
    },
    creators: {
      type: new GraphQLList(UserType),
      args: {
        paginate: { type: GraphQLInt },
        page: { type: GraphQLInt },
        name: { type: GraphQLString },
      },
      async resolve (parent, args) {
        let users = null;
        const { paginate, page } = args;

        try {
          users = await User
            .find({})
            .limit(parseInt(paginate))
            .skip(parseInt(page) - 1);
        } catch (error) {
          console.error(error);
        }

        return users;
      }
    },
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID } 
      },
      async resolve (parent, args) {

      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      args: {
        paginate: { type: GraphQLInt },
        page: { type: GraphQLInt },
        title: { type: GraphQLString }
      },
      async resolve (parent, args) {
        let articles = null;
        const { paginate, page } = args;

        try {
          articles = await Article
            .find({})
            .limit(parseInt(paginate))
            .skip(parseInt(page) - 1);
        } catch (error) {
          console.error(error);
        }

        return articles;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
