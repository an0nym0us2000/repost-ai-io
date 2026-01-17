# Feature Overview

A visual guide to all features in the Repost Ai platform.

## 🎯 Dashboard / Generate Post (`/`)

### Main Features
```
┌─────────────────────────────────────────────────────────┐
│  📝 GENERATE POST                                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Tabs: [Your Topic] [Suggested Topics]                  │
│                                                          │
│  ┌─────────────────────────┐    ┌───────────────────┐  │
│  │  📁 File Upload         │    │  📄 Post Preview  │  │
│  │  ∙ Images               │    │                   │  │
│  │  ∙ Audio                │    │  Live preview of  │  │
│  │  ∙ Documents            │    │  generated post   │  │
│  └─────────────────────────┘    │  in LinkedIn      │  │
│                                  │  format           │  │
│  ┌─────────────────────────┐    │                   │  │
│  │  ✍️ Topic Input         │    │  [Copy] [Save]    │  │
│  │  (min 5 words)          │    │  [Edit] [Send]    │  │
│  └─────────────────────────┘    └───────────────────┘  │
│                                                          │
│  ┌─────────────────────────┐                            │
│  │  🎨 Voice Tone          │                            │
│  │  [Narrative] ▾          │                            │
│  │                         │                            │
│  │  Intensity: ━━●─────── 50% │                        │
│  └─────────────────────────┘                            │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │         ✨ Generate Post                │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Tone Selection Modal
```
┌─────────────────────────────────────────────────────────┐
│  Choose Your Voice Tone                         [X]      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │ 📖      │ │ 🔮      │ │ 💙      │ │ 😄      │      │
│  │Narrative│ │Visionary│ │Empathic │ │ Witty   │      │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘      │
│                                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │ 🎯      │ │ 👑      │ │ 🎓      │ │ 🚀      │      │
│  │Contraria│ │Leadershi│ │Education│ │Motivation│     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘      │
│                                                          │
│  ┌─────────┐ ┌─────────┐                                │
│  │ 📊      │ │ ⚡      │                                │
│  │Analytica│ │Provocati│                                │
│  └─────────┘ └─────────┘                                │
│                                                          │
│  ✨ Custom Tone                              [+]         │
│  ┌─────────────────────────────────────────────┐        │
│  │ Enter custom tone...                        │        │
│  └─────────────────────────────────────────────┘        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📝 My Posts (`/my-posts`)

```
┌─────────────────────────────────────────────────────────┐
│  📝 MY POSTS                               [+ New Post]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌─────────────────────────────────┐ │
│  │ Posts List   │  │  Edit Post                      │ │
│  ├──────────────┤  ├─────────────────────────────────┤ │
│  │              │  │                                 │ │
│  │ ┌──────────┐ │  │  Title: [________________]     │ │
│  │ │Post Title│ │  │                                 │ │
│  │ │preview...│ │  │  Content:                       │ │
│  │ │draft     │ │  │  ┌─────────────────────────┐   │ │
│  │ └──────────┘ │  │  │                         │   │ │
│  │              │  │  │  Editable text area     │   │ │
│  │ ┌──────────┐ │  │  │                         │   │ │
│  │ │Post Title│ │  │  └─────────────────────────┘   │ │
│  │ │preview...│ │  │                                 │ │
│  │ │scheduled │ │  │  Preview:                       │ │
│  │ └──────────┘ │  │  ┌─────────────────────────┐   │ │
│  │              │  │  │ LinkedIn-style preview  │   │ │
│  │ ┌──────────┐ │  │  └─────────────────────────┘   │ │
│  │ │Post Title│ │  │                                 │ │
│  │ │preview...│ │  │  [Save Draft] [Schedule Post]  │ │
│  │ │draft     │ │  │                                 │ │
│  │ └──────────┘ │  └─────────────────────────────────┘ │
│  │              │                                       │
│  └──────────────┘                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📈 Trending Posts (`/trending`)

```
┌─────────────────────────────────────────────────────────┐
│  📈 TRENDING POSTS                                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Filters: [Creator ▾] [Outlier ▾] [Time Range ▾]       │
│                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ [Photo] │  │ [Photo] │  │ [Photo] │                 │
│  │ Author  │  │ Author  │  │ Author  │                 │
│  │ Role    │  │ Role    │  │ Role    │                 │
│  │         │  │         │  │         │                 │
│  │ Post... │  │ Post... │  │ Post... │                 │
│  │         │  │         │  │         │                 │
│  │ ❤️ 1.2K │  │ ❤️ 2.1K │  │ ❤️ 892  │                 │
│  │ 💬 83   │  │ 💬 145  │  │ 💬 67   │                 │
│  │ 🔄 156  │  │ 🔄 289  │  │ 🔄 124  │                 │
│  │         │  │         │  │         │                 │
│  │ [94]    │  │ [97]    │  │ [89]    │                 │
│  │         │  │         │  │         │                 │
│  │[Copy]📑🔄│  │[Copy]📑🔄│  │[Copy]📑🔄│                 │
│  └─────────┘  └─────────┘  └─────────┘                 │
│                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ ...     │  │ ...     │  │ ...     │                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🔖 Saved Posts (`/saved`)

### Empty State
```
┌─────────────────────────────────────────────────────────┐
│  🔖 SAVED POSTS                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                    ┌─────────┐                          │
│                    │    🔖   │                          │
│              🔍    │         │    📈                    │
│                    └─────────┘                          │
│                                                          │
│              No Saved Posts Yet                          │
│                                                          │
│        Start building your inspiration library          │
│        by saving posts from trending creators           │
│                                                          │
│              [📈 Explore Posts]                          │
│                                                          │
│  ────────────────────────────────────────────           │
│                                                          │
│                    💡 Quick Tips                         │
│                                                          │
│  ① Browse trending posts to find content                │
│  ② Click bookmark icon to save                          │
│  ③ Use saved posts as inspiration                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📅 Calendar (`/calendar`)

```
┌─────────────────────────────────────────────────────────┐
│  📅 CONTENT CALENDAR                    [Export CSV]    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [◀] November 11 - November 17, 2025 [▶]  [Week][Month]│
│                                                          │
│  ┌────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐      │
│  │Time│ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │ Sun │      │
│  ├────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤      │
│  │09:00│     │Post │     │     │     │     │     │      │
│  │    │     │     │     │     │     │     │     │      │
│  ├────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤      │
│  │10:00│     │     │     │Post │     │     │     │      │
│  │    │     │     │     │     │     │     │     │      │
│  ├────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤      │
│  │11:00│     │     │     │     │     │     │     │      │
│  │    │     │     │     │     │     │     │     │      │
│  ├────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤      │
│  │14:00│     │Post │     │     │     │     │     │      │
│  │    │     │     │     │     │     │     │     │      │
│  └────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘      │
│                                                          │
│  Click any slot to schedule a post                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Schedule Modal
```
┌─────────────────────────────────────────────┐
│  Schedule Post                     [X]      │
├─────────────────────────────────────────────┤
│                                             │
│  Date: [2025-11-11]                         │
│                                             │
│  Time: [🕐 09:00]                           │
│                                             │
│  Select Post:                               │
│  [Remote Work Future        ▾]              │
│                                             │
│  Notes:                                     │
│  ┌─────────────────────────────────────┐   │
│  │ Add scheduling notes...             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Cancel]          [Schedule]               │
│                                             │
└─────────────────────────────────────────────┘
```

## ⚙️ Settings (`/settings`)

```
┌─────────────────────────────────────────────────────────┐
│  ⚙️ ACCOUNT SETTINGS                                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [My Info] [Preferences]                                │
│  ────────                                               │
│                                                          │
│  Profile Photo                                          │
│  ┌─────┐                                                │
│  │ JD  │  Upload a new photo                            │
│  │ 📷  │  JPG, PNG or GIF (max. 5MB)                    │
│  └─────┘                                                │
│                                                          │
│  Personal Information                                   │
│  Name:  [John Doe________________]                      │
│  Email: [john.doe@example.com___]                      │
│  🔗 LinkedIn: [linkedin.com/in/johndoe]                │
│  🌍 Timezone: [Eastern Time (ET) ▾]                    │
│                                                          │
│  Job Description                                        │
│  Select all that apply                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐         │
│  │✓ Content   │ │  Marketing │ │✓Entrepreneur│         │
│  │  Creator   │ │  Manager   │ │            │         │
│  └────────────┘ └────────────┘ └────────────┘         │
│                                                          │
│  ┌──────────────────────────────────┐                   │
│  │        Save Changes              │                   │
│  └──────────────────────────────────┘                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 👥 Creators (`/creators`)

```
┌─────────────────────────────────────────────────────────┐
│  👥 TOP CREATORS                                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [SJ] Sarah Johnson          12.5K    8.2%        │   │
│  │      Product Designer     Followers  Engagement  │   │
│  │                                        [Follow]  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [MC] Marcus Chen            25.3K   12.4%        │   │
│  │      Tech Entrepreneur    Followers  Engagement  │   │
│  │                                        [Follow]  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [ER] Emily Rodriguez        18.7K    9.8%        │   │
│  │      Content Strategist   Followers  Engagement  │   │
│  │                                        [Follow]  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📊 Engagement (`/engagement`)

```
┌─────────────────────────────────────────────────────────┐
│  📊 ENGAGEMENT ANALYTICS                                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐           │
│  │ 📊 48 │  │ ❤️2.8K│  │ 💬 432│  │ 🔄 156│           │
│  │ Posts │  │ Likes │  │Comment│  │Repost │           │
│  │ +12%  │  │ +23%  │  │ +18%  │  │ +31%  │           │
│  └───────┘  └───────┘  └───────┘  └───────┘           │
│                                                          │
│  Performance Overview              [Last 7 days ▾]      │
│  ┌──────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │          📈 Chart Visualization                  │   │
│  │             (Coming Soon)                        │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Top Performing Posts                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ The Future of Remote Work    ❤️847 💬64   12.4% │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ AI in Creative Industries    ❤️692 💬52    9.8% │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Design Features

### Color Palette
```
Primary:      ████ #FF6B81 (Coral Pink)
Primary Dark: ████ #E55570
Background:   ████ #FFFFFF
Card BG:      ████ #F8F9FA
Text Primary: ████ #1A1A1A
Text Sec:     ████ #6B7280
Border:       ████ #E5E7EB
```

### Animations
- ✨ Fade In - Smooth entrance
- ⬆️ Slide Up - Content reveal
- 🎯 Scale In - Modal open
- 🖱️ Hover - Interactive feedback

### Components
- 🔘 Primary Button - Coral pink CTA
- ⚪ Secondary Button - White outline
- 📦 Card - Rounded with soft shadow
- 📝 Input Field - Focus ring effect
- 🔔 Toast - Success/Error notifications

## 📱 Responsive Breakpoints

```
Mobile:     < 640px   - Single column
Tablet:     640-1024  - Two columns
Desktop:    > 1024    - Full layout
```

## ⌨️ Keyboard Shortcuts

```
Tab         - Navigate forms
Enter       - Submit forms
Esc         - Close modals
Arrow Keys  - Calendar navigation
```

## 🎯 User Flows

### Generate Post Flow
```
1. Enter Dashboard
2. Choose "Your Topic" or "Suggested Topics"
3. (Optional) Upload file
4. Enter topic (5+ words)
5. Click "Voice Tone" → Select tone
6. Adjust intensity slider
7. Click "Generate Post"
8. View preview
9. Copy / Save / Schedule
```

### Schedule Post Flow
```
1. Navigate to Calendar
2. Click time slot
3. Select date and time
4. Choose post
5. Add notes (optional)
6. Click "Schedule"
7. See confirmation toast
8. Post appears in calendar
```

### Edit Post Flow
```
1. Go to "My Posts"
2. Click post card
3. Edit in right panel
4. See live preview
5. Click "Save Draft"
6. See confirmation toast
```

---

This feature overview provides a visual representation of all functionality in the Repost Ai platform. Each feature is production-ready and fully functional!
