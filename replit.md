# PROXIMA - Guiding Minds, Guiding Forces

## Overview

PROXIMA is a professional educational and career counselling platform built by Ashu Manchanda, offering 22+ years of expertise in student guidance, career planning, and personal development. The application serves students, parents, and professionals across India with comprehensive counselling services, career assessments through Mentoria partnership, and educational workshops.

The platform is a full-stack web application designed with a focus on trust, professionalism, and approachability. It features service booking with integrated payment processing, consultation management, testimonials, blog content, and detailed information about counselling services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TailwindCSS for utility-first styling with custom design system
- Shadcn/ui component library (New York style variant) for consistent UI patterns
- Framer Motion for smooth animations and transitions
- React Hook Form with Zod validation for form management
- TanStack Query (React Query) for server state management

**Design System:**
- Custom color palette based on trustworthy blues and soft purples
- Typography using Inter and Poppins font families from Google Fonts
- Responsive grid layouts with mobile-first approach
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)
- CSS variables for theming with HSL color format
- Consistent spacing using Tailwind's 4px-based scale

**Application Structure:**
- Single-page application with smooth scroll navigation to sections
- Modular section-based components (Hero, About, Services, Testimonials, etc.)
- Reusable UI components from Shadcn library
- Sticky header with smooth scrolling navigation
- Modal-based booking flow for service purchases

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- ESM module system for modern JavaScript features
- Custom Vite integration for development hot module replacement
- HTTP server creation for WebSocket support (if needed)

**API Design:**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Error handling middleware with status codes and messages
- Request logging with timing information for API routes

**Storage Layer:**
- In-memory storage implementation (MemStorage class) using Map data structures
- Interface-based storage abstraction (IStorage) for future database migration
- UUID generation for entity IDs using crypto.randomUUID()
- Schema validation using Drizzle-Zod integration

**Data Models:**
- Users: Authentication and authorization (username/password)
- Consultations: Free consultation requests with status tracking
- Bookings: Paid service bookings linked to consultations
- Payments: Payment transaction records with Razorpay integration
- Testimonials: Client feedback with published/unpublished states
- Blog Articles: Content management with published/draft states

### Database Design

**ORM and Schema:**
- Drizzle ORM configured for PostgreSQL dialect
- Schema defined in TypeScript with type inference
- Migration system using drizzle-kit
- Neon serverless PostgreSQL driver for database connectivity

**Tables:**
- `users`: User authentication with unique usernames
- `consultations`: Free consultation requests with service type and status
- `bookings`: Service bookings with payment tracking and consultation references
- `payments`: Razorpay payment records with order/payment/signature tracking
- `testimonials`: Client testimonials with author info and publish status
- `blog_articles`: Blog content with slug-based URLs and publish dates

**Data Relationships:**
- Bookings reference consultations (optional foreign key)
- Payments reference bookings (foreign key)
- All tables use UUID primary keys with automatic generation

### External Dependencies

**Payment Processing:**
- Razorpay integration for Indian payment processing (INR currency)
- Payment flow: Create Order → Razorpay Checkout → Verify Signature → Update Status
- Service pricing defined in shared schema (₹2,500 - ₹15,000 range)
- Order verification using HMAC-SHA256 signature validation

**Third-Party Services:**
- Mentoria career guidance platform (partner integration mentioned in content)
- Google Fonts API for Inter and Poppins font families
- Razorpay Checkout.js loaded from CDN

**Development Tools:**
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)
- PostCSS with Autoprefixer for CSS processing
- ESBuild for production server bundling

**UI Component Library:**
- Radix UI primitives for accessible components (30+ component packages)
- Embla Carousel for image/content carousels
- Lucide React for consistent iconography
- React Day Picker for date selection
- CMDK for command menu functionality

**Validation and Type Safety:**
- Zod for runtime schema validation
- TypeScript for compile-time type checking
- Drizzle-Zod for automatic schema-to-Zod conversion
- React Hook Form resolvers for form validation integration

**Utilities:**
- date-fns for date formatting and manipulation
- clsx and tailwind-merge for className composition
- class-variance-authority for component variant management
- nanoid for unique ID generation