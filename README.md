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

Prerequisites
-------------
- Node.js (compatible version)
- npm
- MongoDB (local or remote MongoDB URI)

Installation
------------
1. Clone the repository:
   ```bash
   git clone https://github.com/<owner>/<repo>.git
   cd <repo>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

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

Start the server
----------------
- Development:
  ```bash
  npm start
  ```
  (ou `node src/index.js` selon l'organisation du projet)

API usage
---------
Authentication
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
```

Validation
----------
Input validation is applied to route payloads (users, restaurants, menus). Validation is performed through middleware in the codebase.

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


