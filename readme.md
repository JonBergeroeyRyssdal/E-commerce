# Noroff EP E-commerce Platform

This project implements the Noroff EP e-commerce platform consisting of:

- **Back-end API** (Express, Sequelize, MySQL) running on port `3000`
- **Admin Front-end** (Express, EJS, Bootstrap) running on port `3001`

Both applications communicate exclusively via RESTful endpoints secured with JWT authentication. The back-end handles user registration, authentication, product/catalog management, cart & checkout, orders, membership levels, and search functionality. The front-end provides an administrative interface for managing all data.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Requirements & Functionality](#requirements--functionality)
- [Prerequisites](#prerequisites)
- [Installation & Usage](#installation--usage)
- [Environment Variables](#environment-variables)
- [Swagger API Documentation](#swagger-api-documentation)
- [Testing](#testing)
- [References](#references)

---

## Project Structure

```
/back-end        # Express/Sequelize API
/front-end       # Admin front-end (Express/EJS/Bootstrap)
/Documentation   # Reflection report PDF, ERD diagram, Jira roadmap screenshot
```

---

## Requirements & Functionality

### Database

- MySQL with Sequelize ORM, designed in 3NF
- Includes timestamps (`created_at`, `updated_at`)

### Authentication

- JWT-based registration and login
- Tokens expire after 2 hours

### Roles & Membership

- Roles: Admin, User
- Membership Tiers:
  - Bronze (0% discount)
  - Silver (15% discount)
  - Gold (30% discount)

### CRUD Endpoints

- `/brands`
- `/categories`
- `/products` (supports soft-delete)

### Cart & Checkout

- `/cart` - Add items
- `/cart/checkout/now` - Create an order

### Orders

- `/orders` - View orders (users); update status (admin)

### Search

- `/search` - Raw SQL search for products by name, category, or brand

### Admin Front-end

- Built with Express, EJS, and Bootstrap

### API Documentation

- Swagger UI available at `/doc`

### Testing

- Jest & Supertest covering all required CRUD scenarios

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (included with Node.js)
- **MySQL** (v5.7 or higher)

---

## Installation & Usage

```bash
# 1. Clone the repository
git clone <your-repo-url>

# Navigate to back-end
cd back-end
npm install

# 2. Configure environment variables
cp .env.example .env
# Edit .env as needed

# 3. Initialize the database and seed Noroff data
npm run init

# 4. Start the back-end server (default: port 3000)
npm start

# 5. Switch to front-end
cd ../front-end
npm install
npm start    # runs on port 3001
```

---

## Environment Variables

`.env.example`

```ini
DB_HOST=localhost
DB_NAME=your_db
DB_USER=root
DB_PASS=password
JWT_SECRET=P@ssword2023
```

---

## Swagger API Documentation

- **Endpoint:** `GET /doc`
- **URL:** [http://localhost:3000/doc](http://localhost:3000/doc)

Our OpenAPI specification (`swagger.json`) was automatically generated using `swagger-autogen`, based on JSDoc comments in route files. Swagger UI is provided via `swagger-ui-express`, enabling interactive exploration of endpoints, parameters, and request/response examples.

---

## Testing

To run all tests from the back-end folder:

```bash
cd back-end
npm test
```

This executes Jest & Supertest covering:

- Categories: create, read, update, delete
- Brands: create, read, update, delete
- Products: create, read (with brand/category), update, soft-delete
- Cart: add to cart, checkout, error scenarios
- Search: partial name, category, brand, and no-match cases

---

## References

- Course Materials: Noroff back-end course guides and instructor-provided lecture notes
- ChatGPT (OpenAI): Assisted with brainstorming solution approaches, generating example code snippets, and debugging. All AI-generated suggestions were reviewed and adapted to meet project requirements.