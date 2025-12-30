# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages Overview

### Main Features

| Page | Route | Description |
|------|-------|-------------|
| **Generate Post** | `/` | AI-powered content generation with tone selection |
| **My Posts** | `/my-posts` | Manage drafts and scheduled posts |
| **Trending** | `/trending` | Discover high-performing content |
| **Saved** | `/saved` | Your bookmarked posts |
| **Calendar** | `/calendar` | Schedule content with weekly view |
| **Settings** | `/settings` | Profile and AI preferences |
| **Creators** | `/creators` | Top content creators directory |
| **Engagement** | `/engagement` | Analytics and metrics |

## 🎨 Key Features to Try

### 1. Generate a Post
- Click "Your Topic" tab
- Enter a topic (minimum 5 words)
- Click "Voice Tone" to select from 10+ tones
- Adjust tone intensity with the slider
- Click "Generate Post"
- See live preview on the right

### 2. Tone Selection
Available tones:
- 📖 Narrative - Compelling storytelling
- 🔮 Visionary - Bold futures
- 💙 Empathic - Authentic vulnerability
- 😄 Witty - Clever humor
- 🎯 Contrarian - Challenge assumptions
- 👑 Leadership - Strategic insight
- 🎓 Educational - Structured learning
- 🚀 Motivational - Energetic optimism
- 📊 Analytical - Data-driven
- ⚡ Provocative - Bold statements

### 3. Manage Posts
- View all drafts in "My Posts"
- Click any post to edit
- Real-time preview as you type
- Save or schedule for publishing

### 4. Schedule Content
- Navigate to Calendar
- Click any time slot
- Select post and set time
- Export calendar to CSV

### 5. Customize Settings
- Upload profile photo
- Set LinkedIn URL
- Choose timezone
- Select job descriptions
- Fine-tune AI preferences

## 🎯 Next Steps

### For Development
1. **Add Backend API**
   - Create API routes in `app/api/`
   - Connect to AI service (OpenAI, Claude, etc.)
   - Add database (PostgreSQL, MongoDB, etc.)

2. **Implement Authentication**
   - Use NextAuth.js
   - Add protected routes
   - User session management

3. **Deploy**
   - Vercel (recommended)
   - Netlify
   - AWS / Digital Ocean

### For Backend Integration

Create these API endpoints:
```typescript
// AI Generation
POST /api/generate
Body: { topic, tone, intensity }

// Post Management
GET    /api/posts
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id

// Scheduling
POST /api/schedule
Body: { postId, scheduledDate, scheduledTime }

// Analytics
GET /api/analytics
Query: { startDate, endDate }
```

### Environment Variables
Create a `.env.local` file:
```env
# AI Service
OPENAI_API_KEY=your_key_here
# or
ANTHROPIC_API_KEY=your_key_here

# Database
DATABASE_URL=your_database_url

# Auth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🛠 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript errors
```

## 💡 Tips

1. **Responsive Design**: The app is fully responsive. Try resizing your browser!

2. **Dark Mode**: Click the moon icon in the top bar (infrastructure ready)

3. **Keyboard Shortcuts**:
   - Tab through forms for quick navigation
   - Enter to submit in input fields

4. **Toast Notifications**: All actions show feedback via toast notifications

5. **Empty States**: Check "Saved Posts" for a beautiful empty state design

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

## 🎉 Ready to Build!

Your EasyGen platform is ready to use. Start generating content, explore the features, and customize it to match your needs.

For questions or issues, check the main README.md or create an issue in the repository.

Happy building! 🚀
