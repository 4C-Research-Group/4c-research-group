// Static build auth utilities for GitHub Pages deployment
// This provides mock authentication for static builds

export const staticAuth = {
  // Mock user for static builds
  user: {
    id: 'static-user',
    email: 'demo@4c-research.org',
    role: 'admin' as const,
    user_metadata: {
      name: 'Demo User'
    }
  },

  // Mock auth functions
  signIn: async () => {
    return { user: staticAuth.user, error: null };
  },

  signUp: async () => {
    return { user: staticAuth.user, error: null };
  },

  signOut: async () => {
    return { error: null };
  },

  getUser: async () => {
    return { user: staticAuth.user, error: null };
  },

  // Check if we're in static build mode
  isStaticBuild: () => {
    return process.env.NEXT_PUBLIC_STATIC_BUILD === 'true' || 
           typeof window === 'undefined' && 
           process.env.NODE_ENV === 'production' && 
           !process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
};
