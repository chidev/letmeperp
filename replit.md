# Overview

This is a "Let Me Perplexity That For You" web application - a playful tool that creates shareable URLs for Perplexity AI searches. Users can enter search queries, generate shareable links, and preview animated redirections to Perplexity. The app mimics the concept of "Let me Google that for you" but for Perplexity AI, complete with social sharing capabilities and a polished dark theme interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Vite Build System**: Fast development server and optimized production builds with HMR support
- **Wouter Router**: Lightweight client-side routing for navigation between home and preview pages
- **shadcn/ui Components**: Comprehensive UI component library built on Radix primitives with Tailwind CSS
- **Tailwind CSS**: Utility-first styling with custom Perplexity-themed color palette and responsive design
- **TanStack Query**: Server state management for API calls and caching

## Backend Architecture
- **Express.js Server**: RESTful API server handling URL generation and redirect endpoints
- **Node.js with ES Modules**: Modern JavaScript runtime with native module support
- **TypeScript Configuration**: Shared types between client and server via `/shared` directory
- **In-Memory Storage**: Simple storage implementation for user data (easily extensible to database)

## Key Features
- **URL Generation**: Creates shareable links with encoded search queries
- **Animated Preview**: Step-by-step animation showing how to search on Perplexity
- **Social Sharing**: Integration with Twitter, Facebook, WhatsApp, and email
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Dark Theme**: Perplexity-inspired color scheme with orange accents

## Data Flow
1. User enters search query in form component
2. Frontend generates shareable URL via `/api/generate-url` endpoint
3. Preview mode triggers animated sequence before redirecting to Perplexity
4. Social sharing components create platform-specific share URLs

## Database Schema
Currently uses in-memory storage with a simple user schema (id, username, password) defined in Drizzle ORM format. The schema is prepared for PostgreSQL migration when needed.

# External Dependencies

## Core Framework Dependencies
- **React & ReactDOM**: Frontend UI framework
- **Express**: Web server framework
- **TypeScript**: Type safety across the application
- **Vite**: Build tool and development server

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Framer Motion**: Animation library for preview sequences

## Data Management
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form validation and management
- **Drizzle ORM**: Database toolkit (prepared for PostgreSQL)
- **Zod**: Schema validation

## Development Tools
- **Drizzle Kit**: Database migration tool
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS & Autoprefixer**: CSS processing tools

## External Services
- **Perplexity AI**: Target search engine for redirects
- **Social Media APIs**: Twitter, Facebook, WhatsApp sharing
- **Neon Database**: PostgreSQL hosting (configured but not required)

## Replit Integration
- **Replit-specific plugins**: Development banner and error modal for Replit environment
- **Cartographer**: Replit's development tools integration