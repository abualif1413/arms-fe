# Flash Sale Frontend

Frontend application for the Flash Sale Service.

Built with:

- React
- TypeScript
- Vite

This repository exists to provide a simple user interface for testing and interacting with the Flash Sale API.

Instead of manually invoking endpoints through Postman, this application offers a more intuitive way to:

- Register users
- Login
- View active flash sales
- View upcoming flash sales
- View recent flash sales
- Purchase flash sale products

---

# Prerequisites

Before running the application, ensure you have:

- Node.js
- npm

---

# Getting Started

## Install Dependencies

```bash
npm i
```

---

## Development Mode

Run the application locally with hot reload:

```bash
npm run dev
```

The application will be available at the URL displayed by Vite, typically:

```text
http://localhost:5173
```

---

## Build for Production

Create an optimized production build:

```bash
npm run build
```

---

## Run Production Build

Serve the production build:

```bash
npm run start
```

---

# Purpose

This project is intentionally lightweight and serves as a visual client for the backend Flash Sale Service.

Its primary goal is to make API testing and demonstration easier by providing a simple user interface rather than relying solely on tools such as Postman or cURL.

---

# Technology Stack

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| React      | UI Library                      |
| TypeScript | Programming Language            |
| Vite       | Build Tool & Development Server |

---

# Related Repository

This frontend is designed to work with the Flash Sale backend service built using:

- NestJS
- PostgreSQL
- Redis
- TypeORM
- BullMQ

Please ensure the backend service is running before using this application.

---
