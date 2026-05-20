# SportNest - Sports Facility Booking Platform

## Project Overview

SportNest is a modern sports facility booking platform developed using Next.js and React.js. Users can explore sports facilities, view detailed information, and book available playgrounds through a responsive and user-friendly interface.

The main purpose of this project is to practice and demonstrate the technologies and concepts learned during coursework, including authentication, CRUD operations, private routing, API integration, responsive design, and database management.

---

## Live Website

Client Live Link:

https://sportnest-mdra.vercel.app

---

## Main Features

- User Registration and Login System
- Google Authentication
- Private and Protected Routes
- Browse Sports Facilities
- Facility Details Page
- Book Sports Facilities
- Manage User Bookings
- Add New Facilities
- Manage Existing Facilities
- Responsive Design for Mobile, Tablet, and Desktop
- Dark and Light Theme Support
- Dynamic Data Rendering
- Loading and Error Handling Pages
- Modern User Interface Design

---

## Technologies Used

### Frontend
- Next.js
- React.js
- JavaScript (JSX)
- Tailwind CSS

### Authentication
- Better Auth
- Google OAuth

### Database
- MongoDB

### Deployment
- Vercel

---

## NPM Packages Used

| Package Name | Purpose |
|--------------|---------|
| next | React Framework |
| react | Frontend Library |
| react-dom | DOM Rendering |
| tailwindcss | CSS Utility Framework |
| framer-motion | Animation Library |
| better-auth | Authentication System |
| react-hook-form | Form Management |
| axios | API Requests |
| lucide-react | Icons |
| react-hot-toast | Notification System |

---

## Installation Process

### Clone Repository

```bash
git clone https://github.com/masudranamdra/SportNest-Client.git
```

### Move to Project Folder

```bash
cd SportNest-Client
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env.local` file and add the following variables:

```env
NEXT_PUBLIC_API_URL=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## Project Structure

```bash
## Project Structure

```bash
SportNest-Client/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── assets/
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.js
│   │   │
│   │   ├── bookings/
│   │   │   └── page.jsx
│   │   │
│   │   ├── facilities/
│   │   │   ├── page.jsx
│   │   │   ├── add/
│   │   │   │   └── page.jsx
│   │   │   ├── manage/
│   │   │   │   └── page.jsx
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   │
│   │   ├── login/
│   │   │   └── page.jsx
│   │   │
│   │   ├── register/
│   │   │   └── page.jsx
│   │   │
│   │   ├── loading.jsx
│   │   ├── error.jsx
│   │   ├── not-found.jsx
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── Spinner.jsx
│   │   ├── FacilityCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   ├── services/
│   │
│   ├── styles/
│   │
│   ├── utils/
│   │
│   └── data/
│
├── .env.local
├── .env.example
├── .gitignore
├── jsconfig.json
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```
```

---

## Responsive Design

This project is fully responsive and optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Devices

---

## Developer Information

Name: Masud Rana

GitHub:
https://github.com/masudranamdra

Email:
masud.dev01@gmail.com

---

## License

This project is created for educational and learning purposes only.


Server :

# SportNest - Sports Facility Booking Platform (Server)

## Project Overview

SportNest Server is the backend API server for the SportNest sports facility booking platform. It manages authentication, facilities, bookings, and database operations using Node.js, Express.js, and MongoDB.

This project was developed to practice and demonstrate backend development concepts learned during coursework, including REST API creation, CRUD operations, authentication, database integration, middleware, and server deployment.

---

## Live Server URL

Server Live Link:

https://sportnest-mdra.onrender.com

---

## Main Features

- REST API Development
- User Authentication System
- Google Authentication Support
- Facility Management System
- Booking Management System
- CRUD Operations
- MongoDB Database Integration
- Protected API Routes
- Middleware Implementation
- Error Handling System
- Environment Variable Security
- CORS Configuration

---

## Technologies Used

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- Better Auth
- Google OAuth

### Deployment
- Render

---

## NPM Packages Used

| Package Name | Purpose |
|--------------|---------|
| express | Backend Framework |
| mongodb | MongoDB Database Driver |
| mongoose | MongoDB ODM |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment Variables |
| cookie-parser | Cookie Handling |
| nodemon | Development Server |
| better-auth | Authentication System |

---

## Installation Process

### Clone Repository

```bash
git clone https://github.com/masudranamdra/SportNest-Server.git
```

### Move to Project Folder

```bash
cd SportNest-Server
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file and add the following variables:

```env
PORT=
MONGODB_URI=
CLIENT_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## API Endpoints

### Authentication Routes

```bash
POST /api/auth/sign-in
POST /api/auth/sign-up
GET  /api/auth/get-session
```

### Facility Routes

```bash
GET    /api/facilities
GET    /api/facilities/:id
POST   /api/facilities
PUT    /api/facilities/:id
DELETE /api/facilities/:id
```

### Booking Routes

```bash
GET    /api/bookings
POST   /api/bookings
DELETE /api/bookings/:id
```

---

## Project Structure

```bash
SportNest-Server/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── services/
│
├── database/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Security Features

- Protected API Routes
- Environment Variable Protection
- Authentication Middleware
- CORS Security Configuration
- Cookie-Based Session Handling

---

## Developer Information

Name: Masud Rana

GitHub:
https://github.com/masudranamdra

Email:
masud.dev01@gmail.com

---

## License

This project is created for educational and learning purposes only.

