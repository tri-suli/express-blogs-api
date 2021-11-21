# Blog API

Description comming soon...

## Installation

- Clone this project
- Copy `.env.example` and rename it as `.env`
- run `npm install`
- start dev server by run `npm run start`

## API Endpoint (GraphQL)

- createArticle(input: ArticleInput): String
- updateArticle(input: ArticleInput): String
- removeArticle(input: CollectionID): String
- createComment(input: CommentInput): String
- updateComment(input: CommentInput): String
- removeComment(input: CollectionID): String
- showArticle(input: CollectionID): ArticleComments
