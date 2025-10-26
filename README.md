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

Prerequisites
-------------
- Node.js (compatible version)
- npm
- MongoDB (local or remote MongoDB URI)

Installation
------------

1. Install dependencies:
   ```bash
   npm install
   ```


Start the server
----------------
- Development:
  ```bash
  npm run start
  ```

API usage
---------
Authentication
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



Validation
----------
Input validation is applied to route payloads (users, restaurants, menus). Validation is performed through middleware

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
- CURL commands included in "curl command.txt"




