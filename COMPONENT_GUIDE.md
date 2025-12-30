# Component Guide

Complete reference for all components and their usage in the EasyGen platform.

## 📐 Layout Components

### Sidebar (`components/layout/Sidebar.tsx`)
Main navigation sidebar with logo, menu items, and help section.

**Features:**
- Active route highlighting
- Icon + text menu items
- Sticky help card at bottom
- Smooth hover transitions

**Props:** None (uses `usePathname` hook)

**Menu Items:**
```typescript
- Generate Post (/)
- My Posts (/my-posts)
- Trending (/trending)
- Creators (/creators)
- Engagement (/engagement)
- Saved (/saved)
- Calendar (/calendar)
- Settings (/settings)
```

### TopBar (`components/layout/TopBar.tsx`)
Top navigation bar with search, notifications, and user menu.

**Features:**
- Search input
- Dark mode toggle
- Notification bell with badge
- User profile dropdown

**State:**
```typescript
darkMode: boolean
```

## 🎨 Modal Components

### ToneModal (`components/modals/ToneModal.tsx`)
Modal for selecting voice tone with custom tone option.

**Props:**
```typescript
interface ToneModalProps {
  selectedTone: string;
  onSelectTone: (tone: string) => void;
  onClose: () => void;
}
```

**Available Tones:**
1. Narrative - Storytelling
2. Visionary - Bold futures
3. Empathic - Vulnerability
4. Witty - Humor
5. Contrarian - Challenge
6. Leadership - Strategy
7. Educational - Teaching
8. Motivational - Energy
9. Analytical - Data
10. Provocative - Bold

**Custom Tone:**
- Text input for tone name
- Description textarea (optional)
- Apply button

## 📝 Post Components

### PostPreview (`components/post/PostPreview.tsx`)
Live preview of generated post content.

**Props:**
```typescript
interface PostPreviewProps {
  content: string;
  isGenerating: boolean;
}
```

**States:**
- Empty: Shows placeholder with icon
- Generating: Loading spinner
- Content: LinkedIn-style preview

**Actions:**
- Copy to clipboard
- Save draft
- Edit post
- Schedule post

## 📄 Pages

### 1. Generate Post (`app/page.tsx`)

**State Management:**
```typescript
activeTab: "your-topic" | "suggested"
topic: string
selectedFile: File | null
selectedTone: string
toneIntensity: number (0-100)
showToneModal: boolean
generatedPost: string
isGenerating: boolean
```

**Key Functions:**
- `handleFileUpload()` - Process media files
- `handleGeneratePost()` - Trigger AI generation
- `handleSuggestedTopic()` - Select from suggestions

**Validation:**
- Minimum 5 words for topic

### 2. My Posts (`app/my-posts/page.tsx`)

**Data Structure:**
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  date: Date;
  status: "draft" | "scheduled" | "published";
}
```

**Features:**
- List view with status badges
- Inline editor with live preview
- Character count
- Save and schedule actions

### 3. Trending (`app/trending/page.tsx`)

**Data Structure:**
```typescript
interface TrendingPost {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  outlierIndex: number;
  timeAgo: string;
}
```

**Filters:**
- Creator type
- Outlier index (95+, 85-94, <85)
- Time range (day, week, month, year)

**Actions:**
- Copy content
- Save post
- Repurpose post

### 4. Saved (`app/saved/page.tsx`)

**Empty State Features:**
- Decorative illustration
- Animated floating icons
- CTA to explore posts
- Quick tips section

**With Content:**
- Similar layout to My Posts
- Card-based grid

### 5. Calendar (`app/calendar/page.tsx`)

**State:**
```typescript
currentDate: Date
view: "week" | "month"
showScheduleModal: boolean
selectedDate: Date | null
selectedTime: string
scheduledPosts: Record<string, ScheduledPost[]>
```

**Features:**
- Weekly view (24 hours × 7 days)
- Navigate weeks with arrows
- Click slots to schedule
- Color-coded posts
- Export to CSV

**Schedule Modal:**
- Date picker
- Time picker
- Post selector
- Notes field

### 6. Settings (`app/settings/page.tsx`)

**Tabs:**
1. My Info
   - Profile photo upload
   - Name, email
   - LinkedIn URL
   - Timezone selector
   - Job description tags

2. Preferences
   - AI tone description
   - Content length (short/medium/long)
   - Emoji usage (minimal/moderate/frequent)
   - Hashtag count
   - Content guidelines checkboxes

**Form Data:**
```typescript
profileImage: string | null
name: string
email: string
linkedinUrl: string
timezone: string
jobDescription: string[]
aiTone: string
contentLength: string
emojiUsage: string
hashtagCount: string
```

### 7. Creators (`app/creators/page.tsx`)

**Display:**
- List of top creators
- Avatar with initials
- Name and role
- Follower count
- Engagement rate
- Follow button

### 8. Engagement (`app/engagement/page.tsx`)

**Metrics:**
- Total posts
- Total likes
- Comments
- Reposts

**Features:**
- Performance chart placeholder
- Top performing posts list
- Time range filter

## 🎨 Styling Classes

### Custom Tailwind Classes

**Buttons:**
```css
.btn-primary     - Primary CTA (coral pink)
.btn-secondary   - Secondary action (white/gray)
```

**Cards:**
```css
.card           - Standard card styling
```

**Inputs:**
```css
.input-field    - Form input styling
```

**Tabs:**
```css
.tab-active     - Active tab state
.tab-inactive   - Inactive tab state
```

### Animations

```css
.animate-fade-in     - Fade in animation
.animate-slide-up    - Slide up animation
.animate-scale-in    - Scale in animation
```

## 🔧 Utility Functions

### Date Formatting
```typescript
import { format } from "date-fns";

format(date, "MMM d, yyyy")     // Nov 11, 2025
format(date, "EEE")             // Mon
format(date, "yyyy-MM-dd")      // 2025-11-11
```

### Toast Notifications
```typescript
import toast from "react-hot-toast";

toast.success("Success message!");
toast.error("Error message!");
```

## 🎯 Component Patterns

### Modal Pattern
```typescript
const [showModal, setShowModal] = useState(false);

// Lock body scroll
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "unset";
  };
}, []);

// Render
{showModal && (
  <div className="fixed inset-0 z-50 ...">
    <div className="backdrop" onClick={onClose} />
    <div className="modal-content">...</div>
  </div>
)}
```

### Tab Pattern
```typescript
const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

<button
  onClick={() => setActiveTab("tab1")}
  className={activeTab === "tab1" ? "tab-active" : "tab-inactive"}
>
  Tab 1
</button>

{activeTab === "tab1" && <div>Tab 1 Content</div>}
```

### Card Hover Pattern
```typescript
<div className="card hover:scale-[1.02] transition-all">
  {/* Card content */}
</div>
```

## 📦 Adding New Components

### 1. Create Component File
```typescript
// components/new/MyComponent.tsx
"use client";

interface MyComponentProps {
  // props
}

export default function MyComponent({ }: MyComponentProps) {
  return (
    <div>
      {/* component */}
    </div>
  );
}
```

### 2. Import and Use
```typescript
import MyComponent from "@/components/new/MyComponent";

<MyComponent prop1="value" />
```

### 3. Add to Component Index
Update this guide with component documentation.

## 🧪 Testing Components

### Manual Testing Checklist
- [ ] Desktop responsive (1920px)
- [ ] Tablet responsive (768px)
- [ ] Mobile responsive (375px)
- [ ] Hover states work
- [ ] Animations are smooth
- [ ] Toast notifications appear
- [ ] Dark mode compatible
- [ ] Keyboard navigation works

## 🚀 Best Practices

1. **Use "use client" directive** for interactive components
2. **Implement proper TypeScript types** for all props
3. **Add loading states** for async operations
4. **Show user feedback** with toast notifications
5. **Make components responsive** with Tailwind breakpoints
6. **Add smooth transitions** for better UX
7. **Follow naming conventions** (PascalCase for components)
8. **Keep components focused** (single responsibility)
9. **Extract reusable logic** into custom hooks
10. **Add accessibility attributes** (aria-label, etc.)

---

This guide will help you understand, modify, and extend the EasyGen platform components. Keep it updated as you add new components!
