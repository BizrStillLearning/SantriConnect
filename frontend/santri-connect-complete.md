# 🚀 SANTRI CONNECT LANDING PAGE - PROFESSIONAL VIBE CODE PROMPT

**Comprehensive, Production-Ready Frontend Prompt untuk Membangun Modern Landing Page & Web Application**

---

## 📌 EXECUTIVE SUMMARY

Dokumentasi ini berisi prompt lengkap dan terstruktur untuk membangun Santri Connect - sebuah platform modern yang dirancang untuk membantu pesantren (Islamic boarding schools) dalam mengelola data santri, melacak kehadiran, dan menganalisis performa akademik. Aplikasi ini menggabungkan landing page yang elegan dengan aplikasi manajemen yang powerful, semuanya dibangun dengan React, TypeScript, dan Tailwind CSS.

Prompt ini telah dioptimalkan untuk Vibe Code workflows dan siap digunakan di platform seperti Cursor, Claude, ChatGPT, atau Replit Agent. Setiap bagian dirancang untuk menghasilkan kode production-ready dengan struktur yang scalable dan maintainable.

---

## 🎯 PROJECT CONTEXT & POSITIONING

### Target Audience

**Primary Users:**
- **Administrators/Directors**: Memerlukan dashboard komprehensif untuk monitoring keseluruhan pesantren
- **Teachers/Ustadz**: Perlu tools untuk mencatat absensi santri dan monitoring performa
- **Support Staff**: Membutuhkan interface intuitif untuk manage data santri dan dormitory assignments

**Secondary Users:**
- Parents/Guardians: Optional feature untuk melihat performa anak mereka
- Finance/Accounting: Reporting dan analytics untuk billing purposes

### Project Philosophy

Anda adalah **senior full-stack web engineer** dengan deep expertise dalam:
- **Building enterprise-grade React applications** dengan TypeScript untuk type safety maksimal
- **Creating premium, modern UI/UX** dengan design systems yang scalable dan konsisten
- **Implementing complex data management patterns** termasuk state management, data fetching, caching, dan synchronization
- **RESTful API integration strategies** yang robust dengan proper error handling dan retry logic
- **Responsive design principles** menggunakan mobile-first approach dengan proper breakpoints dan touch targets
- **Performance optimization** melalui code splitting, lazy loading, memoization, dan efficient rendering
- **Accessibility standards** termasuk ARIA labels, keyboard navigation, dan semantic HTML
- **Modern animation frameworks** untuk subtle, professional micro-interactions yang enhance UX tanpa mengganggu performa

---

## 🏗️ ARCHITECTURAL OVERVIEW

### Application Structure

Santri Connect terdiri dari dua komponen utama yang terintegrasi seamlessly:

#### **1. Public-Facing Landing Page**
Halaman pertama yang dilihat pengunjung, berfungsi sebagai:
- Product showcase yang compelling
- Value proposition yang clear
- User testimonials dan case studies
- Call-to-action untuk sign-up/login
- Information hub tentang features dan benefits

#### **2. Internal Management Dashboard**
Web application yang powerful untuk:
- Real-time monitoring dashboard dengan metrics dan charts
- Complete CRUD operations untuk data santri
- Attendance tracking dengan bulk operations
- Dormitory management dan resource allocation
- Comprehensive reporting dan analytics
- User management dan role-based access control

### Technology Stack Rationale

Setiap technology dipilih berdasarkan maturity, community support, AI training data availability, dan performa:

```
FRONTEND LAYER:
├── React 18.2+ (dengan Concurrent Features)
│   └── Modern component architecture dengan Hooks
│
├── TypeScript 5.0+
│   └── Type safety untuk reducsi bugs dan improved DX
│
├── React Router v6+
│   └── Client-side routing dengan nested routes dan lazy loading
│
├── Tailwind CSS 3.4+
│   └── Utility-first CSS untuk konsistensi dan maintainability
│
├── Zustand (State Management)
│   └── Lightweight alternative ke Redux, perfect untuk mid-size apps
│
├── React Query / TanStack Query
│   └── Server state management dengan automatic caching dan synchronization
│
├── Axios (HTTP Client)
│   └── Promise-based HTTP requests dengan interceptors dan error handling
│
├── Framer Motion (Animations)
│   └── Production-ready animation library dengan performance optimizations
│
├── Lucide React (Icons)
│   └── Modern, scalable SVG icon library dengan 400+ icons
│
├── React Hook Form + Zod (Form Management)
│   └── Performant form handling dengan type-safe validation
│
├── Recharts (Data Visualization) - OPTIONAL
│   └── React charts library untuk dashboard visualizations
│
└── Sonner / React Toastify (Notifications)
    └── Toast notifications untuk user feedback

BUILD & TOOLING:
├── Vite (Build Tool)
│   └── Lightning-fast HMR dan bundling
│
├── npm/pnpm (Package Manager)
│   └── Dependency management
│
├── Git (Version Control)
│   └── Source code management dengan proper workflows
│
└── Environment Variables (.env files)
    └── Configuration management per environment

DEPLOYMENT OPTIONS:
├── Vercel (Recommended)
│   └── Seamless React deployment dengan auto-scaling
│
├── Netlify
│   └── Alternative dengan good DX dan CI/CD integration
│
├── GitHub Pages
│   └── Static hosting untuk landing page atau frontend-only apps
│
└── Self-hosted (Docker)
    └── Maximum control dan cost optimization
```

---

## 🎨 COMPREHENSIVE DESIGN SYSTEM

### Color Palette (Premium Dark Theme)

Setiap color dipilih untuk menciptakan impressi premium, professional, dan accessible:

```
PRIMARY BACKGROUND COLORS:
┌─ Primary Background: #0f1419
│  └─ Very dark navy/charcoal untuk main app background
│     └─ Sufficient contrast untuk text readability
│
├─ Secondary Background: #1a202c
│  └─ Slightly lighter untuk secondary sections dan cards
│     └─ Creates subtle depth dan visual hierarchy
│
└─ Tertiary Background: #242e3e
   └─ Elevated surfaces untuk modals, dropdowns, dan popovers
      └─3-level hierarchy creates visual depth

ACCENT COLORS (PRIMARY ACTIONS):
┌─ Primary Accent: #06b6d4 (Cyan/Teal)
│  └─ Used untuk: Primary buttons, active states, important links
│     └─ High contrast dengan dark backgrounds
│     └─ Professional dan modern feel
│
├─ Secondary Accent: #d4af37 (Gold)
│  └─ Used untuk: Premium highlights, badges, special emphasis
│     └─ Conveys luxury dan elegance
│     └─ Sparingly untuk maintain impact
│
└─ Tertiary: #0891b2 (Darker Teal)
   └─ Hover states untuk primary accent
      └─ Maintains consistency dalam interaction patterns

SEMANTIC COLORS:
┌─ Success: #10b981 (Green)
│  └─ Positive actions, confirmations, completed states
│
├─ Warning: #f59e0b (Amber)
│  └─ Caution, pending actions, requires attention
│
├─ Danger: #ef4444 (Red)
│  └─ Destructive actions, errors, critical alerts
│
└─ Info: #3b82f6 (Blue)
   └─ Informational messages, neutral notifications

TEXT COLORS:
┌─ Primary Text: #f8fafc (Almost White, #F8FAFC)
│  └─ Main body text dan headings
│     └─ Excellent contrast ratio (>7:1) terhadap dark background
│
├─ Secondary Text: #cbd5e1 (Light Gray, #CBD5E1)
│  └─ Secondary information, subheadings, descriptions
│     └─ Still maintain sufficient contrast (>4.5:1)
│
└─ Muted Text: #94a3b8 (Dark Gray, #94A3B8)
   └─ Metadata, timestamps, disabled states
      └─ Muted untuk tidak mengalihkan attention

NEUTRAL GRAYS (Untuk Borders, Dividers, Backgrounds):
├─ Border Color: #334155 (Slightly lighter dark gray)
│  └─ Used untuk subtle borders dan dividers
│
├─ Hover State: #475569
│  └─ Interactive elements hover background
│
└─ Disabled State: #1e293b dengan opacity
   └─ Disabled form fields dan buttons

GRADIENTS (MINIMAL, PROFESSIONAL):
┌─ Hero Gradient (Subtle)
│  └─ From: #0f1419 To: #1a202c
│     └─ Gentle depth bez overwhelming visual noise
│
├─ Accent Gradient (Premium Feel)
│  └─ From: #06b6d4 To: #0891b2
│     └─ Used sparingly untuk CTA buttons or special sections
│
└─ Overlay Gradient
   └─ Black dengan opacity untuk image overlays
      └─ Ensures text readability terhadap background images
```

### Typography System

```
FONT FAMILY:
┌─ Primary: Inter, Poppins, atau SF Pro (Sans-Serif)
│  └─ Modern, clean, excellent readability
│
└─ Mono: "Courier New", monospace untuk code snippets
   └─ Used sparingly dalam examples atau technical documentation

HEADING HIERARCHY:
┌─ H1 (Page Titles)
│  ├─ Size: 36px (desktop) / 24px (mobile)
│  ├─ Weight: 700 (Bold)
│  └─ Letter Spacing: -0.02em (Tight)
│
├─ H2 (Section Titles)
│  ├─ Size: 28px (desktop) / 20px (mobile)
│  ├─ Weight: 600 (Semibold)
│  └─ Line Height: 1.2 (Tight)
│
├─ H3 (Subsection Titles)
│  ├─ Size: 20px (desktop) / 16px (mobile)
│  ├─ Weight: 600 (Semibold)
│  └─ Line Height: 1.3
│
└─ H4 (Component Titles)
   ├─ Size: 16px
   ├─ Weight: 500 (Medium)
   └─ Line Height: 1.4

BODY TEXT:
┌─ Base / Regular
│  ├─ Size: 14px
│  ├─ Weight: 400 (Regular)
│  ├─ Line Height: 1.6 (Comfortable untuk reading)
│  └─ Letter Spacing: Normal (0)
│
├─ Small
│  ├─ Size: 12px
│  ├─ Weight: 400
│  └─ Used untuk metadata, captions, helper text
│
└─ Large
   ├─ Size: 16px
   ├─ Weight: 400
   └─ Used untuk emphasized content atau introduction paragraphs

TEXT STYLES:
├─ Emphasis (Bold): Weight 600
├─ Secondary (Light): Weight 500
└─ Muted: Color #cbd5e1 atau #94a3b8
```

### Spacing System

```
SPACING SCALE (8px Base Grid):
┌─ xs: 2px    (untuk micro-adjustments)
├─ sm: 4px    (untuk tight spacing)
├─ base: 8px  (primary spacing unit)
├─ md: 16px   (default spacing)
├─ lg: 24px   (generous spacing)
├─ xl: 32px   (large sections)
├─ 2xl: 40px  (section spacing)
├─ 3xl: 48px  (major sections)
├─ 4xl: 56px
├─ 5xl: 64px
└─ 6xl: 80px  (full-screen gaps)

USAGE GUIDELINES:
├─ Component Internal: 8px-16px
├─ Component External (Margins): 16px-24px
├─ Section Gaps: 32px-48px
├─ Page Top/Bottom: 48px-64px
└─ Container Padding: 16px (mobile), 24px (tablet), 32px (desktop)
```

### Border Radius System

```
BORDER RADIUS SCALE:
├─ xs: 2px     (untuk subtle rounding on small elements)
├─ sm: 4px     (compact elements like small buttons)
├─ base: 8px   (standard untuk most elements)
├─ md: 12px    (slightly more rounded untuk larger cards)
├─ lg: 16px    (rounded untuk large containers)
└─ full: 9999px (untuk pills dan fully rounded elements)

USAGE GUIDELINES:
├─ Form Fields: 8px
├─ Cards: 12px
├─ Buttons: 8px
├─ Modals: 12px
├─ Badges: 4px
└─ Pill Buttons: full (9999px)
```

### Shadow System (Subtle, Professional)

```
ELEVATION LEVELS:
├─ Shadow None: No shadow (base level)
│
├─ Shadow-sm
│  └─ 0 1px 2px rgba(0, 0, 0, 0.1)
│     └─ Subtle elevation untuk hover states
│
├─ Shadow-md
│  └─ 0 4px 8px rgba(0, 0, 0, 0.15)
│     └─ Standard elevation untuk cards at rest
│
├─ Shadow-lg
│  └─ 0 10px 20px rgba(0, 0, 0, 0.2)
│     └─ Prominent elevation untuk modals dan dropdowns
│
└─ Shadow-xl
   └─ 0 20px 40px rgba(0, 0, 0, 0.25)
      └─ Maximum elevation untuk overlays

USAGE:
├─ Idle State: shadow-sm atau no shadow
├─ Hover State: shadow-md atau shadow-lg
├─ Active/Focus: shadow-lg
└─ Modals/Overlays: shadow-xl
```

---

## 🛠️ DETAILED TECHNICAL REQUIREMENTS

### Landing Page Components & Structure

```
LANDING PAGE HIERARCHY:
├── Navbar (Fixed/Sticky)
│   ├─ Logo (Text-based, elegant)
│   ├─ Navigation Links (Home, Features, About, Pricing, Contact)
│   ├─ CTA Button (Get Started / Sign In)
│   └─ Mobile Hamburger Menu (320px+)
│
├── Hero Section
│   ├─ Headline (Strong, compelling, 36-40px)
│   ├─ Subheading (Context, benefits, 18-20px)
│   ├─ Primary CTA Button (Sign Up / Get Started)
│   ├─ Secondary CTA Button (Learn More / Watch Demo)
│   ├─ Illustration / Dashboard Mockup (Right side, desktop only)
│   └─ Scroll Indicator (Optional, untuk hint tentang content below)
│
├── Features Section (3-4 Feature Cards)
│   ├─ Icon (Lucide React icons, 24-32px)
│   ├─ Headline (16-18px)
│   ├─ Description (14px, 1-2 lines)
│   ├─ Hover Effect (Scale 1.02, shadow increase)
│   └─ Grid Layout (1 col mobile, 2-4 col desktop)
│
├── Why Choose Us / Highlights Section
│   ├─ Two-Column Layout
│   │  ├─ Left: Large image / illustration (2/3 width)
│   │  └─ Right: List of benefits dengan icons (1/3 width)
│   ├─ Benefit Items dengan checkmarks
│   └─ Subtle animations (stagger, fade-in)
│
├── Testimonials Section (Optional but Recommended)
│   ├─ Carousel atau Grid of testimonials
│   ├─ Quote, author name, title, avatar
│   ├─ Star rating (5-star display)
│   └─ Auto-play carousel dengan pause on hover
│
├── CTA Section (Before Footer)
│   ├─ Strong Headline ("Ready to Transform Your Pesantren?")
│   ├─ Subheading dengan benefit summary
│   ├─ Primary CTA Button (prominent, large)
│   ├─ Secondary option (Contact Sales / Schedule Demo)
│   └─ Background: Subtle gradient atau solid accent color
│
└── Footer (Minimal)
    ├─ Logo / Company Name
    ├─ Quick Links (Privacy, Terms, Contact)
    ├─ Social Media Links
    ├─ Copyright Information
    └─ Newsletter Signup (Optional)
```

### Dashboard Application Structure

```
DASHBOARD LAYOUT:
├── Navbar (Sticky Top)
│   ├─ Logo (Text)
│   ├─ Search Bar (untuk quick santri search)
│   ├─ Notification Bell (dengan badge)
│   ├─ User Menu Dropdown
│   └─ Theme Toggle (optional)
│
├── Sidebar Navigation (Collapsible)
│   ├─ Dashboard (Home)
│   ├─ Santri Management
│   │  ├─ Santri List
│   │  ├─ Add New Santri
│   │  └─ Import Data
│   ├─ Attendance Tracking
│   │  ├─ Take Attendance
│   │  ├─ Attendance Records
│   │  └─ Statistics
│   ├─ Dormitory Management
│   ├─ Reports & Analytics
│   │  ├─ Monthly Report
│   │  ├─ Attendance Summary
│   │  └─ Export Data
│   ├─ Settings
│   │  ├─ School Info
│   │  ├─ User Management
│   │  └─ Preferences
│   └─ Help / Support
│
└── Main Content Area
    └─ Dynamic content based on route

DASHBOARD HOME PAGE (DEFAULT ROUTE):
├── Welcome Banner
│   ├─ Greeting (Assalamu Alaikum, [Username])
│   ├─ Current Date & Time (Real-time update)
│   └─ Quick Summary
│
├── Key Metrics Section (4 Cards in Grid)
│   ├─ Card 1: Total Santri
│   │  ├─ Large number dengan animated counter
│   │  ├─ Trend indicator (↑/↓ dengan percentage)
│   │  └─ Color accent: primary
│   ├─ Card 2: Present Today
│   │  ├─ Number + Percentage
│   │  ├─ Progress bar visualization
│   │  └─ Color: success green
│   ├─ Card 3: Permission/Sick
│   │  ├─ Combined count
│   │  └─ Color: warning amber
│   └─ Card 4: Absent Today
│      ├─ Count dengan alert
│      └─ Color: danger red
│
├── Weekly Attendance Chart Section
│   ├─ Title: "Attendance Overview (This Week)"
│   ├─ Bar atau Line chart (7 days)
│   ├─ Legend dengan color codes
│   ├─ Hover tooltips dengan exact numbers
│   └─ Height: ~300px
│
├── Recent Activity Table
│   ├─ Title: "Latest Attendance Records"
│   ├─ Columns: Timestamp, Santri Name, Class, Status, Recorded By
│   ├─ Sort by timestamp (newest first)
│   ├─ Status badge dengan colors (hadir=green, izin=blue, sakit=yellow, alfa=red)
│   ├─ 10 rows dengan pagination
│   ├─ View All button
│   └─ Empty state message jika tidak ada data
│
└── Quick Action Buttons
    ├─ Primary: "Record Attendance"
    ├─ Primary: "Add New Santri"
    ├─ Secondary: "View Full Reports"
    └─ Secondary: "Export Data"

RESPONSIVE BEHAVIOR:
├─ Mobile (320px-640px)
│  ├─ Single column layout untuk metrics
│  ├─ Sidebar berubah menjadi hamburger drawer
│  ├─ Chart full width dengan horizontal scroll jika perlu
│  └─ Buttons full width
│
├─ Tablet (641px-1024px)
│  ├─ 2 columns untuk metrics grid
│  ├─ Sidebar collapsible dengan toggle button
│  ├─ Chart medium size
│  └─ Table responsive dengan horizontal scroll
│
└─ Desktop (1025px+)
   ├─ 4 columns untuk metrics
   ├─ Fixed sidebar (250px width)
   ├─ Main content area full flex
   └─ All features visible tanpa scroll
```

### Complete Feature Specifications

#### **SANTRI MANAGEMENT**

```
LIST PAGE:
├─ Page Header
│  ├─ Title: "Daftar Santri"
│  ├─ Subtitle: "Total [X] santri terdaftar"
│  └─ Add New Button (Primary CTA)
│
├─ Search & Filter Bar
│  ├─ Search Input (by name / ID / email)
│  ├─ Filter Dropdown: Class (semua, 1A, 1B, 2A, 2B, 3A, 3B)
│  ├─ Filter Dropdown: Dormitory
│  ├─ Filter Dropdown: Status (Active, Inactive, Graduated)
│  ├─ Sort Dropdown (Name A-Z, Entry Date Newest, Class)
│  └─ Clear Filters Button
│
├─ View Toggle (List/Card View)
│
├─ Data Display
│  ├─ TABLE VIEW:
│  │  ├─ Columns: ID, Name, Class, Dormitory, Status, Phone, Actions
│  │  ├─ Row click untuk view detail
│  │  ├─ Status badge dengan warna (Active=green, Inactive=gray, Graduated=gold)
│  │  ├─ Pagination: 10, 25, 50 records per page
│  │  ├─ Total record count
│  │  ├─ Action buttons per row: View, Edit, Delete
│  │  └─ Sortable columns (click header untuk sort)
│  │
│  └─ CARD VIEW:
│     ├─ Cards in 2-4 column grid
│     ├─ Card content: Avatar (placeholder), Name, Class, Dormitory, Phone
│     ├─ Hover effect: Scale 1.02, shadow increase
│     ├─ Action buttons: View, Edit, Delete
│     └─ Same pagination as table
│
├─ Empty State (when no records)
│  ├─ Illustration / Icon
│  ├─ Message: "Belum ada data santri"
│  ├─ Helper text: "Mulai dengan menambahkan santri baru"
│  └─ Primary CTA: "Tambah Santri Pertama"
│
└─ Loading State
   ├─ Skeleton loaders untuk cards/rows
   ├─ Smooth fade-in saat data loaded
   └─ Estimated loading time dalam UI

DETAIL VIEW (Modal atau Page):
├─ Header Section
│  ├─ Avatar / Photo placeholder
│  ├─ Name (Large, 28px)
│  ├─ ID Number (Secondary text)
│  ├─ Edit & Delete buttons
│  └─ Close button (if modal)
│
├─ Information Sections
│  ├─ Personal Information
│  │  ├─ Birth Date: [value]
│  │  ├─ Gender: [L/P]
│  │  ├─ Phone: [value]
│  │  └─ Email: [value]
│  │
│  ├─ Family Information
│  │  ├─ Parent Name: [value]
│  │  └─ Parent Phone: [value]
│  │
│  ├─ Academic Information
│  │  ├─ Class: [value]
│  │  ├─ Entry Date: [value]
│  │  └─ Status: [Active/Inactive/Graduated]
│  │
│  └─ Dormitory Information
│     ├─ Dormitory: [name]
│     ├─ Room Number: [value] (if available)
│     └─ Occupancy Status: [Available/Shared]
│
├─ Attendance Statistics (This Month/Year)
│  ├─ Tab: This Month / This Year / All Time
│  ├─ Metrics: Total Days, Present, Absent, Permission, Sick, Alfa
│  ├─ Percentage bar untuk visualisasi
│  ├─ Attendance rate percentage (large, prominent)
│  └─ Trend indicator
│
└─ Action Buttons
   ├─ Primary: "Edit Santri"
   ├─ Secondary: "View Attendance History"
   └─ Danger: "Delete Santri" (dengan confirmation)

ADD/EDIT FORM:
├─ Modal atau dedicated page
├─ Form Sections
│  ├─ Personal Information (required)
│  │  ├─ Full Name * (text input, min 3 chars)
│  │  ├─ ID Number * (text input, unique validation)
│  │  ├─ Birth Date * (date picker)
│  │  ├─ Gender * (radio atau dropdown: L/P)
│  │  ├─ Phone (tel input, format validation)
│  │  └─ Email (email input, format validation)
│  │
│  ├─ Family Information
│  │  ├─ Parent Name * (text input)
│  │  ├─ Parent Phone (tel input)
│  │  └─ Relation (dropdown: Father/Mother/Guardian)
│  │
│  ├─ Academic Information (required)
│  │  ├─ Class * (dropdown, populated dari data)
│  │  ├─ Entry Date * (date picker, default today)
│  │  ├─ Status * (dropdown: Active/Inactive/Graduated)
│  │  └─ Previous School (text input, optional)
│  │
│  └─ Dormitory Assignment
│     ├─ Dormitory (dropdown, optional)
│     └─ Room Number (text input, optional)
│
├─ Validation
│  ├─ Required fields marked dengan * dan red asterisk
│  ├─ Real-time validation dengan error messages below field
│  ├─ Specific error messages:
│  │  ├─ "Nama santri harus diisi"
│  │  ├─ "Nomor ID sudah terdaftar"
│  │  ├─ "Format email tidak valid"
│  │  └─ "Tanggal lahir tidak boleh di masa depan"
│  └─ Submit button disabled sampai semua required fields valid
│
├─ Form States
│  ├─ Idle: Normal state
│  ├─ Loading: Button disabled, loading spinner, form disabled
│  ├─ Success: Show toast notification, close modal/navigate
│  └─ Error: Show error message di form, retry button
│
└─ Cancel Button (clear form, close modal/navigate back)
```

#### **ATTENDANCE TRACKING**

```
ATTENDANCE DASHBOARD:
├─ Page Header
│  ├─ Title: "Pencatatan Absensi"
│  ├─ Date Picker (Select date, default today)
│  └─ Class Selector (dropdown, default "Semua Kelas")
│
├─ View Mode Selector (3 options)
│  ├─ List View (Default)
│  ├─ Grid View
│  └─ Matrix View (Santri vs Time Slots)
│
├─ ATTENDANCE FORM (List View)
│  ├─ Class selector (if not already selected)
│  ├─ List of santri dalam kelas tersebut
│  ├─ For each santri:
│  │  ├─ Checkbox (Present/Absent toggle)
│  │  ├─ Status Dropdown
│  │  │  ├─ Hadir (Green)
│  │  │  ├─ Izin (Blue)
│  │  │  ├─ Sakit (Yellow)
│  │  │  └─ Alfa (Red)
│  │  ├─ Notes field (Optional, untuk alasan)
│  │  └─ Delete row button
│  │
│  ├─ Add Row Button (untuk input manual santri baru)
│  ├─ Select All / Deselect All buttons
│  ├─ Quick Status Buttons (untuk bulk marking)
│  │  ├─ Mark All As Present
│  │  ├─ Mark All As Absent
│  │  └─ Clear Selection
│  ├─ Submit Button (Prominent, "Simpan Absensi")
│  └─ Cancel Button
│
├─ ATTENDANCE FORM (Matrix View)
│  ├─ Left column: Santri names
│  ├─ Top row: Time slots (08:00, 10:00, 13:00, 15:00, dll)
│  ├─ Grid cells: Clickable untuk toggle status
│  │  ├─ Green = Hadir
│  │  ├─ Blue = Izin
│  │  ├─ Yellow = Sakit
│  │  ├─ Red = Alfa
│  │  └─ Gray = Not marked
│  └─ Same submit/cancel buttons
│
├─ Success/Error Feedback
│  ├─ Toast notification dengan jumlah records saved
│  ├─ Redirect ke attendance records page setelah sukses
│  └─ Error message dengan retry option jika gagal
│
└─ Loading State
   ├─ Skeleton loaders untuk form fields
   └─ Smooth fade-in saat santri list loaded

ATTENDANCE RECORDS PAGE:
├─ Page Header: "Riwayat Absensi"
├─ Filters & Search
│  ├─ Date Range Picker (From - To)
│  ├─ Class Filter (dropdown)
│  ├─ Status Filter (All, Hadir, Izin, Sakit, Alfa)
│  ├─ Search by santri name
│  └─ Reset Filters button
│
├─ Table Display
│  ├─ Columns: Date, Class, Santri Name, Status, Notes, Recorded By, Actions
│  ├─ Status column dengan color badges
│  ├─ Sortable: By clicking column header
│  ├─ Pagination: 25 records per page default
│  ├─ Action buttons per row: Edit, Delete
│  └─ Total record count
│
├─ Empty State
│  ├─ Message: "Belum ada data absensi"
│  └─ CTA: "Mulai Pencatatan Absensi"
│
├─ Bulk Operations (Optional)
│  ├─ Checkbox select multiple rows
│  ├─ Bulk delete with confirmation
│  └─ Bulk export (CSV/PDF)
│
└─ Edit Modal (for individual record)
   ├─ Pre-filled form dengan existing data
   ├─ Same validation as add form
   └─ Save / Cancel buttons

ATTENDANCE STATISTICS:
├─ Page Header: "Statistik Absensi"
├─ Selectors
│  ├─ Santri Selector (dropdown, search-able)
│  ├─ Month Selector (dropdown)
│  ├─ Year Selector (dropdown atau input)
│  └─ Apply button
│
├─ Statistics Display
│  ├─ Header Card
│  │  ├─ Santri Name (Large)
│  │  ├─ Class & Dormitory (Secondary)
│  │  └─ Period: [Month Year]
│  │
│  ├─ Metrics Grid (4-6 cards)
│  │  ├─ Total Hari Sekolah: [X]
│  │  ├─ Hadir: [X] ([Y]%)
│  │  ├─ Alfa: [X] ([Y]%)
│  │  ├─ Izin: [X] ([Y]%)
│  │  ├─ Sakit: [X] ([Y]%)
│  │  └─ Percentage Kehadiran: [X]% (Large, prominent)
│  │
│  ├─ Visualization Section
│  │  ├─ Pie Chart: Attendance Distribution
│  │  ├─ Horizontal Bar Charts: Untuk each status
│  │  └─ Color-coded sesuai dengan status colors
│  │
│  └─ Export Section
│     ├─ Export to PDF button
│     ├─ Export to Excel button
│     └─ Print button
│
└─ Trend View (Optional)
   ├─ Show attendance trend across months
   ├─ Line chart dengan month di X axis
   └─ Multi-series untuk compare status types
```

#### **OTHER MODULES**

```
DORMITORY MANAGEMENT:
├─ List Page
│  ├─ Title: "Manajemen Asrama"
│  ├─ Add New Dormitory button
│  ├─ Cards atau Table view dengan:
│  │  ├─ Dormitory Name
│  │  ├─ Location / Building
│  │  ├─ Capacity vs Current Occupancy (progress bar)
│  │  ├─ Status badge (Active/Maintenance/Inactive)
│  │  └─ Action buttons: View, Edit, Delete
│  └─ Pagination
│
├─ Detail Page
│  ├─ Dormitory Info
│  ├─ List santri assigned (table atau card)
│  ├─ Add Santri button
│  ├─ Remove Santri button (per row)
│  └─ Edit dormitory info button
│
└─ Add/Edit Form
   ├─ Fields: Name, Location, Capacity, Status
   ├─ Form validation
   └─ Submit / Cancel buttons

REPORTS & ANALYTICS:
├─ Monthly Attendance Report
│  ├─ Selectors: Month, Year, Class
│  ├─ Summary stats (average attendance %, etc)
│  ├─ Bar/Line chart untuk trends
│  ├─ Detailed table dengan santri data
│  └─ Export buttons
│
├─ Santri Statistics Dashboard
│  ├─ KPIs: Total, By Class, By Status, By Dormitory
│  ├─ Pie charts untuk distribution
│  ├─ Growth trend (if data available)
│  └─ Filters untuk customize view
│
└─ Data Export
   ├─ Export to Excel
   ├─ Export to PDF
   └─ Select date range, class, fields untuk export
```

---

## 💻 API INTEGRATION LAYER

### Service Architecture

```typescript
// Struktur services/api.ts yang siap untuk real API

import axios, { AxiosInstance } from 'axios';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const REQUEST_TIMEOUT = parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '10000');
const MAX_RETRIES = parseInt(import.meta.env.VITE_MAX_RETRIES || '3');

// Axios Instance dengan interceptors
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor: Add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor: Handle errors dan token refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Attempt to refresh token
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await instance.post('/auth/refresh', { refreshToken });
          localStorage.setItem('authToken', response.data.token);
          return instance(originalRequest);
        } catch (err) {
          // Refresh failed, redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }

      // Handle other errors
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createApiClient();

// API SERVICE FUNCTIONS (ready untuk real implementation)

export const santriService = {
  // GET /api/santri - List dengan pagination dan filters
  getAll: async (filters?: {
    search?: string;
    class?: string;
    dormitory?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/santri', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching santri list:', error);
      throw error;
    }
  },

  // GET /api/santri/:id - Get detail
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/santri/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching santri ${id}:`, error);
      throw error;
    }
  },

  // POST /api/santri - Create baru
  create: async (data: any) => {
    try {
      const response = await axiosInstance.post('/santri', data);
      return response.data;
    } catch (error) {
      console.error('Error creating santri:', error);
      throw error;
    }
  },

  // PUT /api/santri/:id - Update
  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/santri/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating santri ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/santri/:id - Delete
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/santri/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting santri ${id}:`, error);
      throw error;
    }
  },
};

export const attendanceService = {
  // GET /api/attendance - List dengan filters
  getAll: async (filters?: {
    date?: string;
    class?: string;
    santriId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/attendance', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    }
  },

  // GET /api/attendance/statistics - Get stats per santri
  getStatistics: async (filters?: {
    santriId?: string;
    month?: number;
    year?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/attendance/statistics', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance statistics:', error);
      throw error;
    }
  },

  // POST /api/attendance/bulk - Bulk create/update
  createBulk: async (records: any[]) => {
    try {
      const response = await axiosInstance.post('/attendance/bulk', { records });
      return response.data;
    } catch (error) {
      console.error('Error bulk creating attendance:', error);
      throw error;
    }
  },

  // PUT /api/attendance/:id - Update single record
  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/attendance/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating attendance ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/attendance/:id - Delete record
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting attendance ${id}:`, error);
      throw error;
    }
  },
};

export const dashboardService = {
  // GET /api/dashboard/stats - Dashboard statistics
  getStats: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // GET /api/dashboard/attendance-summary - Weekly/monthly summary
  getAttendanceSummary: async (filters?: {
    days?: number;
    month?: number;
    year?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/dashboard/attendance-summary', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance summary:', error);
      throw error;
    }
  },

  // GET /api/dashboard/recent-activity - Recent activity feed
  getRecentActivity: async (limit: number = 10) => {
    try {
      const response = await axiosInstance.get('/dashboard/recent-activity', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  },
};

export const dormitoryService = {
  // GET /api/dormitory - List all
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/dormitory');
      return response.data;
    } catch (error) {
      console.error('Error fetching dormitories:', error);
      throw error;
    }
  },

  // GET /api/dormitory/:id - Get detail with residents
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/dormitory/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dormitory ${id}:`, error);
      throw error;
    }
  },

  // POST /api/dormitory - Create baru
  create: async (data: any) => {
    try {
      const response = await axiosInstance.post('/dormitory', data);
      return response.data;
    } catch (error) {
      console.error('Error creating dormitory:', error);
      throw error;
    }
  },

  // PUT /api/dormitory/:id - Update
  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/dormitory/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating dormitory ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/dormitory/:id - Delete
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/dormitory/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting dormitory ${id}:`, error);
      throw error;
    }
  },
};

export default axiosInstance;
```

---

## 🎬 ANIMATIONS & MICRO-INTERACTIONS

### Animation Specifications

```
PAGE LOAD ANIMATIONS:
├─ Fade In (300ms ease-out)
│  └─ Applied ke main content saat page load
│
├─ Staggered Item Entrance (50-100ms delay)
│  └─ For list items, cards, form fields
│     └─ Creates sequential, professional appearance
│
└─ Scroll Reveal
   └─ Elements fade/slide-up as user scrolls into view
      └─ Implemented dengan Intersection Observer API

HOVER INTERACTIONS:
├─ Buttons
│  ├─ Scale: 1.02 (subtle enlargement)
│  ├─ Shadow: Increase depth (shadow-md → shadow-lg)
│  ├─ Duration: 200ms
│  └─ Easing: ease-in-out
│
├─ Cards
│  ├─ Scale: 1.02
│  ├─ Shadow: Increase
│  ├─ Background: Subtle darken
│  └─ Duration: 200ms
│
├─ Links
│  ├─ Color: Transition to accent color
│  ├─ Underline: Appear smoothly
│  └─ Duration: 150ms
│
└─ Form Fields
   ├─ Border Color: Change to primary accent
   ├─ Shadow: Add subtle glow
   └─ Duration: 150ms

FOCUS STATES (Accessibility):
├─ Outline Ring
│  └─ 3px solid outline dalam accent color
│     └─ Offset: 2px dari element
│
├─ Visible pada Tab navigation
│  └─ Required untuk keyboard users
│
└─ Keyboard Navigation
   └─ All interactive elements must be focusable (tab order logical)

LOADING STATES:
├─ Skeleton Loaders
│  ├─ Placeholder elements matching actual content shape
│  ├─ Shimmer animation (subtle moving highlight)
│  ├─ Smooth fade-out when actual content loads
│  └─ Prefer ini over spinners untuk better UX
│
├─ Spinners
│  ├─ Smooth rotation (360deg/1.5s)
│  ├─ Used untuk actions (form submit, API calls)
│  └─ Only show jika loading takes >500ms
│
└─ Progress Indicators
   └─ For long-running operations
      └─ Determinate (percentage) preferred over indeterminate

NOTIFICATION ANIMATIONS:
├─ Toast Entrance
│  ├─ Slide up + fade in (300ms)
│  ├─ From: bottom, opacity 0
│  └─ To: proper position, opacity 1
│
├─ Toast Exit
│  ├─ Slide down + fade out (300ms)
│  └─ Triggered automatically after 5 seconds (or user close)
│
└─ Stacking
   └─ Multiple toasts: stack dengan 8px gap
      └─ New ones push existing ones up smoothly

MODAL/DIALOG ANIMATIONS:
├─ Backdrop
│  ├─ Fade in (200ms)
│  └─ Opacity: 0 → 0.5
│
├─ Content
│  ├─ Scale + fade: from 0.9, opacity 0 → 1, opacity 1
│  ├─ Duration: 200ms
│  └─ Creates appearance dari center
│
└─ Exit
   └─ Reverse animation (200ms)
      └─ Smooth dismissal

FORM VALIDATION ANIMATIONS:
├─ Error Message Appearance
│  ├─ Slide down + fade in (150ms)
│  ├─ Color: Red with shadow
│  └─ Below field dengan 8px gap
│
├─ Success Feedback
│  ├─ Checkmark icon dengan pulse animation
│  ├─ Quick fade (100ms)
│  └─ Color: Green
│
└─ Field States
   └─ Error: Border red, background light red tint
      Valid: Border green, checkmark appear
      Focused: Border accent color, shadow glow
      Disabled: Opacity 0.5, cursor not-allowed

DATA UPDATE ANIMATIONS:
├─ Number Changes
│  └─ Brief highlight effect (background color pulse)
│     └─ Shows user yang value berubah
│
├─ List Item Removal
│  └─ Fade out + slide left (200ms)
│     └─ Item disappears smoothly
│
├─ List Item Addition
│  └─ Fade in + slide from top (200ms)
│     └─ New item appears prominently
│
└─ Table Row Hover
   └─ Background color subtle change
      └─ Helps user track which row they're hovering

ICON ANIMATIONS:
├─ Loading Icons
│  └─ Smooth 360° rotation (1.5s linear)
│
├─ Notification Badges
│  └─ Subtle pulse (1.5s infinite)
│     └─ Draws attention tanpa aggressive
│
├─ Expand/Collapse
│  └─ Rotate 0° → 90° (200ms)
│     └─ Arrow icon rotation untuk accordion
│
└─ Status Indicators
   └─ Pulse atau blink subtle
      └─ For live status (online, offline)

SCROLL BEHAVIORS:
├─ Smooth Scroll
│  └─ Anchor links: scroll-behavior: smooth
│
├─ Parallax (Optional, Use Sparingly)
│  └─ Hero section background moves slower than scroll
│     └─ Creates depth effect subtle
│
└─ Hide/Show Navbar on Scroll
   └─ Hide navbar saat scroll down
      └─ Show again saat scroll up
         └─ Improves mobile space utilization

PERFORMANCE GUIDELINES:
├─ Use GPU-accelerated properties
│  ├─ transform (translate, scale, rotate)
│  ├─ opacity
│  └─ Avoid: width, height, left, right (causes reflow)
│
├─ Duration recommendations
│  ├─ Micro-interactions: 100-150ms
│  ├─ Standard animations: 200-300ms
│  ├─ Page transitions: 300-400ms
│  └─ Never exceed 500ms (feels sluggish)
│
├─ Easing functions
│  ├─ Entrance: ease-out (starts fast, ends slow)
│  ├─ Exit: ease-in (starts slow, ends fast)
│  ├─ Hover: ease-in-out (smooth both directions)
│  └─ Prefer cubic-bezier untuk custom easing
│
└─ Reduce Motion
   └─ Respect prefers-reduced-motion media query
      └─ Disable animations untuk accessibility
```

---

## 📱 RESPONSIVE DESIGN STRATEGY

### Breakpoints & Adaptations

```
BREAKPOINT DEFINITIONS:
├─ xs: 320px  (very small phones)
├─ sm: 640px  (tablet landscape, large phone)
├─ md: 768px  (tablet)
├─ lg: 1024px (small desktop, large tablet)
├─ xl: 1280px (desktop)
└─ 2xl: 1536px (large desktop, 4K)

DEFAULT STRATEGY: Mobile First
├─ Build base styles untuk mobile (320px)
├─ Use media queries dengan min-width untuk larger breakpoints
├─ Avoids CSS override cascade issues
└─ Ensures minimum viable experience bahkan di older devices

RESPONSIVE LAYOUT PATTERNS:

┌─ Single Column (320px-767px / Mobile & Tablet Portrait)
│  ├─ Full width content
│  ├─ Sidebar converted to hamburger drawer
│  ├─ Buttons full width atau stacked
│  ├─ Tables with horizontal scroll
│  ├─ Grids: 1 column
│  ├─ Navbar: Hamburger menu, logo centered or left
│  └─ Cards: Full width, stacked vertically
│
├─ Two Column (768px-1023px / Tablet Landscape)
│  ├─ Optional sidebar (collapsible with toggle)
│  ├─ Main content takes 2/3 or 3/4 width
│  ├─ Button groups dapat side-by-side
│  ├─ 2-column grid layouts
│  ├─ Tables: Still may need horizontal scroll untuk large tables
│  └─ Cards: 2 columns
│
└─ Full Feature (1024px+ / Desktop)
   ├─ Fixed sidebar (250-300px width)
   ├─ Main content full flex space
   ├─ 3-4 column grids
   ├─ Multi-column table layouts
   ├─ Buttons & controls: Contextual layout
   ├─ Cards: 3-4 columns
   └─ All features visible without scroll

COMPONENT-SPECIFIC ADAPTATIONS:

NAVBAR:
├─ Mobile (< 640px)
│  ├─ Logo: Center atau left aligned (24px)
│  ├─ Navigation: Hidden, hamburger menu (☰)
│  ├─ Actions: Right side (search, notifications)
│  ├─ Height: 56px
│  └─ No text labels, icons only
│
├─ Tablet (640px-1023px)
│  ├─ Logo: Left (28px)
│  ├─ Navigation: Selective showing (most important items visible)
│  ├─ Remaining items: Hamburger or More menu
│  ├─ Height: 64px
│  └─ Mix of icons + text labels
│
└─ Desktop (1024px+)
   ├─ Logo: Left (28-32px)
   ├─ Navigation: All items visible, horizontal
   ├─ Right side: User profile, search, settings
   ├─ Height: 64-72px
   └─ Full text labels

SIDEBAR:
├─ Mobile (< 1024px)
│  ├─ Hamburger toggle button (top-left)
│  ├─ When open: Drawer overlays content
│  │  ├─ Full height
│  │  ├─ 80% width (max 300px)
│  │  ├─ Dark overlay backdrop
│  │  └─ Close on item click atau outside click
│  ├─ When closed: Hidden (not taking space)
│  └─ Smooth slide-in/out animation (200ms)
│
└─ Desktop (1024px+)
   ├─ Always visible, fixed on left
   ├─ 250-300px width
   ├─ Doesn't overlay content
   ├─ Optional collapse/expand toggle
   └─ Content shifts right sesuai sidebar width

GRID LAYOUTS:
├─ Metrics Cards
│  ├─ Mobile: 1 column (full width)
│  ├─ Tablet: 2 columns (50% width each)
│  ├─ Desktop: 4 columns (25% width each)
│  └─ Gap: 16px all breakpoints
│
├─ Feature Cards
│  ├─ Mobile: 1 column
│  ├─ Tablet: 2 columns
│  ├─ Desktop: 3-4 columns
│  └─ Same gap: 16px
│
└─ Data Tables
   ├─ Mobile (< 640px)
   │  ├─ Card view preferred (not table)
   │  ├─ Each record = vertical card
   │  ├─ Stack data vertically
   │  └─ Action buttons: Full width
   ├─ Tablet (640px-1023px)
   │  ├─ Horizontal scroll table
   │  ├─ Freeze first column (Santri Name)
   │  └─ Scroll to see other columns
   └─ Desktop (1024px+)
      ├─ Full table visibility
      ├─ No scrolling needed
      └─ Normal table layout

TYPOGRAPHY SCALING:
├─ H1: 24px (mobile) → 36px (desktop)
├─ H2: 20px (mobile) → 28px (desktop)
├─ H3: 16px (mobile) → 20px (desktop)
├─ Body: 14px (constant across breakpoints)
└─ Small: 12px (constant)

SPACING ADJUSTMENTS:
├─ Mobile: 16px padding (containers), 8-12px gaps
├─ Tablet: 20px padding, 12-16px gaps
├─ Desktop: 24-32px padding, 16-24px gaps
└─ Maintain 8px grid untuk consistency

TOUCH TARGETS (Mobile):
├─ Minimum: 44x44px (industry standard)
├─ Recommended: 48x48px (generous)
├─ Spacing: 8px minimum between touch targets
├─ Hover areas: Larger hit zones acceptable
└─ Form inputs: 48px height ideal pada mobile

IMAGE & ILLUSTRATION RESPONSIVENESS:
├─ Mobile: 100% width of container
├─ Tablet: 80% width atau constraint
├─ Desktop: Specific width (e.g., 400px)
├─ Use CSS object-fit: cover untuk aspect ratio maintenance
└─ Provide srcset dengan multiple resolutions

FORM RESPONSIVENESS:
├─ Mobile: Fields full width, stacked vertically
├─ Tablet: Up to 2-column grid acceptable
├─ Desktop: Multi-column forms okay
├─ Labels: Above field pada mobile, beside pada desktop (optional)
└─ Buttons: Full width mobile, auto-width desktop

TESTING APPROACH:
├─ Chrome DevTools responsive mode
├─ Test pada actual devices:
│  ├─ iphone SE (small: 375px)
│  ├─ iPhone 13/14 (medium: 390px)
│  ├─ iPad (tablet: 768px)
│  └─ Desktop (1920px)
├─ Use responsive design testing tools (Responsively.app)
├─ Check orientation changes (portrait ↔ landscape)
└─ Ensure no horizontal scrolling pada mobile
```

---

## 🚀 MASTER PROMPT - COMPLETE VIBE CODE INSTRUCTION

```
You are a world-class senior full-stack web engineer with deep expertise in:

✓ Building production-grade React applications dengan enterprise-level architecture
✓ Creating premium, modern, accessible user interfaces dengan design systems
✓ Implementing complex state management dan data synchronization patterns
✓ Architecting RESTful APIs integration dengan proper error handling dan retry logic
✓ Responsive design mastery menggunakan mobile-first approach
✓ Performance optimization through code splitting, lazy loading, dan efficient rendering
✓ Accessibility standards compliance (WCAG 2.1 AA minimum)
✓ Modern animation frameworks untuk micro-interactions yang enhance UX

YOUR OBJECTIVE:
Build a complete, production-ready web application untuk Santri Connect platform yang combines sebuah elegant, professional landing page dengan sebuah powerful internal management dashboard. The application harus:

1. Feel premium, professional, dan modern tanpa being flashy atau "alay"
2. Deliver exceptional UX dengan smooth interactions dan intuitive navigation
3. Scale dari mobile phones (320px) hingga large desktops (1920px+)
4. Integrate seamlessly dengan backend API menggunakan proper patterns
5. Handle errors gracefully dengan user-friendly messaging
6. Implement security best practices untuk production deployments
7. Follow accessibility standards untuk inclusive user experience

TECH STACK (MANDATORY - NO SUBSTITUTIONS):

Frontend Framework:
  ├─ React 18.2+ dengan concurrent features
  ├─ TypeScript 5.0+ untuk type safety
  ├─ React Router v6+ untuk client-side routing
  └─ Functional components dengan React Hooks exclusively

Styling & Design:
  ├─ Tailwind CSS 3.4+ (utility-first, no custom CSS except globals)
  ├─ Lucide React untuk icons (modern, 24+ icon set)
  └─ Framer Motion untuk animations (subtle, performant)

State & Data Management:
  ├─ Zustand untuk client state (lightweight, scalable)
  ├─ React Query (TanStack Query) untuk server state
  └─ Context API untuk theme/auth jika needed (secondary)

HTTP & API:
  ├─ Axios instance dengan interceptors
  ├─ Proper error handling dengan retry logic
  └─ JWT token management dengan refresh capabilities

Form Handling:
  ├─ React Hook Form untuk performance
  ├─ Zod untuk type-safe validation
  └─ Real-time validation dengan error messages

Data Visualization:
  ├─ Recharts untuk charts/graphs (React-native)
  └─ No chart library jika tidak essential

Notifications:
  ├─ Sonner atau React Toastify untuk toasts
  └─ Toast untuk success/error/warning/info feedback

Build & Development:
  ├─ Vite untuk fast HMR dan optimized builds
  ├─ npm scripts untuk common tasks
  └─ Environment variables (.env) untuk configuration

DESIGN SYSTEM:

Color Palette (Premium Dark Theme):
  Background Colors:
    Primary: #0f1419 (very dark navy)
    Secondary: #1a202c (dark gray)
    Tertiary: #242e3e (elevated surfaces)

  Accent Colors:
    Primary: #06b6d4 (cyan/teal - main actions)
    Secondary: #d4af37 (gold - premium highlights)
    Success: #10b981 (green)
    Warning: #f59e0b (amber)
    Danger: #ef4444 (red)
    Info: #3b82f6 (blue)

  Text Colors:
    Primary: #f8fafc (almost white)
    Secondary: #cbd5e1 (light gray)
    Muted: #94a3b8 (dark gray)

Typography:
  Font Family: Inter, Poppins, atau SF Pro (modern sans-serif)
  Base Size: 14px dengan 8px grid scaling
  Headings: Bold, tight letter-spacing
  Body: Regular, 1.6 line-height untuk readability

Spacing & Sizing:
  Grid: 8px base unit (4, 8, 16, 24, 32, 40, 48, 56, 64)
  Border Radius: 8px standard, 4px small, 12px large
  Shadows: Minimal, elevation-based (shadow-sm → shadow-xl)

PROJECT STRUCTURE:

src/
├── components/
│   ├── common/           # Navbar, Sidebar, Card, Modal, Button, Form, etc
│   ├── landing/          # Landing page specific components
│   ├── dashboard/        # Dashboard home components
│   ├── santri/           # Santri management components
│   ├── attendance/       # Attendance tracking components
│   ├── dormitory/        # Dormitory management components
│   ├── reports/          # Reports & analytics components
│   └── forms/            # Reusable form components
├── pages/                # Page-level components (routes)
├── hooks/                # Custom React hooks (useApi, useFetch, etc)
├── stores/               # Zustand stores (app state)
├── services/             # API layer (api.ts, auth.ts, etc)
├── types/                # TypeScript interfaces & types
├── utils/                # Utility functions (formatters, helpers)
├── constants/            # Constants (colors, routes, endpoints)
├── styles/               # Global styles (tailwind config, globals)
├── App.tsx               # Main app dengan routing
├── main.tsx              # React entry point
├── index.css             # Global CSS (minimal, mostly Tailwind)
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration

CORE DELIVERABLES:

1. Landing Page
   ├─ Sticky navbar dengan smooth navigation
   ├─ Hero section dengan compelling headline, subheading, CTA buttons
   ├─ Features section dengan 3-4 feature cards
   ├─ "Why Choose Us" section dengan 2-column layout
   ├─ Testimonials carousel (optional but recommended)
   ├─ Call-to-action section dengan prominent button
   └─ Minimalist footer dengan links dan info

2. Dashboard Application
   ├─ Responsive layout (sidebar + main content)
   ├─ Dashboard homepage dengan metrics cards dan charts
   ├─ Santri management (list, detail, create, update, delete)
   ├─ Attendance tracking (record, view, statistics)
   ├─ Dormitory management (list, detail, assignments)
   ├─ Reports & analytics (monthly reports, statistics)
   ├─ Settings & user management
   └─ Proper error handling dan user feedback throughout

3. Code Quality
   ├─ TypeScript strict mode (no 'any' types)
   ├─ Clean, well-commented code
   ├─ Reusable components (no copy-paste)
   ├─ Proper folder structure & organization
   ├─ Error boundaries untuk safety
   ├─ Loading states untuk all async operations
   ├─ Proper validation di semua forms
   └─ Security best practices implemented

4. API Integration
   ├─ Dedicated services/api.ts layer
   ├─ Axios instance dengan interceptors
   ├─ Ready untuk real backend (currently using dummy data)
   ├─ Comments menunjukkan where to replace dummy dengan real API
   ├─ Proper error handling dengan user-friendly messages
   ├─ Retry logic untuk failed requests
   └─ Authentication token management

5. Responsive Design
   ├─ Mobile-first approach (base 320px)
   ├─ Tested pada 4-5 breakpoints
   ├─ Proper touch targets (44x44px minimum)
   ├─ No horizontal scrolling pada mobile
   ├─ Sidebar → hamburger drawer pada mobile
   ├─ Table → card view pada mobile
   └─ All features functional pada semua devices

6. Animations & UX
   ├─ Subtle, professional animations (no excessive bouncing)
   ├─ Page transitions dengan fade-in (300ms)
   ├─ Card entries dengan stagger animation
   ├─ Hover effects pada buttons/cards (scale 1.02, shadow)
   ├─ Loading states (skeleton loaders preferred)
   ├─ Smooth form validation dengan error messages
   ├─ Toast notifications untuk feedback
   └─ Reduced motion support untuk accessibility

IMPORTANT SPECIFICATIONS:

Data & Dummy Content:
  ├─ Use realistic dummy data untuk all entities
  ├─ 20+ santri dengan diverse classes/dormitories/statuses
  ├─ 100+ attendance records spanning 30+ days
  ├─ 5 dormitories dengan varying occupancy levels
  ├─ Dashboard stats reflecting realistic data
  └─ Provide clear comments showing API call replacement points

API Service Layer:
  ├─ Create complete api.ts dengan all endpoints
  ├─ santriService (getAll, getById, create, update, delete)
  ├─ attendanceService (getAll, getStatistics, createBulk, update, delete)
  ├─ dashboardService (getStats, getSummary, getActivity)
  ├─ dormitoryService (getAll, getById, create, update, delete)
  ├─ Each function include error handling
  └─ Current implementation: return dummy data with comments:
      // TODO: Replace with real API call:
      // const response = await axiosInstance.get('/santri');
      // return response.data;

Forms & Validation:
  ├─ React Hook Form + Zod untuk semua forms
  ├─ Real-time client-side validation
  ├─ Specific, helpful error messages
  ├─ Required fields marked dengan asterisk (*)
  ├─ Loading state pada submit button
  ├─ Form disabled during submission
  ├─ Success notifications após submit
  └─ Form reset after successful submission

Error Handling:
  ├─ Try-catch blocks di semua async operations
  ├─ User-friendly error messages (no technical jargon)
  ├─ Fallback UI untuk error states
  ├─ Retry buttons untuk failed operations
  ├─ Network error detection dengan appropriate messaging
  └─ Never expose sensitive information di error messages

Accessibility:
  ├─ Semantic HTML throughout
  ├─ ARIA labels where appropriate
  ├─ Keyboard navigation (all interactive elements focusable)
  ├─ Focus indicators visible (3px ring)
  ├─ Color contrast: >4.5:1 untuk normal text
  ├─ Alt text untuk images
  ├─ Heading hierarchy: H1 → H2 → H3 (no skipping)
  └─ Reduced motion support (@media prefers-reduced-motion)

Security:
  ├─ Input validation på all forms
  ├─ Sanitize user inputs before display (use textContent, not innerHTML)
  ├─ Never hardcode API keys atau secrets
  ├─ Use environment variables (VITE_API_BASE_URL, etc)
  ├─ JWT token securely stored (localStorage for now, consider httpOnly cookies)
  ├─ HTTPS ready (all API calls use https in production)
  ├─ CORS handling jika needed
  └─ XSS prevention throughout

Performance:
  ├─ Code splitting dengan React.lazy for routes
  ├─ Suspense fallback untuk lazy loaded components
  ├─ React.memo untuk expensive components
  ├─ useCallback untuk callback dependencies
  ├─ Proper React Query caching strategies
  ├─ Image optimization (lazy loading)
  ├─ CSS optimization (Tailwind tree-shaking)
  └─ Bundle analysis ready

DELIVERY REQUIREMENTS:

Provide complete, production-ready code including:

1. All source files dalam src/ folder
2. Configuration files (tailwind.config.js, tsconfig.json, vite.config.ts)
3. package.json dengan all dependencies dan scripts
4. .env.example dengan required environment variables
5. README.md dengan:
   ├─ Project overview
   ├─ Setup instructions
   ├─ Running the development server
   ├─ Building for production
   ├─ API endpoints documentation
   ├─ Dummy data structure
   ├─ Future improvements (switching to real API)
   └─ Deployment instructions
6. Comments dalam kode menunjukkan API integration points

CONSTRAINTS & GUIDANCE:

DO:
  ✓ Write TypeScript interfaces untuk ALL data types
  ✓ Use Tailwind utility classes exclusively untuk styling
  ✓ Implement proper error handling di semua places
  ✓ Create reusable components (no copy-paste code)
  ✓ Use responsive design patterns (mobile-first)
  ✓ Add loading/skeleton states untuk better UX
  ✓ Implement form validation dengan helpful errors
  ✓ Write clear, semantic HTML
  ✓ Use Git-friendly file structure
  ✓ Add meaningful comments di complex logic

DON'T:
  ✗ Hardcode API URLs atau sensitive data
  ✗ Use custom CSS (Tailwind only)
  ✗ Create overly complex components (max ~200 lines)
  ✗ Skip error handling
  ✗ Use 'any' TypeScript types
  ✗ Add unnecessary dependencies
  ✗ Ignore accessibility requirements
  ✗ Create unresponsive layouts
  ✗ Use setTimeout/setInterval unnecessarily
  ✗ Commit sensitive files (.env dengan real keys)

ANIMATIONS CRITERIA:
  ├─ Page transitions: Fade in 300ms ease-out
  ├─ Card entries: Stagger 50-100ms between items
  ├─ Hover effects: Scale 1.02, shadow increase, 200ms duration
  ├─ Loading: Skeleton loaders preferred, smooth spinner if needed
  ├─ Notifications: Slide up 300ms from bottom
  ├─ Modals: Fade + scale in/out 200ms
  ├─ Form validation: Smooth error appearance, color transitions
  ├─ Icons: Smooth color transitions, rotate for loading
  ├─ All animations: Respect prefers-reduced-motion
  └─ Performance: GPU-accelerated (transform, opacity only)

RESPONSIVE DESIGN CRITERIA:
  ├─ Works flawlessly pada 320px (iPhone SE)
  ├─ Tested upon 640px (tablet landscape)
  ├─ Optimized pada 768px (iPad)
  ├─ Enhanced pada 1024px (small desktop)
  ├─ Full-featured pada 1280px+ (desktop)
  ├─ No horizontal scrolling pada any breakpoint
  ├─ Touch targets minimum 44x44px
  ├─ Sidebar collapses to drawer < 1024px
  ├─ Grids responsive (1 col → 2 col → 4 col)
  └─ Typography scales proportionally

IMPLEMENTATION SEQUENCE (Recommended):

1. Project Setup & Architecture
   ├─ Initialize Vite + React + TypeScript
   ├─ Install dependencies
   ├─ Configure Tailwind CSS
   ├─ Setup folder structure
   └─ Configure TSConfig strict mode

2. Base Components & Layout
   ├─ Create common components (Button, Input, Card, Modal)
   ├─ Build Navbar component
   ├─ Build Sidebar navigation
   ├─ Create layout wrapper
   └─ Test responsive behavior

3. Routing & Pages
   ├─ Setup React Router
   ├─ Create page components
   ├─ Implement navigation flow
   └─ Test routing

4. API & Services
   ├─ Create api.ts dengan axios instance
   ├─ Implement dummy data
   ├─ Setup error handling
   └─ Create service functions

5. State Management
   ├─ Create Zustand stores
   ├─ Implement React Query setup
   ├─ Test state management
   └─ Handle side effects

6. Landing Page
   ├─ Build navbar
   ├─ Create hero section
   ├─ Add features section
   ├─ Build CTA sections
   ├─ Create footer
   └─ Style & polish

7. Dashboard Pages (iterate per feature)
   ├─ Dashboard homepage
   ├─ Santri list & detail
   ├─ Santri form (add/edit)
   ├─ Attendance dashboard
   ├─ Attendance records
   ├─ Dormitory pages
   └─ Reports section

8. Forms & Validation
   ├─ Setup React Hook Form
   ├─ Create Zod schemas
   ├─ Implement validation
   ├─ Add error messaging
   └─ Test all forms

9. Animations & Interactions
   ├─ Add page transitions
   ├─ Implement hover effects
   ├─ Add loading states
   ├─ Create notification system
   └─ Polish micro-interactions

10. Testing & Polish
    ├─ Test responsive design (all breakpoints)
    ├─ Test forms & validation
    ├─ Test API integration flow
    ├─ Check accessibility (keyboard, screen reader)
    ├─ Performance optimization
    ├─ Code review & refactoring
    └─ Final polish & deployment readiness

QUESTIONS BEFORE YOU START:
  ✓ Do you understand the complete project scope?
  ✓ Are you ready to build production-quality code?
  ✓ Will you include detailed comments for API integration?
  ✓ Will responsive design be tested upon real devices/tools?
  ✓ Are you prepared to deliver a complete, working application?

If you understand all requirements, please confirm you're ready dan provide:
1. Complete project initialization (package.json, vite.config, tailwind.config, tsconfig)
2. Full folder structure dengan all files
3. All source code (no placeholders or TODOs)
4. README.md dengan setup instructions
5. .env.example dengan configuration needs

Let's build Santri Connect yang AMAZING! 🚀🎓

Ready? Begin implementation!
```

---

## ✅ FINAL CHECKLIST BEFORE DELIVERY

Use this checklist untuk ensure complete delivery:

```
PROJECT STRUCTURE:
  ☐ All folders created correctly
  ☐ All source files present
  ☐ Clear file organization
  ☐ No unnecessary files

CODE QUALITY:
  ☐ TypeScript strict mode enabled
  ☐ No 'any' types used
  ☐ Clear, readable code
  ☐ Consistent naming conventions
  ☐ Comments on complex logic
  ☐ Error handling throughout
  ☐ No console.logs in production code

FEATURES:
  ☐ Landing page complete
  ☐ Dashboard complete
  ☐ All CRUD operations working
  ☐ Forms with validation
  ☐ Error handling & feedback
  ☐ Loading states
  ☐ Empty states

RESPONSIVE DESIGN:
  ☐ Tested on 320px (mobile)
  ☐ Tested on 768px (tablet)
  ☐ Tested on 1024px (desktop)
  ☐ No horizontal scrolling
  ☐ Touch targets adequate
  ☐ Sidebar responsive

ANIMATIONS:
  ☐ Page transitions implemented
  ☐ Hover effects added
  ☐ Loading states animate
  ☐ Notifications slide in/out
  ☐ Modals fade in/out
  ☐ No excessive animations
  ☐ Performance optimized

FORMS:
  ☐ React Hook Form integrated
  ☐ Zod validation setup
  ☐ Error messages display
  ☐ Submit feedback shown
  ☐ Form reset working
  ☐ Disabled states during submit

API INTEGRATION:
  ☐ api.ts created dengan all services
  ☐ Dummy data implemented
  ☐ Error handling in place
  ☐ Comments showing API swap points
  ☐ Axios instance configured
  ☐ Interceptors implemented

ACCESSIBILITY:
  ☐ Semantic HTML used
  ☐ ARIA labels added
  ☐ Keyboard navigation works
  ☐ Focus indicators visible
  ☐ Color contrast OK (>4.5:1)
  ☐ Alt text on images

PERFORMANCE:
  ☐ Code splitting implemented
  ☐ Lazy loading configured
  ☐ React.memo used appropriately
  ☐ No unnecessary re-renders
  ☐ CSS optimized (Tailwind)

SECURITY:
  ☐ Input validation present
  ☐ No hardcoded secrets
  ☐ Environment variables used
  ☐ XSS prevention implemented
  ☐ Error messages user-friendly

DOCUMENTATION:
  ☐ README.md complete
  ☐ .env.example created
  ☐ API endpoints documented
  ☐ Setup instructions clear
  ☐ Deployment guide included

READY FOR DEPLOYMENT:
  ☐ All features tested
  ☐ No console errors
  ☐ Performance acceptable
  ☐ Responsive design verified
  ☐ All interactions working
  ☐ Ready untuk production
```

---

**You now have a comprehensive, production-ready prompt untuk building Santri Connect! Semoga menghasilkan aplikasi yang amazing dan membantu pesantren dalam management santri! 🚀🎓**

---

*Last Updated: January 8, 2026 | Version 2.0 - Professional Grade | Ready for Vibe Coding*
