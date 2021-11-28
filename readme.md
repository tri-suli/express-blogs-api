# Blog API

Simple API for creating blogs, adding comments to blogs. All endpoints in this API are created using [graphql](https://graphql.org/)

# Documentation

- [GraphQL](https://graphql.org/learn)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [MongooseJS](https://mongoosejs.com/docs/guide.html)

## Installation

- Clone this project
- Copy `.env.example` as `.env`
- Setup `env` values
- run `npm install`
- start dev server by run `npm run start` -> visit **http://localhost:{port}/graphql**

## API Endpoint (GraphQL)

- Create User
  - name -> `user's name`
    - **required**
  - email -> `user's email`
    - **required**

```
mutation {
  register (name: String, email: String): UserType {
    _id
    name
    email
  }
}
```

- Create Article
  - creator -> `user id`
    - **required**
  - title -> `Article's title`
    - **required**
  - body -> `Article's content`
    - **required**

```
mutation {
  createArticle (creator: String, title: String, body: String): ArticleType {
    _id,
    title,
    body,
    creator {
      name,
      email
    }
  }
}
```

- Update Article
  - id -> `The ID of article`
    - **required**
  - creator -> `The ID of user that have created related article`
    - **required**
  - title -> `Article's title`
  - body -> `Article's content`

```
mutation {
  updateArticle (id: String, creator: String, title: String, body: String): ArticleType {
    _id,
    title,
    body,
 	}
}
```

- Delete Article
  - id -> `The ID of article`
    - **required**
  - creator -> `The ID of user that have created related article`
    - **required**

```
mutation {
  deleteArticle ( id: String, creator: String): Boolean
}
```

- Create Comment
  - article -> `The ID of article`
    - **required**
  - creator -> `The ID of user`
    - **required**
  - body -> `comment content`
    - **required**

```
mutation {
  createComent (article: String, creator: String, body: String): CommentType {
  	_id,
    body,
    creator {
      name,
      email
    }
    article {
      _id,
      title
    }
  } 
}
```

- Update Comment
  - id -> `The ID of comment`
    - **required**
  - creator -> `The ID of user that have created related comment`
    - **required**
  - body -> `Comment content`

```
mutation {
  updateComment (id: String, creator: String, body: String): CommentType {
    _id,
    body,
 	}
}
```

- Delete Comment
  - id -> `The ID of article`
    - **required**
  - creator -> `The ID of user that have created related comment`
    - **required**

```
mutation {
  deleteComment (id: String, creator: String): Boolean
}
```

- Get list of articles
  - paginate: `Total data per page`
    - **required**
  - page -> `Current page`
    - **required**

```
{
  articles (paginate: Int!, page: Int!): [ArticleType] {
    _id,
    title,
    body,
    creator {
      name,
      email
    }
    comments {
      _id,
      body
    }
  }
}
```

- Get List of users
  - paginate: `Total data per page`
    - **required**
  - page -> `Current page`
    - **required**

```
{
  creators (paginate: Int!, page: Int!): [UserType] {
    _id,
    name,
    email
    articles {
      title,
      body
    },
    comments {
      body
    }
	}
}
```
