# Career Diversity Inc. - Corporate Website 🌐

A modern, highly interactive, and multilingual corporate website built to connect Japan and the world through global talent solutions. 

This project is built with the cutting-edge **Next.js 16 App Router**, styled with **Tailwind CSS v4**, and animated using **Framer Motion** to provide a seamless, premium user experience.

---

## ✨ Key Features

* 🌍 **Multilingual Support (i18n):** Seamlessly switch between English (EN), Indonesian (ID), and Japanese (JA) without page reloads. Language preferences are saved via `localStorage`.
* 🚀 **Next.js App Router:** Utilizes the latest Next.js features including Server and Client Components, optimized routing, and static generation.
* ✨ **Fluid Animations:** Beautiful page transitions, scroll-triggered reveal animations, and interactive hover states powered by `framer-motion`.
* 📰 **Dynamic Content Pages:** Scalable, dynamically routed pages for News (`/news/[id]`) and Columns (`/column/[id]`) with client-side filtering and search.
* 📱 **Fully Responsive:** Carefully crafted layouts that look perfect on desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js (v16.2.1)](https://nextjs.org/) - App Router
* **Library:** [React (v19.2.4)](https://react.dev/)
* **Styling:** [Tailwind CSS (v4)](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Project Structure

```text
riandi-website/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                # Next.js App Router directory
│   │   ├── about/          # About Us page
│   │   ├── column/         # Column listing & dynamic article pages
│   │   ├── contact/        # Contact form page
│   │   ├── news/           # News listing & dynamic article pages
│   │   ├── services/       # Service details routing
│   │   ├── globals.css     # Global styles & Tailwind configurations
│   │   ├── layout.jsx      # Root layout wrapper
│   │   └── page.jsx        # Main Landing/Home page
│   └── components/         # Reusable UI components
│       ├── Footer.jsx      # Global footer with integrated localized text
│       └── Navbar.jsx      # Global sticky navbar with language selector
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies & scripts
└── tailwind.config.js      # Tailwind CSS configuration (if applicable)
```

---

## 🚀 Getting Started

To get this project up and running on your local machine, follow these steps:

### 1. Prerequisites

Make sure you have Node.js installed (v18.17 or higher is recommended for Next.js).

### 2. Installation

Clone the repository and install the dependencies:

```bash
# Install dependencies
npm install
```

### 3. Running the Development Server

Start the local development server:

```bash
npm run dev
```
```

Open http://localhost:3000 in your browser to see the result.

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm run dev`** — Runs the app in development mode.
- **`npm run build`** — Builds the app for production to the `.next` folder. Includes static site generation for dynamic routes.
- **`npm run start`** — Starts the production server using the built app.
- **`npm run lint`** — Runs ESLint to find and fix code style issues.

---

## 💡 Notes on Dynamic Routing

For sections like `/news/[id]` and `/column/[id]`, the application uses a hybrid approach:

- **Server Component** (`page.jsx`) — Handles `generateStaticParams()` to ensure Next.js can export the pages as static HTML for S3 hosting.
- **Client Component** (e.g., `ArticleClient.jsx`) — Handles the interactive UI, animations, and extracting URL parameters via `useParams()`.