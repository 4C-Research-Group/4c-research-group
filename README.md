# 4C Research Lab Website

A modern, dynamic website for the 4C Research Lab showcasing research in Cognition, Consciousness, and Critical Care.

## 🚀 Live Website

The website is fully functional and ready for use by the 4C Research team.

## ✨ Features

### 🏠 **Public Pages**

- **Home Page** - Dynamic content with hero section, research highlights, and team overview
- **About Page** - Lab information, mission, and research areas
- **Research Page** - Showcase of current research projects with detailed descriptions
- **Team Page** - Team member profiles with photos, roles, and testimonials
- **Blog** - Research updates and insights with beautiful hero banner
- **Contact Page** - Contact form with email integration
- **Publications** - Research publications and citations
- **Careers** - Job opportunities and student positions

### 🔧 **Admin Features**

- **Content Management** - Edit all page content through admin dashboard
- **Blog Management** - Create, edit, and manage blog posts
- **Team Management** - Add/edit team members and testimonials
- **Project Management** - Manage research projects and updates
- **User Management** - Admin user accounts and permissions

### 🎨 **Design & UX**

- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI** - Clean, professional design with smooth animations
- **Accessibility** - WCAG compliant for inclusive access
- **SEO Optimized** - Search engine friendly with proper meta tags
- **Fast Loading** - Optimized performance and image loading

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (React)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this website, you need:

1. **Node.js** (version 18 or higher)
2. **Supabase Account** - For database and authentication
3. **Environment Variables** - Configured in `.env.local`

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/pranav-k-jha/4g-research-lab.git
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
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Service (for contact form)
RESEND_API_KEY=your_resend_api_key

# NextAuth (if using)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup

The database is already configured with:

- ✅ Users table with admin account
- ✅ Projects table with 5 research projects
- ✅ Team members table with 11 team members
- ✅ Blog posts table with sample content
- ✅ Pages table for dynamic content

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

1. **Dashboard** - Overview of website statistics
2. **Edit Pages** - Modify home, about, and other page content
3. **Blog Management** - Create and edit blog posts
4. **Team Management** - Add/edit team members and testimonials
5. **Project Management** - Update research projects
6. **User Management** - Manage admin accounts

## 📁 Project Structure

```
4c-research-lab/
├── app/                    # Next.js app directory
│   ├── (pages)/           # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── auth/              # Authentication
├── components/            # Reusable UI components
├── lib/                   # Utility functions and database
├── public/                # Static assets (images, etc.)
├── scripts/               # Database setup and maintenance
└── styles/                # Global styles
```

## 🔧 Maintenance Scripts

The project includes several maintenance scripts:

```bash
# Check database structure
node scripts/check-db.mjs

# Check projects data
node scripts/check-projects-data.mjs

# Check team data
node scripts/check-team-data.mjs

# Check blog structure
node scripts/check-blog-structure.mjs

# Add missing projects
node scripts/add-missing-projects.mjs

# Add missing team members
node scripts/add-missing-team-members.mjs
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
- ✅ Add/edit blog posts
- ✅ Manage team members
- ✅ Update research projects
- ✅ Change images and media

### For Technical Support

If you need technical assistance:

1. Check the scripts folder for maintenance tools
2. Review the database structure in Supabase
3. Contact the development team for complex changes

## 🔒 Security Features

- **Row Level Security (RLS)** - Database security policies
- **Authentication** - Secure admin access
- **Input Validation** - Form validation and sanitization
- **CORS Protection** - Cross-origin request protection
- **Environment Variables** - Secure configuration management

## 📊 Current Status

### ✅ Completed Features

- [x] Full website with all pages
- [x] Admin dashboard with content management
- [x] Database setup with sample data
- [x] Authentication system
- [x] Responsive design
- [x] Blog system with tags
- [x] Team management
- [x] Project showcase
- [x] Contact form with email
- [x] SEO optimization
- [x] Performance optimization

### 🎯 Ready for Handover

The website is **100% complete** and ready for handover to the 4C Research team. All features are functional and tested.

## 📝 Handover Checklist

- [x] ✅ Website fully functional
- [x] ✅ Database populated with sample data
- [x] ✅ Admin access configured
- [x] ✅ All pages working correctly
- [x] ✅ Mobile responsive design
- [x] ✅ Contact form operational
- [x] ✅ Blog system functional
- [x] ✅ Team management working
- [x] ✅ Project showcase complete
- [x] ✅ Documentation provided

## 🎉 Ready to Launch!

The 4C Research Lab website is ready for production use. The team can:

1. **Start using immediately** - All features are functional
2. **Customize content** - Use admin dashboard to update information
3. **Add new content** - Create blog posts, update team info, etc.
4. **Deploy to production** - Ready for live deployment

---

**Built with ❤️ for the 4C Research Lab**
_Cognition • Consciousness • Critical Care_
