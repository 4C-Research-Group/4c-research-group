# 4C Research Lab Website

A modern, dynamic website for the 4C Research Lab showcasing research in Cognition, Consciousness, and Critical Care.

## 🚀 Live Website

The website is fully functional and ready for use by the 4C Research team.

## ✨ Features

### 🏠 **Public Pages**

- **Home Page** - Dynamic content with hero section, research highlights, and team overview
- **About Page** - Lab information, mission, and research areas
- **About PI Page** - Principal Investigator profile and information
- **Research Page** - Showcase of current research projects with detailed descriptions
- **Research Areas** - Specialized pages for Cognition, Consciousness, and Critical Care
- **Team Page** - Team member profiles with photos, roles, and testimonials
- **Blog** - Research updates and insights with beautiful hero banner
- **Contact Page** - Contact form with email integration
- **Publications** - Research publications and citations
- **Careers** - Job opportunities and student positions
- **Join 4C Lab** - Information for potential team members
- **Knowledge Mobilization** - Research dissemination and impact

### 🔧 **Admin Features**

- **Content Management** - Edit all page content through admin dashboard
- **Blog Management** - Create, edit, and manage blog posts with rich text editor
- **Team Management** - Add/edit team members and testimonials
- **Project Management** - Manage research projects and updates
- **User Management** - Admin user accounts and role-based permissions
- **Page Management** - Create and edit custom pages
- **Settings** - Website configuration and preferences

### 🎨 **Design & UX**

- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI** - Clean, professional design with smooth animations
- **Accessibility** - WCAG compliant for inclusive access
- **SEO Optimized** - Search engine friendly with proper meta tags
- **Fast Loading** - Optimized performance and image loading
- **Dark/Light Mode** - Theme toggle for user preference

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with role-based access
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI + Shadcn/ui components
- **Rich Text**: React Quill editor for content management
- **Email**: Resend for contact form notifications
- **Deployment**: Vercel (recommended)
- **Analytics**: Vercel Analytics and Speed Insights

## 📋 Prerequisites

Before running this website, you need:

1. **Node.js** (version 18 or higher)
2. **Supabase Account** - For database and authentication
3. **Resend Account** - For email functionality (optional)
4. **Environment Variables** - Configured in `.env.local`

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/pranav-k-jha/4c-research-lab.git
cd 4c-research-lab
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_SUPABASE_SERVICE_KEY

# Email Service (for contact form)
RESEND_API_KEY=your_resend_api_key

# NextAuth (if using)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup

The database is already configured with:

- ✅ Users table with admin account and role-based permissions
- ✅ Projects table with 5 research projects
- ✅ Team members table with 11 team members
- ✅ Blog posts table with sample content and tags
- ✅ Pages table for dynamic content management
- ✅ Comments and likes system for blog posts
- ✅ Contact page data management
- ✅ About PI page with rich text content
- ✅ Join 4C Lab page content

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### 6. Build for Production

```bash
npm run build
npm start
```

## 👥 Admin Access

### Default Admin Account

- **Email**: admin@example.com
- **Password**: (set during initial setup)

### Admin Features

1. **Dashboard** - Overview of website statistics and quick actions
2. **Edit Pages** - Modify home, about, about-pi, contact, and join-4c-lab content
3. **Blog Management** - Create and edit blog posts with rich text editor
4. **Team Management** - Add/edit team members and testimonials
5. **Project Management** - Update research projects and descriptions
6. **User Management** - Manage admin accounts and roles
7. **Settings** - Website configuration and preferences

## 📁 Project Structure

```
4c-research-lab/
├── app/                          # Next.js app directory
│   ├── (pages)/                  # Public pages
│   │   ├── [slug]/               # Dynamic blog pages
│   │   ├── 4c-blogs/             # Blog listing and individual posts
│   │   ├── about/                # About page
│   │   ├── about-pi/             # Principal Investigator page
│   │   ├── careers/              # Careers page
│   │   ├── contact/              # Contact page
│   │   ├── home/                 # Home page
│   │   ├── join-4c-lab/          # Join 4C Lab page
│   │   ├── knowledge-mobilization/ # Knowledge mobilization page
│   │   ├── publications/         # Publications page
│   │   ├── research/             # Research projects page
│   │   ├── research-4c/          # Research areas (cognition, consciousness, critical-care)
│   │   ├── research-diagram/     # Research diagram page
│   │   └── team/                 # Team page
│   ├── admin/                    # Admin dashboard
│   │   ├── blog/                 # Blog management
│   │   ├── edit-*/               # Page editing interfaces
│   │   ├── pages/                # Page management
│   │   ├── projects/             # Project management
│   │   ├── research/             # Research editing
│   │   ├── settings/             # Settings management
│   │   ├── team/                 # Team management
│   │   ├── testimonials/         # Testimonial management
│   │   └── users/                # User management
│   ├── api/                      # API routes
│   │   ├── about-pi/             # About PI API
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── check-admin/          # Admin verification
│   │   ├── comment-likes/        # Comment likes API
│   │   ├── comments/             # Comments API
│   │   ├── contact/              # Contact form API
│   │   ├── insights/             # Analytics insights
│   │   ├── join-4c-lab-page/     # Join 4C Lab page API
│   │   ├── likes/                # Blog likes API
│   │   └── publications/         # Publications API
│   ├── dashboard/                # User dashboard
│   ├── forgot-password/          # Password recovery
│   ├── login/                    # Login page
│   ├── login-otp/                # OTP login
│   ├── signup/                   # Registration
│   └── update-password/          # Password update
├── components/                   # Reusable UI components
│   ├── admin/                    # Admin-specific components
│   ├── auth/                     # Authentication components
│   ├── comments/                 # Comment system components
│   ├── ui/                       # Shadcn/ui components
│   └── *.tsx                     # General components
├── lib/                          # Utility functions and database
│   ├── supabase/                 # Supabase client and functions
│   │   ├── admin/                # Admin-specific database functions
│   │   └── *.ts                  # Database utilities
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── public/                       # Static assets
│   ├── images/                   # Website images
│   ├── partners/                 # Partner logos
│   └── team/                     # Team member photos
├── scripts/                      # Database setup and maintenance
│   ├── setup-*.sql               # Database schema setup
│   ├── fix-*.sql                 # Database fixes
│   └── *.mjs                     # Maintenance scripts
├── middleware.ts                 # Next.js middleware
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🔧 Maintenance Scripts

The project includes several maintenance scripts:

```bash
# Database setup scripts
node scripts/setup-profiles.sql
node scripts/setup-projects-table.sql
node scripts/setup-team-tables.sql
node scripts/setup-blog-posts-table.sql
node scripts/setup-comment-likes.sql
node scripts/setup-contact-page-table.sql
node scripts/setup-join-4c-lab-page-table.sql
node scripts/setup-about-pi-table.sql

# Database maintenance scripts
node scripts/fix-blog-posts-rls.sql
node scripts/fix-about-pi-rls.sql
node scripts/fix-about-pi-duplicates.sql
node scripts/update-about-pi-rich-text.sql

# Data update scripts
node scripts/update-education-data.sql
node scripts/update-professional-experience-data.sql
node scripts/update-publications-data.sql
node scripts/update-research-awards-data.sql

# Testing scripts
node scripts/test-about-pi-connection.sql
node scripts/check-about-pi-rls.sql
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The website can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📞 Support & Maintenance

### For Non-Technical Users

The website is designed to be self-maintainable through the admin dashboard. You can:

- ✅ Update all page content without coding
- ✅ Add/edit blog posts with rich text editor
- ✅ Manage team members and testimonials
- ✅ Update research projects and descriptions
- ✅ Change images and media
- ✅ Manage user accounts and permissions

### For Technical Support

If you need technical assistance:

1. Check the scripts folder for maintenance tools
2. Review the database structure in Supabase
3. Contact the development team for complex changes

## 🔒 Security Features

- **Row Level Security (RLS)** - Database security policies
- **Authentication** - Secure admin access with role-based permissions
- **Input Validation** - Form validation and sanitization
- **CORS Protection** - Cross-origin request protection
- **Environment Variables** - Secure configuration management
- **Middleware Protection** - Route protection and authentication checks

## 📊 Current Status

### ✅ Completed Features

- [x] Full website with all pages and dynamic routing
- [x] Admin dashboard with comprehensive content management
- [x] Database setup with sample data and proper relationships
- [x] Authentication system with role-based access
- [x] Responsive design with mobile-first approach
- [x] Blog system with tags, comments, and likes
- [x] Team management with testimonials
- [x] Project showcase with detailed descriptions
- [x] Contact form with email integration
- [x] SEO optimization with meta tags
- [x] Performance optimization with image optimization
- [x] Rich text editing for content management
- [x] Dark/light mode theme toggle
- [x] Accessibility features (WCAG compliant)

### 🎯 Ready for Handover

The website is **100% complete** and ready for handover to the 4C Research team. All features are functional and tested.

## 📝 Handover Checklist

- [x] ✅ Website fully functional with all pages
- [x] ✅ Database populated with sample data and proper relationships
- [x] ✅ Admin access configured with role-based permissions
- [x] ✅ All pages working correctly with dynamic content
- [x] ✅ Mobile responsive design across all devices
- [x] ✅ Contact form operational with email notifications
- [x] ✅ Blog system functional with comments and likes
- [x] ✅ Team management working with testimonials
- [x] ✅ Project showcase complete with detailed descriptions
- [x] ✅ Rich text editing for content management
- [x] ✅ Security features implemented and tested
- [x] ✅ Documentation provided (README, Handover Guide, Status Report)

## 🎉 Ready to Launch!

The 4C Research Lab website is ready for production use. The team can:

1. **Start using immediately** - All features are functional
2. **Customize content** - Use admin dashboard to update information
3. **Add new content** - Create blog posts, update team info, etc.
4. **Deploy to production** - Ready for live deployment
5. **Manage users** - Add/remove admin users as needed

---

**Built with ❤️ for the 4C Research Lab**
_Cognition • Consciousness • Critical Care_
