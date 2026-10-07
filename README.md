# GoCart — Full-Stack AI-Powered Multi-Vendor E-Commerce Platform

**A scalable, modern multi-vendor e-commerce ecosystem built with Next.js 15, Neon PostgreSQL, Prisma, Clerk, Stripe, ImageKit, Inngest, and Google Gemini AI.**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Application-brightgreen?style=flat-square&logo=vercel)](https://go-cart-one-neon.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Neon Database](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Explore Live Demo](https://go-cart-one-neon.vercel.app/) · [Report an Issue](https://github.com/PratyayPB/GoCart/issues) · [Request Feature](https://github.com/PratyayPB/GoCart/issues)

---

## Table of Contents

- [Overview](#overview)
  - [What is GoCart?](#what-is-gocart)
  - [Problem Statement](#problem-statement)
  - [The Solution](#the-solution)
- [Key Features](#key-features)
  - [Customer & Shopping Experience](#customer--shopping-experience)
  - [Multi-Vendor & Seller Management](#multi-vendor--seller-management)
  - [AI-Assisted Catalog Ingestion](#ai-assisted-catalog-ingestion)
  - [Admin Governance & Analytics](#admin-governance--analytics)
  - [Event-Driven Background Processing](#event-driven-background-processing)
- [Screenshots & Visual Tour](#screenshots--visual-tour)
- [Tech Stack](#tech-stack)
- [System Architecture & Data Flow](#system-architecture--data-flow)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Migration](#database-migration)
  - [Run Locally](#run-locally)
- [Environment Variables Reference](#environment-variables-reference)
- [User Workflows](#user-workflows)
- [Database Schema & Models](#database-schema--models)
- [Authentication & Role-Based Authorization](#authentication--role-based-authorization)
- [Deployment](#deployment)
- [Roadmap & Future Enhancements](#roadmap--future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author & Acknowledgments](#author--acknowledgments)

---

## Overview

### What is GoCart?

**GoCart** is a modern, enterprise-ready multi-vendor e-commerce marketplace built from the ground up to support three distinct user personas: **Shoppers**, **Independent Sellers/Store Owners**, and **Platform Administrators**. 

Built with the Next.js App Router and serverless infrastructure, GoCart combines high-performance storefront browsing with rich seller tools, automated AI-driven listing workflows, reliable payment gateways, and asynchronous lifecycle tasks.

### Problem Statement

Setting up and managing multi-vendor stores often suffers from three recurring friction points:
1. **Catalog Ingestion Burden**: Sellers spend disproportionate time formatting product details, descriptions, and tags.
2. **Brittle Data Synchronization**: Handling user lifecycles, webhook delivery, and scheduled campaign invalidations (e.g., expiring coupons) frequently leads to out-of-sync databases.
3. **Complex Marketplace Governance**: Balancing buyer trust, multi-store isolation, and administrator verification requires unified role-based tooling.

### The Solution

GoCart delivers:
- **Multimodal AI Product Ingestion**: Sellers upload a product photo, and Google Gemini's multimodal vision model automatically generates SEO-ready product titles and structured product descriptions.
- **Event-Driven Resilience with Inngest**: User account synchronization (creation, modification, deletion) and scheduled coupon invalidations run through durable step-functions that withstand serverless timeouts.
- **Unified Role Separation**: Granular control dividing general buyers, verified store operators, and master administrators.

---

## Key Features

### Customer & Shopping Experience
- **Responsive Storefront**: Clean, accessible catalog with dynamic product filtering, sorting, and responsive layout powered by Tailwind CSS v4.
- **Cart Management**: Persistent shopping cart synced with Redux Toolkit and database storage.
- **Flexible Checkout**: Multi-method checkout supporting **Stripe Payments** and **Cash on Delivery (COD)**.
- **Shipping Address Book**: Saved delivery addresses with validation and management.
- **Reviews & Ratings**: Verified customer ratings and feedback per purchased product and store.
- **Coupons & Promotional Discounts**: Instant validation for member-only and new-user discount vouchers.

### Multi-Vendor & Seller Management
- **Store Application & Onboarding**: Users can register custom vendor stores with custom branding, logos, and business contacts.
- **Seller Dashboard**: Real-time sales metrics, order fulfillment management, and order status updates (`ORDER_PLACED`, `PROCESSING`, `SHIPPED`, `DELIVERED`).
- **Product Lifecycle**: Real-time stock availability toggle, pricing adjustments, image galleries, and category assignment.

### AI-Assisted Catalog Ingestion
- **Vision-Driven Listing**: Powered by **Google Gemini AI**, the seller backend accepts raw product images and automatically returns clean, schema-compliant JSON containing optimized product names and compelling sales copy.

### Admin Governance & Analytics
- **Executive Control Center**: Centralized administration for platform-wide metrics with interactive charts built using **Recharts**.
- **Store Verification**: Vendor review workflow with approval and activation/deactivation toggles to combat fraud.
- **Promotional Engine**: Administrative coupon creation with customizable discount percentages, usage restrictions, and automatic expiration dates.

### Event-Driven Background Processing
- **Durable User Sync**: Seamlessly syncs Clerk webhook events (`user.created`, `user.updated`, `user.deleted`) to Neon PostgreSQL via Inngest functions.
- **Scheduled Expiration**: Durable sleep-until timers automatically purge expired promotional vouchers without needing fragile cron servers.

---

## Screenshots & Visual Tour

<div align="center">


![Storefront Banner & Products](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033350.png?updatedAt=1790745379389)

---

![Product Showcase & Details](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033401.png?updatedAt=1790745378842)

---

![Cart & Order Summary](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033443.png?updatedAt=1790745378896)


---

![Address Management](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033409.png?updatedAt=1790745378835)

---

![Vendor Onboarding](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033608.png?updatedAt=1790745378754)

---

![Order Tracking & Status](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033429.png?updatedAt=1790745378735)

---

![Add Product & AI Listing](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033500.png?updatedAt=1790745378694)

---

![Product Inventory Table](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033534.png?updatedAt=1790745378702)

---

![Admin Dashboard & Recharts](https://ik.imagekit.io/ulycoljug/Portfolio-resources/go-cart/Screenshot%202026-02-04%20033630.png?updatedAt=1790745378615)

</div>

---

## Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) | Hybrid SSR, Edge API routes, Server Actions, and Turbopack |
| **Frontend UI** | [React 19](https://react.dev/) & [Tailwind CSS v4](https://tailwindcss.com/) | Modern component architecture with utility-first styling |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) & `react-redux` | Client-side cart state and optimistic UI updates |
| **Data Visualizations** | [Recharts](https://recharts.org/) | Performance and sales revenue visual dashboards |
| **Authentication** | [Clerk](https://clerk.com/) | User authentication, session management, and Google OAuth |
| **Database** | [Neon PostgreSQL](https://neon.tech/) | Serverless cloud PostgreSQL with connection pooling |
| **ORM** | [Prisma v6](https://www.prisma.io/) | Type-safe database queries, relations, and migration tooling |
| **Payments** | [Stripe](https://stripe.com/) | Secure checkout sessions, webhooks, and multi-currency billing |
| **Media CDN** | [ImageKit](https://imagekit.io/) | Fast media upload, CDN delivery, and dynamic image optimization |
| **Artificial Intelligence** | [Google Gemini API](https://ai.google.dev/) | Multimodal vision analysis for auto-generating product listings |
| **Background Orchestration** | [Inngest](https://www.inngest.com/) | Durable event-driven jobs, sleep-until timers, and webhook sync |
| **Deployment** | [Vercel](https://vercel.com/) | Serverless application hosting, edge networks, and CI/CD |

---

## System Architecture & Data Flow

```text
                           +------------------------+
                           |  Client / Browser      |
                           +-----------+------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
         [Authentication]                             [Operations]
                   v                                       v
        +---------------------+               +-------------------------+
        | Clerk Auth Engine   |               | Next.js 15 App Router   |
        +----------+----------+               +----+---------------+----+
                   | Webhook Event                 |               |
                   v                               v               v
        +---------------------+          +-------------+   +-------------------+
        | Inngest Event Queue |          | Prisma ORM  |   | External APIs     |
        | - User Sync         |          +------+------+   | - Stripe (Pay)    |
        | - Coupon Expiry     |                 |          | - ImageKit (CDN)  |
        +----------+----------+                 |          | - Gemini (AI)     |
                   |                            v          +-------------------+
                   +-------------------> [ Neon DB ]
                                        (PostgreSQL)
```

---

## Project Structure

```text
gocart/
├── app/                          # Next.js App Router root
│   ├── (public)/                 # Storefront pages (browse, cart, product details)
│   ├── admin/                    # Platform administrator dashboard & management
│   ├── store/                    # Seller portal, product management, and orders
│   ├── api/                      # Backend API Route Handlers
│   │   ├── address/              # Shipping address endpoints
│   │   ├── admin/                # Admin verification, coupons, and metrics
│   │   ├── cart/                 # Cart synchronization
│   │   ├── inngest/              # Inngest event webhook receiver
│   │   ├── orders/               # Checkout and order tracking
│   │   ├── products/             # Product catalog retrieval
│   │   ├── rating/               # Review and rating submissions
│   │   ├── store/                # Vendor store onboarding & AI generation
│   │   └── stripe/               # Stripe checkout & webhook lifecycle
│   ├── layout.js                 # Root layout with Clerk & Redux providers
│   └── page.js                   # Homepage entry point
├── components/                   # Reusable UI components (Navbar, Cart, Charts)
├── configs/                      # Third-party configurations
│   ├── geminiAi.js               # Google Gemini client configuration
│   ├── imageKit.js               # ImageKit SDK credentials & setup
│   └── openAI.js                 # Secondary AI fallback configuration
├── inngest/                      # Background job handlers
│   ├── client.js                 # Inngest client initialization
│   └── functions.js              # Durable functions (User sync & Coupon expiry)
├── lib/                          # Shared library helpers (Prisma client singleton)
├── middlewares/                  # Role authorization middleware (authSeller, authAdmin)
├── prisma/                       # Database specifications
│   └── schema.prisma             # Data models, enums, and database relationships
├── public/                       # Static public assets and brand icons
├── .env                          # Local environment variables (Do not commit)
├── middleware.js                 # Clerk authentication routing middleware
├── next.config.mjs               # Next.js build and image optimization settings
├── package.json                  # Project dependencies and script declarations
└── README.md                     # Project documentation
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version `18.18.0` or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A free [Neon](https://neon.tech/) PostgreSQL database account
- Free developer accounts on [Clerk](https://clerk.com/), [Stripe](https://stripe.com/), [ImageKit](https://imagekit.io/), and [Google AI Studio](https://aistudio.google.com/)

### Installation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/PratyayPB/GoCart.git
cd gocart
npm install
```

### Environment Setup

Create a `.env` file in the root of the project:

```bash
cp .env.example .env # or create a new .env file
```

Fill in the required configuration variables as described in the [Environment Variables](#environment-variables-reference) section.

### Database Migration

Push the Prisma schema to your Neon PostgreSQL instance and generate the client:

```bash
npx prisma db push
npm run postinstall
```

### Run Locally

Start the Next.js development server with Turbopack:

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000
```

To run and test background Inngest functions locally, open a second terminal and execute:
```bash
npx inngest-cli@latest dev
```

---

## Environment Variables Reference

Below is a breakdown of the required environment variables:

| Variable | Required | Description | Example / Notes |
|---|---|---|---|
| `DATABASE_URL` | **Yes** | Neon Pooled PostgreSQL connection string | `postgresql://user:pass@ep-pooler.neon.tech/neondb?sslmode=require` |
| `DIRECT_URL` | **Yes** | Direct connection string for Prisma migrations | `postgresql://user:pass@ep-direct.neon.tech/neondb?sslmode=require` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | **Yes** | Clerk Frontend API key | `pk_test_...` |
| `CLERK_SECRET_KEY` | **Yes** | Clerk Backend secret key | `sk_test_...` |
| `ADMIN_EMAIL` | **Yes** | Designated administrator account email | `admin@example.com` (Grants access to `/admin`) |
| `STRIPE_SECRET_KEY` | **Yes** | Stripe secret API key for checkout sessions | `sk_test_...` |
| `STRIPE_WEBHOOK_KEY` | **Yes** | Secret used to verify incoming Stripe webhook events | `whsec_...` |
| `IMAGEKIT_PUBLIC_KEY` | **Yes** | ImageKit public access key | `public_...` |
| `IMAGEKIT_PRIVATE_KEY` | **Yes** | ImageKit private key for server upload authorizations | `private_...` |
| `IMAGEKIT_URL_ENDPOINT` | **Yes** | ImageKit CDN delivery URL endpoint | `https://ik.imagekit.io/your_id/products` |
| `GEMINI_API_KEY` | **Yes** | Google AI Studio API key | `AIzaSy...` |
| `GEMINI_MODEL` | **Yes** | Model identifier for AI product listings | `gemini-2.5-flash` or `gemini-1.5-flash` |
| `INNGEST_EVENT_KEY` | **Yes** | Inngest event publication key | Event key generated in Inngest dashboard |
| `INNGEST_SIGNING_KEY` | **Yes** | Inngest signature verification key for API route | `signkey-prod-...` |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | **Yes** | Visual currency indicator on storefront | `$` or `₹` |

> [!CAUTION]
> Never commit your production keys or `.env` files to source control. Always populate these securely in your Vercel project dashboard.

---

## User Workflows

### 1. The Shopper Journey
1. **Browse & Search**: Customers explore available catalog items across categories.
2. **Add to Cart**: Real-time cart state managed through Redux and synchronized with the database.
3. **Checkout**: Apply available promo coupons, select or create a delivery address, and choose between Stripe or Cash on Delivery.
4. **Order Status & Feedback**: Track order transitions and submit product reviews upon delivery.

### 2. The Merchant / Seller Journey
1. **Store Creation**: Users apply for a store profile with custom branding and bio.
2. **AI-Powered Product Ingestion**:
   - The merchant uploads a clear photo of the merchandise.
   - The `/api/store/ai` route forwards the image to **Gemini AI**.
   - Gemini analyzes product features and generates title, description, and suggested attributes in structured JSON.
3. **Inventory Management**: Merchants track fulfillment and adjust stock availability in real time.

### 3. The Administrator Journey
1. **Marketplace Verification**: Admin authenticates via `ADMIN_EMAIL`.
2. **Store Approvals**: Review pending vendor submissions; approve, reject, or deactivate non-compliant stores.
3. **Marketing Controls**: Launch time-bound discount codes with automated background expiry.
4. **Analytics**: Monitor overall platform revenue and order distribution via interactive graphs.

---

## Database Schema & Models

GoCart uses **Neon PostgreSQL** managed via **Prisma ORM**. Key models include:

- **`User`**: Core user record synchronized from Clerk containing cart JSON state and relations to orders, addresses, and stores.
- **`Store`**: Vendor entity with approval status (`pending`, `active`), owner link, contact details, and products.
- **`Product`**: Product entity containing price, MRP, category, stock flags, multiple ImageKit image URLs, and store relations.
- **`Order` & `OrderItem`**: Complete transaction record tracking payment method (`STRIPE` / `COD`), delivery address, fulfillment statuses, and discount data.
- **`Rating`**: Verified reviews linking buyer, product, and specific order record.
- **`Address`**: Structured user delivery destination records.
- **`Coupon`**: Promotional discount system supporting member-specific rules, new-user limitations, and timestamped expiration.

---

## Authentication & Role-Based Authorization

GoCart implements multi-tier role validation:

1. **Client & Route Gatekeeping (`middleware.js`)**:
   - Powered by `@clerk/nextjs` to protect user-specific pages and private checkouts.
2. **Seller Route Guard (`middlewares/authSeller.js`)**:
   - Validates that the active Clerk `userId` owns an approved and active `Store` record in the database before granting access to `/api/store/*`.
3. **Admin Guard (`app/api/admin/*`)**:
   - Compares the authenticated user's email against the secure server-side `ADMIN_EMAIL` environment variable.

---

## Deployment

### Deploying to Vercel

GoCart is optimized for zero-configuration continuous deployment on [Vercel](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the repository into the **Vercel Dashboard**.
3. In the project **Settings > Environment Variables**, supply all variables specified in the [Environment Variables](#environment-variables-reference) table.
4. Set the build settings to:
   - **Build Command:** `prisma generate && next build`
   - **Install Command:** `npm install`
5. Deploy. Vercel will build the application, generate Prisma client bindings, and deploy globally across Edge and Serverless regions.

---

## Roadmap & Future Enhancements

- [ ] **Multi-Currency Real-Time Conversion**: Automatic localization of product prices based on user IP geolocation.
- [ ] **Automated Merchant Payouts**: Integration with Stripe Connect for automatic vendor splits and commission transfers.
- [ ] **Elastic Full-Text Search**: Instant search and faceted filtering using Algolia or Meilisearch.
- [ ] **Real-Time Push & Email Notifications**: Automated order status notifications via Resend or Novu.
- [ ] **Order Return & Refund Portal**: Built-in resolution center for disputes and returns.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes with meaningful commit messages:
   ```bash
   git commit -m "feat: implement real-time stock alert"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a well-documented Pull Request.

Please review our [Contributing Guidelines](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## License

Distributed under the **MIT License**. See [`LICENSE.md`](./LICENSE.md) for full details.

---

## Author & Acknowledgments

**Pratyay Pratim Borah**

- **Portfolio Website:** [pratyaypratimborah.in](http://pratyaypratimborah.in/)
- **GitHub:** [@PratyayPB](https://github.com/PratyayPB)
- **LinkedIn:** [Pratyay Pratim Borah](https://www.linkedin.com/in/pratyaypratimborah/)

### Acknowledgments
- [Next.js Team at Vercel](https://nextjs.org/) for the App Router architecture.
- [Clerk](https://clerk.com/) for effortless identity management.
- [Neon](https://neon.tech/) & [Prisma](https://www.prisma.io/) for high-performance serverless persistence.
- [Inngest](https://www.inngest.com/) for reliable background execution.
- [Google Gemini](https://ai.google.dev/) for multimodal vision intelligence.
