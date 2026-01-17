# Reepost.ai - AI-Powered LinkedIn Content Generator

A modern SaaS platform for generating viral LinkedIn posts using AI. Create, schedule, and manage professional content effortlessly.

![Reepost.ai Platform](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## Features

### Core Functionality
- **AI Content Generation** - Generate engaging posts with customizable voice tones
- **Post Management** - Draft, edit, and organize your content library
- **Content Calendar** - Schedule posts with a visual weekly calendar
- **Trending Discovery** - Browse high-performing posts with outlier index metrics
- **Creator Network** - Follow and learn from top content creators
- **Engagement Analytics** - Track performance metrics and insights

### Design Highlights
- Clean, modern interface with soft shadows and rounded corners
- Green (#00be61) accent color for CTAs and highlights
- Responsive grid layout for mobile and desktop
- Smooth animations and transitions
- Toast notifications for user feedback
- Dark mode infrastructure ready

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd repost-ai-io
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
repost-ai-io/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Dashboard / Generate Post
│   ├── my-posts/            # Post management
│   ├── trending/            # Trending posts feed
│   ├── saved/               # Saved posts
│   ├── calendar/            # Content calendar
│   ├── settings/            # User settings
│   ├── creators/            # Creator directory
│   ├── engagement/          # Analytics
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── modals/              # Modal components
│   │   └── ToneModal.tsx
│   └── post/                # Post-related components
│       └── PostPreview.tsx
├── public/                   # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Key Pages

### 1. Generate Post (`/`)
- Two tabs: "Your Topic" and "Suggested Topics"
- File upload for media (images, audio, documents)
- Topic input with word count validation
- Voice tone selector with custom tone option
- Tone intensity slider
- Real-time post preview
- Generate and save functionality

### 2. My Posts (`/my-posts`)
- List of draft and scheduled posts
- In-line post editor
- Real-time preview
- Save and schedule actions

### 3. Trending Posts (`/trending`)
- Masonry grid layout
- Filter by creator type, outlier index, and time range
- Engagement metrics (likes, comments, reposts)
- Copy, save, and repurpose actions

### 4. Calendar (`/calendar`)
- Weekly view with hourly slots
- Schedule posts with date/time picker
- Color-coded scheduled posts
- Export to CSV functionality

### 5. Settings (`/settings`)
- Profile information management
- LinkedIn integration
- Job description tags
- AI tone and style preferences
- Content guidelines

## Customization

### Color Theme
Update the primary colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: "#00be61",          // Main accent color
  "primary-dark": "#00a854",   // Hover state
  // ... other colors
}
```

### Voice Tones
Add or modify tones in `components/modals/ToneModal.tsx`:
```typescript
const tones = [
  {
    name: "Your Tone",
    emoji: "🎯",
    description: "Your description",
    color: "bg-color-class",
  },
  // ... more tones
];
```

## Backend Integration

This application is designed for easy backend integration:

1. **API Routes**: Add API routes in `app/api/`
2. **n8n Webhooks**: Configure webhook endpoints for AI generation
3. **Database**: Add Prisma or your preferred ORM
4. **Authentication**: Integrate NextAuth.js or similar

### Suggested Backend Hooks
- `POST /api/generate` - AI post generation
- `POST /api/posts` - Save draft post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/schedule` - Schedule post
- `GET /api/trending` - Fetch trending posts
- `GET /api/analytics` - Get engagement data

## Dark Mode

Dark mode infrastructure is ready. Toggle implementation in `components/layout/TopBar.tsx`:

```typescript
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
};
```

For persistent dark mode, store the preference in localStorage or database.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from Notion and Figma
- Icons from [Lucide](https://lucide.dev)
- Fonts from Google Fonts (Inter & Poppins)

## Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ using Next.js and TypeScript
