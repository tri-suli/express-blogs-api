import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

import Article from "../models/article";
import User from '../models/user';
import Comment from '../models/comment';
import ArticleType from "./schema/article";
import CommentType from "./schema/comment";
import UserType from "./schema/user";

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString, },
        email: { type: GraphQLString },
      },
      resolve (parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
        });

        return user.save();
      },
    },
    createComent: {
      type: CommentType,
      args: {
        article: { type: GraphQLID, },
        creator: { type: GraphQLID, },
        body: { type: GraphQLString }
      },
      async resolve (parent, args) {
        let response = null;

        try {
          const article = await Article.findById(args.article);
          const user = await User.findById(args.creator);

          if (!(article instanceof Article) && !(user instanceof User)) {
            // handle if user not found
            response = 'Can\'t find user and article with specified id\'s';
          }

          const comment = new Comment({
            article: args.article,
            creator: args.creator,
            body: args.body
          });
          response = await comment.save();
        } catch (error) {
          console.error(error);
        }

        return response;
      }
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID },
        creator: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      async resolve (parent, args) {
        let response = null;
        const { id, creator, body } = args;

        try {
          const user = await User.findById(creator);

          if (!(user instanceof User)) {
            // handle if user not found
            response = 'User\'s not found!';
          } else {
            await Comment.updateOne({ _id: id, creator }, { body });
          }

          response = await Comment.findById(id);
        } catch (error) {
          console.error(error)
        }

        return response;
      }
    },
    deleteComment: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLID },
        creator: { type: GraphQLString },
      },
      async resolve (parent, args) {
        let response = null;
        const { id, creator } = args;

        try {
          const user = await User.findById(creator);

          if (!(user instanceof User)) {
            // handle if user not found
            response = 'User\'s not found!';
          } else {
            await Comment.deleteOne({ _id: id, creator });
          }

          response = true;
        } catch (error) {
          console.error(error)
        }

        return response;
      }
    },
    createArticle: {
      type: ArticleType,
      args: {
        creator: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      async resolve (parent, args) {
        let response = null;

        try {
          const user = await User.findOne({ email: args.creator });

          if (!(user instanceof User)) {
            // handle if user not found
            response = 'User\'s not found!';
          }

          let article = new Article({
            creator: user._id,
            title: args.title,
            body: args.body,
          });

          response = await article.save();
        } catch (error) {
          console.error(error)
        }

        return response;
      }
    },
    updateArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID },
        creator: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      async resolve (parent, args) {
        let response = null;
        const { id, creator, title, body } = args;

        try {
          const user = await User.findById(creator);

          if (!(user instanceof User)) {
            // handle if user not found
            response = 'User\'s not found!';
          } else {
            await Article.updateOne({ _id: id, creator }, { title, body });
          }

          response = await Article.findById(id);
        } catch (error) {
          console.error(error)
        }

        return response;
      }
    },
    deleteArticle: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLID },
        creator: { type: GraphQLString },
      },
      async resolve (parent, args) {
        let response = null;
        const { id, creator } = args;

        try {
          const user = await User.findById(creator);

          if (!(user instanceof User)) {
            // handle if user not found
            response = 'User\'s not found!';
          } else {
            await Article.deleteOne({ _id: id, creator });
          }

          response = true;
        } catch (error) {
          console.error(error)
        }

        return response;
      }
    },
  }
});

export default Mutation;
