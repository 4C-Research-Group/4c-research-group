# 4C Research Lab

[![Next.js](https://img.shields.io/badge/Next.js-13.4.19-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.50.2-181818?style=for-the-badge&logo=supabase)](https://supabase.com/)

## Overview

The 4C Research Lab is a modern web application dedicated to research in Cognition, Consciousness, Critical Care, and Comfort. This platform serves as a digital hub for researchers, medical professionals, and the general public to access research findings, publications, and resources related to these critical areas of healthcare and neuroscience.

## Features

### 🔍 Research Focus Areas

- **Cognition** - Exploring the mental processes of perception, memory, and problem-solving
- **Consciousness** - Investigating the nature of conscious experience and awareness
- **Critical Care** - Advancing research in intensive care medicine and patient outcomes
- **Comfort** - Studying patient comfort and quality of life in healthcare settings

### 🚀 Key Features

- **Modern, Responsive Design** - Optimized for all devices from mobile to desktop
- **User Authentication** - Secure login/signup with Supabase Auth
- **Admin Dashboard** - Comprehensive interface for content management
- **Interactive UI** - Built with Radix UI and Framer Motion for smooth animations
- **Markdown Support** - For rich content creation and display
- **Accessibility** - Built with accessibility in mind following WCAG guidelines
- **Dark/Light Mode** - Full support for both light and dark themes

### 🛠️ Technical Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with CSS Modules
- **State Management**: React Context API
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI Primitives
- **Animations**: Framer Motion
- **Icons**: Lucide Icons and Hero Icons
- **Markdown Editor**: MDX Editor
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Supabase account (for authentication and database)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/4C-Research-Group/4c-research-lab.git
   cd 4c-research-lab
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_SUPABASE_SERVICE_KEY
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
4c-research-lab/
├── app/                    # App router pages and layouts
│   ├── (pages)/           # Main application pages
│   ├── admin/             # Admin dashboard and management
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   └── ...
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── public/                # Static files
└── styles/                # Global styles and CSS modules
```

## Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact the 4C Research Group at [contact@4cresearch.org](mailto:contact@4cresearch.org).

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn how to use Supabase.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to use Tailwind CSS.

---

<div align="center">
  Made with ❤️ by the 4C Research Team
</div>
