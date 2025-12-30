# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
├─────────────────────────────────────────────────────────┤
│                    Next.js 15 App                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │            App Router (RSC)                      │   │
│  │  ┌────────────────────────────────────────────┐ │   │
│  │  │  Pages (Server Components)                 │ │   │
│  │  │  - page.tsx (Dashboard)                    │ │   │
│  │  │  - my-posts/page.tsx                       │ │   │
│  │  │  - trending/page.tsx                       │ │   │
│  │  │  - calendar/page.tsx                       │ │   │
│  │  │  - settings/page.tsx                       │ │   │
│  │  └────────────────────────────────────────────┘ │   │
│  │                                                  │   │
│  │  ┌────────────────────────────────────────────┐ │   │
│  │  │  Client Components                         │ │   │
│  │  │  - Sidebar                                 │ │   │
│  │  │  - TopBar                                  │ │   │
│  │  │  - ToneModal                               │ │   │
│  │  │  - PostPreview                             │ │   │
│  │  └────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Styling Layer                         │   │
│  │  - Tailwind CSS                                  │   │
│  │  - Custom animations                             │   │
│  │  - Dark mode support                             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              API Layer (To Be Implemented)               │
│  ┌──────────────────────────────────────────────────┐   │
│  │  API Routes (app/api/)                           │   │
│  │  - /api/generate     - AI generation             │   │
│  │  - /api/posts        - CRUD operations           │   │
│  │  - /api/schedule     - Scheduling                │   │
│  │  - /api/analytics    - Metrics                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                External Services                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   AI API    │  │  Database   │  │   n8n       │     │
│  │ OpenAI/     │  │ PostgreSQL/ │  │ Workflows   │     │
│  │ Anthropic   │  │  MongoDB    │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
easygen-claude/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Sidebar & TopBar
│   ├── page.tsx                 # Dashboard / Generate Post
│   ├── globals.css              # Global styles & animations
│   │
│   ├── my-posts/
│   │   └── page.tsx            # Post management
│   │
│   ├── trending/
│   │   └── page.tsx            # Trending posts feed
│   │
│   ├── saved/
│   │   └── page.tsx            # Saved posts
│   │
│   ├── calendar/
│   │   └── page.tsx            # Content calendar
│   │
│   ├── settings/
│   │   └── page.tsx            # User settings
│   │
│   ├── creators/
│   │   └── page.tsx            # Creator directory
│   │
│   ├── engagement/
│   │   └── page.tsx            # Analytics
│   │
│   └── api/                     # API routes (future)
│       ├── generate/
│       ├── posts/
│       ├── schedule/
│       └── analytics/
│
├── components/                   # Reusable components
│   ├── layout/
│   │   ├── Sidebar.tsx         # Main navigation
│   │   └── TopBar.tsx          # Top bar with search
│   │
│   ├── modals/
│   │   └── ToneModal.tsx       # Tone selection
│   │
│   └── post/
│       └── PostPreview.tsx     # Post preview
│
├── public/                       # Static assets
│   └── (images, icons, etc.)
│
├── styles/                       # Additional styles (if needed)
│
├── lib/                          # Utilities (future)
│   ├── db.ts                    # Database client
│   ├── ai.ts                    # AI service wrapper
│   └── utils.ts                 # Helper functions
│
├── types/                        # TypeScript types (future)
│   ├── post.ts
│   ├── user.ts
│   └── analytics.ts
│
├── hooks/                        # Custom React hooks (future)
│   ├── useAuth.ts
│   ├── usePosts.ts
│   └── useAnalytics.ts
│
├── config/                       # Configuration files
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── next.config.mjs
│
└── docs/                         # Documentation
    ├── README.md
    ├── QUICK_START.md
    ├── COMPONENT_GUIDE.md
    └── ARCHITECTURE.md
```

## Data Flow

### 1. Post Generation Flow

```
User Input (Topic + Tone)
    │
    ▼
Frontend Validation
    │
    ▼
API Call (/api/generate)
    │
    ▼
AI Service (OpenAI/Anthropic)
    │
    ▼
Post Processing
    │
    ▼
Return to Client
    │
    ▼
Display in PostPreview
    │
    ▼
Save to Database (optional)
```

### 2. Post Management Flow

```
User Action (Edit/Save/Delete)
    │
    ▼
Local State Update
    │
    ▼
API Call (/api/posts)
    │
    ▼
Database Operation
    │
    ▼
Success/Error Response
    │
    ▼
Toast Notification
    │
    ▼
UI Update
```

### 3. Scheduling Flow

```
User Selects Date/Time
    │
    ▼
Open Schedule Modal
    │
    ▼
Select Post & Confirm
    │
    ▼
API Call (/api/schedule)
    │
    ▼
Store in Database
    │
    ▼
Update Calendar View
    │
    ▼
Cron Job Publishes (future)
```

## State Management

### Current (Client-side)
- React `useState` for component state
- Props drilling for parent-child communication
- No global state management yet

### Recommended for Production
```typescript
// Option 1: Zustand (lightweight)
import create from 'zustand';

const useStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

// Option 2: Context API (built-in)
const PostContext = createContext();

// Option 3: Redux Toolkit (complex apps)
// For large-scale state management
```

## Routing

### App Router Structure
```
/                    → Dashboard (Generate Post)
/my-posts           → Post Management
/trending           → Trending Posts
/saved              → Saved Posts
/calendar           → Content Calendar
/settings           → User Settings
/creators           → Creator Directory
/engagement         → Analytics
```

### Dynamic Routes (future)
```
/posts/[id]         → Individual post view
/creators/[id]      → Creator profile
/analytics/[range]  → Custom analytics range
```

## Styling Architecture

### Tailwind Configuration
```typescript
// tailwind.config.ts
{
  theme: {
    extend: {
      colors: {
        primary: "#FF6B81",     // Coral pink
        "primary-dark": "#E55570"
      },
      borderRadius: {
        card: "16px"            // Consistent rounding
      },
      boxShadow: {
        soft: "...",            // Elevation levels
        medium: "...",
        hover: "..."
      }
    }
  }
}
```

### CSS Architecture
1. **Global Styles** (`globals.css`)
   - Base resets
   - Font imports
   - Animations

2. **Component Classes**
   - `.btn-primary`, `.btn-secondary`
   - `.card`
   - `.input-field`
   - `.tab-active`, `.tab-inactive`

3. **Utility Classes**
   - Tailwind utilities
   - Custom animations

## Component Architecture

### Layout Components
```
RootLayout
├── Sidebar (persistent)
├── TopBar (persistent)
└── Children (page content)
```

### Page Components
- Server Components by default
- Client Components when needed (`"use client"`)
- Composition over inheritance

### Reusable Components
- Props-based configuration
- TypeScript interfaces
- Consistent naming

## API Design (Future)

### RESTful Endpoints

```typescript
// Posts
GET    /api/posts          - List all posts
GET    /api/posts/:id      - Get single post
POST   /api/posts          - Create post
PUT    /api/posts/:id      - Update post
DELETE /api/posts/:id      - Delete post

// Generation
POST   /api/generate       - Generate post with AI
Body: {
  topic: string,
  tone: string,
  intensity: number,
  userId: string
}

// Scheduling
POST   /api/schedule       - Schedule post
Body: {
  postId: string,
  scheduledDate: Date,
  scheduledTime: string
}

// Analytics
GET    /api/analytics      - Get metrics
Query: {
  startDate: Date,
  endDate: Date,
  metrics: string[]
}

// Trending
GET    /api/trending       - Get trending posts
Query: {
  filter: string,
  outlierIndex: number,
  timeRange: string
}
```

### Response Format
```typescript
{
  success: boolean,
  data: any,
  error?: {
    code: string,
    message: string
  },
  meta?: {
    page: number,
    total: number
  }
}
```

## Database Schema (Recommended)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  linkedin_url VARCHAR,
  timezone VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  tone VARCHAR,
  status VARCHAR, -- draft, scheduled, published
  scheduled_at TIMESTAMP,
  published_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Analytics
CREATE TABLE analytics (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES posts(id),
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  reposts INT DEFAULT 0,
  views INT DEFAULT 0,
  date DATE,
  created_at TIMESTAMP
);

-- User Preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ai_tone TEXT,
  content_length VARCHAR,
  emoji_usage VARCHAR,
  hashtag_count VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Security Considerations

### Authentication
- Implement NextAuth.js
- Protect API routes
- Session management

### Authorization
- Role-based access control
- Resource ownership validation
- Rate limiting

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens

## Performance Optimization

### Current
- Next.js automatic optimizations
- Image optimization (next/image)
- Font optimization (next/font)
- CSS optimization (Tailwind)

### Recommended
1. **Server-Side Rendering**
   - Pre-render static pages
   - ISR for dynamic content

2. **Caching**
   - API response caching
   - CDN for static assets
   - Redis for sessions

3. **Code Splitting**
   - Dynamic imports
   - Route-based splitting
   - Component lazy loading

4. **Database**
   - Query optimization
   - Indexes on common queries
   - Connection pooling

## Deployment Architecture

### Recommended Stack
```
Frontend + API: Vercel
Database: Supabase / PlanetScale
Storage: AWS S3 / Cloudinary
AI: OpenAI / Anthropic
Monitoring: Sentry / LogRocket
Analytics: Plausible / PostHog
```

### Environment Variables
```env
# API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Services
AWS_S3_BUCKET=
REDIS_URL=

# Monitoring
SENTRY_DSN=
```

## Scalability

### Horizontal Scaling
- Stateless API design
- Load balancing
- CDN distribution

### Vertical Scaling
- Database optimization
- Caching layers
- Background jobs

### Microservices (future)
- AI generation service
- Publishing service
- Analytics service
- Notification service

## Monitoring & Logging

### Metrics to Track
- Page load times
- API response times
- Error rates
- User engagement
- AI generation success rate

### Tools
- Application monitoring (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (PostHog)
- Log aggregation (LogTail)

---

This architecture is designed to be:
- **Modular**: Easy to extend and modify
- **Scalable**: Ready for growth
- **Maintainable**: Clear structure and patterns
- **Modern**: Latest Next.js 15 features
- **Production-ready**: Best practices included
