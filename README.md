# SportNest - Sports Facility Booking Platform (Client)

![SportNest](https://via.placeholder.com/1200x600.png?text=SportNest+-+Sports+Facility+Booking+Platform)

## 📌 Project Overview
SportNest is a comprehensive sports facility booking and management platform built with Next.js. It allows users to browse available sports facilities, manage their bookings, and for administrators to manage facilities efficiently. It features a modern, responsive UI with premium aesthetics and dynamic animations.

## 🚀 Features
- **User Authentication:** Secure login and registration powered by Better Auth.
- **Facility Discovery:** Browse and search for various sports facilities.
- **Booking Management:** Seamlessly book facilities and view past/upcoming bookings.
- **Admin Dashboard:** Manage facilities (add, edit, delete) with administrative privileges.
- **Responsive Design:** Fully responsive UI built with Tailwind CSS, ensuring a great experience across all devices.
- **Dark Mode Support:** Integrated dark mode for better user experience in low-light environments.
- **Dynamic Animations:** Smooth transitions and interactions powered by Framer Motion.

## 🛠 Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library:** [React 18](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📦 NPM Packages Used
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `^14.1.4` | Core React framework |
| `react` / `react-dom` | `^18.2.0` | UI Library |
| `tailwindcss` | `^3.4.1` | Utility-first CSS framework |
| `framer-motion` | `^11.0.8` | Animation library for React |
| `better-auth` | `^1.6.11` | Comprehensive authentication solution |
| `react-hook-form` | `^7.51.1` | Form state management and validation |
| `axios` | (varies) | Promise-based HTTP client for API requests |
| `react-hot-toast` | `^2.4.1` | Elegant notifications |

## ⚙️ Installation Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/masudranamdra/SportNest-Client.git
   cd SportNest-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to `.env.local` and fill in your variables.
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables
Create a `.env.local` file in the root of your project and add the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `BETTER_AUTH_URL` | Base URL of your app (e.g., `http://localhost:3000`) | Yes |
| `BETTER_AUTH_SECRET` | Secret key for JWT/session encryption | Yes |
| `MONGODB_URI` | MongoDB connection string for auth adapter | Yes |
| `GOOGLE_CLIENT_ID` | (Optional) Google OAuth Client ID | No |
| `GOOGLE_CLIENT_SECRET`| (Optional) Google OAuth Client Secret | No |

## 🌐 Live URL
- **Production:** [https://sportnest-client.vercel.app](https://sportnest-client.vercel.app) *(Replace with actual URL)*

## 🚀 Deployment Instructions
This Next.js application is optimized for deployment on Vercel:
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Add the required environment variables in the Vercel dashboard.
5. Click **Deploy**. Vercel will automatically build and deploy your application.

## 📁 Folder Structure
```text
SportNest-Client/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   │   ├── api/          # Better Auth API endpoints
│   │   ├── bookings/     # Booking management pages
│   │   ├── facilities/   # Facility listing and management
│   │   ├── login/        # Authentication login page
│   │   └── register/     # Authentication registration page
│   ├── components/       # Reusable React components (Navbar, Footer, etc.)
│   ├── context/          # Global React Context providers (AuthContext)
│   ├── lib/              # Utility libraries and Auth client configuration
│   ├── styles/           # Global CSS and Tailwind configurations
│   └── utils/            # Helper functions and API clients
├── public/               # Static assets (images, icons)
├── .env.example          # Environment variables template
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies and scripts
```

## 📸 Screenshots
*(Add high-quality screenshots of the application here to showcase the UI/UX)*

## 🤝 Contribution Guide
Contributions are welcome! If you'd like to improve the project:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author
**Masud Rana**
- GitHub: [@masudranamdra](https://github.com/masudranamdra)
- Email: [masud.dev01@gmail.com](mailto:masud.dev01@gmail.com)
