# Master-Piece-backend
"Borrow something", a website for borrowing things where the user can publish his items and reserve items to borrow,
and this website should be based on his location as he can only borrow if he is a neighbor to the poster and much more..

➤ Deployment: https://Deployment.com //Later on  <br/>
➤ Local: http://localhost:3000 <br/>
➤ Slides: https://Slides  //Later on <br/>
➤ frontend: https://github.com/MP-Project-SulaimanAlbulaihy/client

## Trello: 
[https://trello.com/b/1qm6ACeN/master-piece-project](https://trello.com/b/1qm6ACeN/master-piece-project)


## User Story
 ##### As a "User" of "Borrow Something Website":
 I want to borrow an item for a limited time for free,
 or lend/give something to other people for charity for a limited time, 
 to help others and gain good deeds especially with people of my area.
 So user can borrow items and save money where he doesn't need to buy item only for one use.

 Ensure that the user able to:
 - log in to "borrow something" or register if not a member and logout
 - navigate to other pages and different categories
 - able to select items and order a request to borrow something
 - able to post as many items he want with his contact details
 - see my profile and can edit profile
 - see hisory of items borrowed and pending items for borrowing and already in use.
 - see requestus if any of people want to borrow
##### As "admin" of "Borrow Something Website": 
I can see users and posts and messages of people, and block users if needed
or delete posts

 Ensure that the 'admin' able to:
 - log in to his account and logout
 - navigate to other pages and different categories
 - able to edit/delete all posts or users

## Used Library
- express
- cors
- morgan
- dotenv
- mongoose
- bcrypt
- jsonwebtoken

## Models
- User model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| username       | String          | required | N/A     |
| password   | String          | required         | N/A    |
| roles      | String  |    N/A   | 'user'    |
| isDel   | Boolean         |    N/A   | false         |
| avatar   | String          |    N/A     | N/A  |
| borrowed      | Schema <Borrowed>          |     N/A    | N/A      |
| favourite     | Schema <Favourite> |    N/A      | N/A      |
| post     | Schema <Post> |   N/A      | N/A      |
| timestamp    | true           |     N/A    | N/A   |

- Post model
 
| key         | type              | options  | default value |
| ----------- | ----------------- | -------- | ------------- |
| title       | String            | required | N/A      |
| duration       | Number            | N/A | N/A     |
| desc | String            | required | N/A       |
| timestamp | true            | N/A | N/A       |
| user     | Schema <User>     | required | N/A          |
| category    | String            | required | N/A          |
| rating    | Number            | N/A | N/A         |
| comment    | Schema <Comment>  |   N/A    | N/A     |
| like     | Schema <Like>   |    N/A   | N/A          |
| img   | String|     N/A     | N/A           |
| isDeleted    | Boolean           |    N/A      | false         |

- comments model
 
| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| user     | Schema <user>   | required | N/A           |
| comment | String          | required | N/A           |
| post   | Schema <Post> | required | N/A           |
| timestamp    | true         |    N/A      | N/A         |

- favourite model
 
| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| user     | Schema <User>   | required | N/A          |
| post | Schema <Post>          | required | N/A           |
| timestamp      | true          | N/A | N/A           |

- Like model
 
| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| user     | Schema <User>   | required | N/A          |
| post   | Schema <Post> | required | N/A           |
| timestamp    | true         |     N/A     | N/A         |

- Chat model
 
| key      | type             | options  | default value |
| -------- | ---------------- | -------- | ------------- |
| user    | Schema <User>    | required | N/A           |
| messages | array of objects | required | N/A           |
 
 
 ## ER Diagram
![masterpice backend UML](https://i.ibb.co/hc3nHDh/uml12-drawio-1.png)

 
 ## Routes

| HTTP Method | URL                | Request Body                               | Success status  | Error status  | Description       |
| ----------- | ------------------ | ----------------------------------------- | --------------- | ------------- | ------------------ |
| POST        | `/signUp`          | {email, mobile, password, location} | 200  | 404  | Register a new user   |
| POST        | `/login`           | {username, mobile, password}| 201             | 404           | Log in a user|
| POST        | `/logout`          | {empty}  | 204             | 400           | Logout the user               |
| GET         | `/getUsers`     |   {empty}    | 200             | 400           | Get all users                 |
 | DELETE         | `/user`     |    {empty}        | 200             | 400           | Delete user                 |
  | POST         | `/singup_admin`    |  {empty}| 200             | 400           | Sing up for new admin user                 |
| POST        | `/post`         | {title, img, desc, duration} | 201             | 400           | Add new post|
| PUT         | `/post`         | {title, img, desc, duration}| 200             | 400           | Update post                   |
| DELETE      | `/post`         | {empty}   | 200             | 400           |  Delete post               |
| GET         | `/posts`     |{empty} | 200             | 400           | Get all posts         |
| GET         | `/post/:id`      |  {id}  | 200             | 400           | Get one post by id    |
 | GET        | `/comments`  |{empty}| 201             | 400           | Get all comments for certain post   |
| POST        | `/comment`  | {comment}                       | 201             | 400           | Add new comment   |
| PUT         | `/comment`  | {id}       | 200             | 400           | Update comment   | 
| DELETE      | `/comment`  | {id}         | 200             | 400           | Delete comment   | 
| POST        | `/addFavourite/:id`| {user}                | 201             | 404           | Add post to favourite   | 
| DELETE         | `/removeFavourite/:id`      |   {user}  | 200             | 400           |  Delete post from favourite   | 
| POST         | `/newNotification`    |  {post, user} | 200             | 400           |  Create new notification   | 
 | DELETE      | `/deleteOneNotification`      |   {id}    | 200             | 400           |  Delete one notification   | 
| DELETE         | `/clearNotification`   |   {user} | 200       | 400           |    Delete all notification   | 
| POST         | `/requestBorrow`    |  {post, user} | 200             | 400           |  Request to borrow an item   | 
| POST         | `/acceptBorrow`    |  {post, user} | 200             | 400           |  Accept to lend an item   | 

 ## UML Diagram
![masterpice backend UML](https://i.ibb.co/f1ZG46k/Untitled-Diagram-Page-2-drawio.png)
