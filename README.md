# GoCart

**An advanced e-commerce platform built with Next.js, featuring AI integration, secure payments, and background processing.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPratyayPB%2FGoCart)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://go-cart-one-neon.vercel.app/) · [Report an Issue](https://github.com/PratyayPB/GoCart/issues)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Screenshots / Demo](#screenshots--demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Database](#database)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

### What is the project?

GoCart is a modern, full-stack e-commerce application designed to provide a seamless shopping experience. It leverages the latest web technologies to deliver high performance, secure authentication, AI-powered features, and robust payment processing.

The platform includes both customer-facing storefronts and an admin interface for managing products, orders, and analytics.

### Project Goals

- Provide a scalable and performant e-commerce experience using Next.js App Router.
- Integrate seamless and secure authentication via Clerk.
- Handle payments reliably using Stripe.
- Utilize AI for enhanced product discovery or management.
- Ensure reliable background task processing with Inngest.

---

## Key Features

- **User Authentication** — Secure sign-up and login powered by Clerk, including Google OAuth.
- **Product Management & Storage** — Image uploads and optimization handled seamlessly by ImageKit.
- **Secure Payments** — Checkout and payment processing integrated with Stripe.
- **AI Integration** — Powered by Gemini AI for smart features.
- **Background Jobs** — Reliable asynchronous task processing using Inngest.
- **Admin Dashboard** — Comprehensive management of the store with data visualization using Recharts.
- **State Management** — Robust frontend state management using Redux Toolkit.

---

## Screenshots / Demo

### Application Preview

![Screenshot 1](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033350.png)
![Screenshot 2](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033443.png)
![Screenshot 3](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033401.png)
![Screenshot 4](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033409.png)
![Screenshot 5](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033608.png)
![Screenshot 6](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033429.png)
![Screenshot 7](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033534.png)
![Screenshot 8](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033630.png)

### Demo

**Live Application:** [https://go-cart-one-neon.vercel.app/](https://go-cart-one-neon.vercel.app/)

---

## Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit
- **Charts:** Recharts

### Backend

- **Framework:** Next.js (Server Actions & API Routes)
- **Database:** Neon (Serverless Postgres)
- **ORM:** Prisma
- **AI Integration:** Google Gemini API

### Infrastructure & Services

- **Authentication:** Clerk (Google OAuth support)
- **Payments:** Stripe
- **Image CDN & Storage:** ImageKit
- **Background Jobs:** Inngest
- **Hosting:** Vercel

---

## Project Structure

A high-level overview of the Next.js project structure:

```text
gocart/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── .env                  # Environment variables (local)
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
└── tailwind.config.js    # Tailwind CSS configuration
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js (v18+)
- npm or pnpm
- Git
- A PostgreSQL database (e.g., Neon)

### Clone the Repository

```bash
git clone https://github.com/PratyayPB/GoCart.git
cd gocart
```

### Install Dependencies

```bash
npm install
```

### Database Setup

Initialize the Prisma client and push the schema to your database:

```bash
npm run postinstall
npx prisma db push
```

### Run the Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env` or `.env.local` file in the root of your project based on the following required variables.

### Variable Reference

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | Email address for admin access |
| `DATABASE_URL` | Neon Serverless Postgres connection string |
| `DIRECT_URL` | Direct connection string for Prisma migrations |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend API key |
| `CLERK_SECRET_KEY` | Clerk backend API secret |
| `STRIPE_SECRET_KEY` | Stripe secret key for payment processing |
| `STRIPE_WEBHOOK_KEY` | Stripe webhook signing secret |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |
| `GEMINI_API_KEY` | Google Gemini API key |
| `GEMINI_MODEL` | Specific Gemini model to use |
| `INNGEST_EVENT_KEY` | Inngest event key for background jobs |
| `INNGEST_SIGNING_KEY` | Inngest signing key for security |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Currency symbol for storefront display |

**Never commit real secrets, API keys, credentials, or private tokens to the repository.**

---

## Usage

### Example Workflow

1. **Sign In**: Users authenticate using Clerk (via Google or Email).
2. **Browse Products**: Users can view the catalog with images served efficiently via ImageKit.
3. **Cart Management**: State is managed securely via Redux Toolkit.
4. **Checkout**: Secure payment processing handled by Stripe.
5. **Admin Management**: Admins (defined by `ADMIN_EMAIL`) can manage the storefront, utilizing AI features via Gemini and viewing analytics.

---

## Database

### Database Technology

- **Neon**: Serverless PostgreSQL platform designed for edge deployments.
- **Prisma**: Next-generation Node.js and TypeScript ORM for defining the database schema and running migrations.

---

## Authentication & Authorization

### Authentication

Authentication is fully managed by **Clerk**:
- Supports Google OAuth and standard email/password logins.
- Secure session management handled by Clerk middleware.

### Authorization

- Role-based access control separates standard users from administrators.
- The `ADMIN_EMAIL` environment variable designates the administrative account for dashboard access.

---

## Deployment

### Production Environment

The application is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Add all the required Environment Variables in the Vercel project settings.
3. Vercel will automatically build (`prisma generate && next build`) and deploy the application.

### Production URL

[https://go-cart-one-neon.vercel.app/](https://go-cart-one-neon.vercel.app/)

---

## Contributing

Contributions are welcome.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-new-feature`)
3. Make your changes
4. Commit your changes (`git commit -m "feat: add some feature"`)
5. Push the branch (`git push origin feature/my-new-feature`)
6. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

See the LICENSE file for details.

---

## Author

**Pratyay Pratim Borah**

- GitHub: [@PratyayPB](https://github.com/PratyayPB)
- LinkedIn: [Pratyay Pratim Borah](https://www.linkedin.com/in/pratyaypratimborah/)
- Portfolio: [https://portfolio-pratyay.vercel.app/](https://portfolio-pratyay.vercel.app/)
