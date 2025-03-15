# Node.js API with JWT Authentication

This API implements a CRUD system for products with JWT authentication and role-based authorization.

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## Testing with Postman

### 1. Authentication

First, you need to get a JWT token by logging in:

**Login**
- Method: `POST`
- URL: `http://localhost:3000/api/auth/login`
- Body (raw JSON):
```json
{
    "username": "admin",
    "password": "password123"
}
```

Save the returned token. You'll need it for all subsequent requests.

### 2. Products Endpoints

For all product endpoints, add the Authorization header:
```
Authorization: Bearer your_token_here
```

#### List All Products
- Method: `GET`
- URL: `http://localhost:3000/api/products`
- Auth: Required
- Role: Any

#### Get Single Product
- Method: `GET`
- URL: `http://localhost:3000/api/products/1`
- Auth: Required
- Role: Any

#### Create Product (Admin Only)
- Method: `POST`
- URL: `http://localhost:3000/api/products`
- Auth: Required
- Role: Admin
- Body (raw JSON):
```json
{
    "name": "New Product",
    "price": 149.99,
    "description": "Product description"
}
```

#### Update Product (Admin Only)
- Method: `PUT`
- URL: `http://localhost:3000/api/products/1`
- Auth: Required
- Role: Admin
- Body (raw JSON):
```json
{
    "name": "Updated Product",
    "price": 199.99,
    "description": "Updated description"
}
```

#### Delete Product (Admin Only)
- Method: `DELETE`
- URL: `http://localhost:3000/api/products/1`
- Auth: Required
- Role: Admin

## Error Responses

### Authentication Errors
- 401 Unauthorized: Invalid credentials or missing/invalid token
- 403 Forbidden: User doesn't have required role (admin)

### Validation Errors
- 400 Bad Request: Invalid input data
- 404 Not Found: Product not found

## Example Postman Collection

1. Create a new collection in Postman
2. Add a new request for login
3. After successful login, create a collection variable for the token
4. Use the collection variable in other requests' Authorization header
5. Test each endpoint ensuring proper authentication and role requirements

### Testing Flow
1. Login with admin credentials
2. List all products
3. Get a single product
4. Create a new product
5. Update the created product
6. Delete the product
7. Verify deletion by listing products again