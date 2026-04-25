
# Blog API

A RESTful Blog API built with Node.js, Express, MongoDB and Docker featuring database indexing for optimized queries.

## Features

- Create and retrieve blog posts
- Filter posts by username and category
- Full text search in title and content
- Pagination support
- Database indexing for fast queries
- Fully containerized with Docker Compose

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Docker and Docker Compose

## Database Indexes

- Username index for fast user queries
- CreatedAt index for sorting by newest
- Category index for category filtering
- Text index on title and content for search

## API Endpoints

| Method |         Endpoint             |              Description       |
|--------|------------------------------|--------------------------------|
| POST   | /api/posts                   | Create a new post              |
| GET    | /api/posts                   | Get all posts with pagination  | 
| GET    | /api/posts/user/:username    | Get posts by username          |
| GET    | /api/posts/category/:category| Get posts by category          |
| GET    | /api/posts/search?q=query    | Search posts by text           |
| GET    | /api/posts/:id               | Get single post                |

## Getting Started

### Prerequisites
- Docker Desktop installed

### Run with Docker

bash
# Clone the repository
git clone https://github.com/Subrajit-Deka-2007/blog-api

# Go into project folder
cd blog-api

# Start all services
docker compose up --build -d

# Check logs
docker compose logs blog-app


### Run without Docker

bash
# Install dependencies
npm install

# Add .env file
MONGODB_URI=mongodb://localhost:27017/blogapi
PORT=3000

# Start server
node index.js


## Example Requests

### Create Post
json
POST /api/posts
{
  "title": "Learning Docker",
  "content": "Docker is a containerization tool",
  "username": "subro",
  "category": "devops"
}


### Search Posts

GET /api/posts/search?q=docker


### Get Posts with Pagination

GET /api/posts?page=1&limit=10


## Author

Subro — [GitHub](https://github.com/Subhrajit-Deka-2007)
