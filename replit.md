# Replit.md

## Overview

This is a modern full-stack web application for mental health support, featuring a chat interface designed to provide empathetic conversations. The application is built as a React frontend with an Express.js backend, using TypeScript throughout for type safety.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for a calming mental health theme
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Build**: ESBuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Chat System
- **Session Management**: UUID-based session tracking for anonymous conversations
- **Message Storage**: Persistent conversation history with user/assistant role tracking
- **Real-time Interface**: Responsive chat UI with typing indicators and smooth scrolling

### Mental Health Features
- **Crisis Resources**: Dedicated modal with emergency contacts and support resources
- **Conversation Starters**: Pre-defined prompts to help users begin conversations
- **Empathetic Design**: Calming color palette and gentle animations

### UI/UX Components
- **Design System**: Comprehensive component library with consistent theming
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: ARIA-compliant components with keyboard navigation support

## Data Flow

1. **Session Initialization**: Client generates unique session ID on page load
2. **Message Flow**: User messages trigger API calls to `/api/chat` endpoint
3. **Storage Pattern**: Messages stored with conversation context and session tracking
4. **Response Handling**: Server processes messages and returns appropriate responses
5. **UI Updates**: React Query manages cache invalidation and real-time UI updates

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **Build Tools**: Vite, TypeScript, ESBuild
- **Database**: Drizzle ORM, Neon Database serverless driver

### UI/Design Dependencies
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS for processing
- **Icons**: Lucide React for consistent iconography
- **Animations**: CSS animations with Tailwind utilities

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Date Handling**: date-fns for date formatting and manipulation

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR and TypeScript checking
- **Database**: In-memory storage for rapid iteration
- **Environment**: Node.js with environment variable configuration

### Production Build
- **Frontend**: Vite build process outputs optimized static assets
- **Backend**: ESBuild bundles server code for Node.js deployment
- **Database**: PostgreSQL with Drizzle migrations for schema management
- **Static Assets**: Served through Express with proper caching headers

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Management**: In-memory storage with plans for database persistence
- **Build Optimization**: Separate client and server build processes

The application follows a monorepo structure with shared TypeScript schemas, enabling type safety across the full stack while maintaining clear separation between client and server concerns.

## Recent Changes (July 20, 2025)

### Visual Enhancements Completed
- ✓ Enhanced UI with glassmorphism effects, neon glows, and animated backgrounds
- ✓ Added animated gradient particles and modern visual effects
- ✓ Implemented text gradients and improved color schemes
- ✓ Enhanced message bubbles with glass effects and improved shadows
- ✓ Added rotating gradient animations and improved button interactions

### AI Integration Status
- ✓ Configured OpenRouter API integration with secure backend implementation
- ✓ Implemented fallback responses with therapeutic language for connection issues
- ⚠️ Currently troubleshooting OpenRouter model availability (testing different free models)
- ✓ Enhanced error handling with empathetic fallback responses

### Current Focus Areas
- Finalizing working AI model integration with OpenRouter free tier
- Optimizing visual effects and animations for better user experience