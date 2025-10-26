# FoodExpress API

Project overview
----------------
FoodExpress is a startup focused on providing a seamless online food ordering experience.

This repository contains the RESTful API built with Node.js and Express.js. The API handles user management, restaurant registration, and menu modifications. Only the API is implemented (no frontend).

Main endpoints
--------------
- /users
- /restaurants
- /menus

<<<<<<< HEAD
=======
Required features implemented
-----------------------------
Users endpoint (/users)
- CRUD operations (Create, Read, Update, Delete)
- User fields: { id, email, username, password, role }
- User roles: "user" or "admin"
- Users can create accounts without authentication.
- Regular users can only update/delete their own account.
- Admin users have full control over user accounts.
- Regular users cannot view other users' details.
- JWT authentication is used for protected operations (stateless).

Restaurants endpoint (/restaurants)
- CRUD operations for restaurants
- Restaurant fields: { id, name, address, phone, opening_hours }
- Admin-only creation, updating, deletion
- Public read access with optional sorting by name/address
- Pagination with default limit 10 (adjustable via query params)

Menus endpoint (/menus)
- CRUD operations for menus
- Menu fields: { id, restaurant_id, name, description, price, category }
- Admin-only creation, updating, deletion
- Public read access with sorting options (price, category)
- Pagination with default limit 10 (adjustable via query params)

>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44
Prerequisites
-------------
- Node.js (compatible version)
- npm
- MongoDB (local or remote MongoDB URI)

Installation
------------
<<<<<<< HEAD

1. Install dependencies:
=======
1. Clone the repository:
   ```bash
   git clone https://github.com/<owner>/<repo>.git
   cd <repo>
   ```

2. Install dependencies:
>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44
   ```bash
   npm install
   ```

<<<<<<< HEAD
=======
Configuration
-------------
Create a `.env` file in the project root (or set environment variables) with at least the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/foodexpress
JWT_SECRET=your_jwt_secret_here
```

- PORT : port d'écoute (ex: 3000)
- MONGODB_URI : URI MongoDB
- JWT_SECRET : secret pour signer les JWT
>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44

Start the server
----------------
- Development:
  ```bash
<<<<<<< HEAD
  npm run start
  ```
=======
  npm start
  ```
  (ou `node src/index.js` selon l'organisation du projet)
>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44

API usage
---------
Authentication
<<<<<<< HEAD
- Express session authentication

├─ src/
│  ├─ server.js
│  │    - Connexion à MongoDB : mongodb://localhost:27017/trainstation
│  │    - Préfixes principaux :
│  │        ├─ /Users/
│  │        ├─ /Restaurant/
│  │        ├─ /Menu/
│  │        └─ /authentification/
│  │
│  ├─ index.js
│  │    - Point d'entrée principal 
│  │
│  ├─ middlewares/
│  │  ├─ auth.js
│  │  │    - IsAdminOrUser : vérifie le rôle "user" ou "admin"
│  │  │    - IsAdmin : vérifie le rôle "admin"
│  │  │    - GetCurrentUser : récupère l'utilisateur connecté
│  │  │
│  │  └─ validate.js
│  │       - iValidID : vérifie si l'ID dans les params est valide
│  │       - IsUserValid : vérifie si l'utilisateur existe dans la base
│  │
│  ├─ models/
│  │  ├─ User.js
│  │  │    - UserSchema
│  │  ├─ Restaurant.js
│  │  │    - RestaurantSchema
│  │  └─ Menu.js
│  │       - MenuSchema
│  │
│  ├─ routes/
│  │  ├─ AuthentificationRouter.js       (prefix : /authentification/)
│  │  │    - /register   (POST)           → inscription utilisateur
│  │  │    - /login      (GET)            → connexion
│  │  │    - /logout     (GET)            → déconnexion
│  │  │    - /           (GET)            → récupère les données de l'utilisateur connecté
│  │  │
│  │  ├─ UserRouter.js                  (prefix : /users/)
│  │  │    - /           (GET)           → récupérer tous les utilisateurs (admin)
│  │  │    - /:id        (GET)           → récupérer un utilisateur par ID (admin ou utilisateur lui-même)
│  │  │    - /:id        (PUT)           → mettre à jour un utilisateur (admin ou utilisateur lui-même)
│  │  │    - /:id        (DELETE)        → supprimer un utilisateur (admin ou utilisateur lui-même)
│  │  │
│  │  ├─ my-account-router.js           (prefix : /my-account/)
│  │  │    - /           (GET)           → récupérer les infos de son propre compte (utilisateur connecté)
│  │  │    - /           (PUT)           → mettre à jour son propre compte (email, username, password)
│  │  │    - /           (DELETE)        → supprimer son propre compte et détruire la session
│  │  │
│  │  ├─ RestaurantRouter.js            (prefix : /restaurants/)
│  │  │    - /           (GET)           → récupérer tous les restaurants (public)
│  │  │    - /:id        (GET)           → récupérer un restaurant par ID (public)
│  │  │    - /:id        (PUT)           → mettre à jour un restaurant (admin)
│  │  │    - /:id        (DELETE)        → supprimer un restaurant (admin)
│  │  │
│  │  └─ MenuRouter.js                  (prefix : /menus/)
│  │       - /           (GET)           → récupérer tous les items du menu (public)
│  │       - /:id        (GET)           → récupérer un item par ID (public)
│  │       - /:id        (PUT)           → mettre à jour un item (admin)
│  │       - /:id        (DELETE)        → supprimer un item (admin)
│
├─ package.json
├─ package-lock.json
├─ openapi_3API.yaml
└─ README.md

=======
- JWT-based authentication.
- For endpoints requiring authentication, include header:
  Authorization: Bearer <token>

Users (/users)
- POST /users
  - Create a new user (public)
  - Body: { email, username, password, role }
  - Response: created user info (without password) and/or token depending on implementation

- POST /users/login
  - Authenticate and receive JWT
  - Body: { email, password }
  - Response: { token: "<jwt>" } and message

- GET /users/:id
  - Get user details
  - Access: admin only or the current authenticated user (regular users cannot view other users)

- PUT /users/:id
  - Update user
  - Access: admin or the user themself
  - Body: partial user fields to update (e.g. email, username, password)

- DELETE /users/:id
  - Delete user
  - Access: admin or the user themself

Restaurants (/restaurants)
- GET /restaurants
  - Public read
  - Query params:
    - page (default 1)
    - limit (default 10)
    - sort (name | address)
  - Response: paginated array of restaurants

- POST /restaurants
  - Create a restaurant
  - Access: admin only
  - Body: { name, address, phone, opening_hours }

- GET /restaurants/:id
  - Get details of a restaurant (public)

- PUT /restaurants/:id
  - Update a restaurant
  - Access: admin only
  - Body: partial restaurant fields

- DELETE /restaurants/:id
  - Delete a restaurant
  - Access: admin only

Menus (/menus)
- GET /menus
  - Public read
  - Query params:
    - page (default 1)
    - limit (default 10)
    - sort (price | category)
  - Response: paginated array of menus

- POST /menus
  - Create a menu item
  - Access: admin only
  - Body: { restaurant_id, name, description, price, category }

- GET /menus/:id
  - Get details of a menu item (public)

- PUT /menus/:id
  - Update a menu item
  - Access: admin only
  - Body: partial menu fields

- DELETE /menus/:id
  - Delete a menu item
  - Access: admin only

Request / Response examples (curl)
---------------------------------
Create user:
```bash
curl -X POST "http://localhost:3000/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"user1","password":"pass123","role":"user"}'
```

Login:
```bash
curl -X POST "http://localhost:3000/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

Read restaurants (public):
```bash
curl "http://localhost:3000/restaurants?page=1&limit=10&sort=name"
```

Create a restaurant (admin, include JWT):
```bash
curl -X POST "http://localhost:3000/restaurants" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Le Bistrot","address":"12 rue de la Gare","phone":"+33123456789","opening_hours":"09:00-18:00"}'
>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44
```

Validation
----------
<<<<<<< HEAD
Input validation is applied to route payloads (users, restaurants, menus). Validation is performed through middleware
=======
Input validation is applied to route payloads (users, restaurants, menus). Validation is performed through middleware in the codebase.
>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44

Pagination & Sorting
--------------------
- Default pagination limit: 10 items per page.
- Pagination via query parameters `page` and `limit`.
- Sorting via `sort` query parameter (see endpoints above for supported options).

Documentation (Swagger/OpenAPI)
------------------------------
- The API is documented using the Swagger/OpenAPI standard.
- Import the provided openapi.yaml into https://editor.swagger.io to view the full API documentation (endpoints, inputs, outputs, errors).

Testing
-------
<<<<<<< HEAD
- CURL commands included in "curl command.txt"


=======
- Tests are provided using a testing framework (Jest or Mocha/Chai).
- Run tests with:
  ```bash
  npm test
  ```

Deliverables
------------
The archive submitted must contain:
- Complete source code
- API documentation (Swagger/OpenAPI)
- README with installation and running instructions (this file)

Important
---------
- The project must be runnable. Ensure environment variables are set and MongoDB is accessible before starting the server.
>>>>>>> 1a3e787ef731337537ea4dcf9fbcb7b2747b2d44


