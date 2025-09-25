# Featured Blog Posts Feature

## Overview

The 4C Research Lab blog now includes a featured posts section that prominently displays important articles at the top of the blog page. This feature helps highlight key research insights and breakthrough findings.

## Features

### 1. Featured Posts Section

- **Location**: Displayed prominently at the top of the blog page, after the hero section
- **Design**: Modern card layout with enhanced visual appeal
- **Layout**: 2-column grid on large screens, single column on mobile
- **Visual Elements**:
  - Featured badge with star icon
  - Larger images with hover effects
  - Author information display
  - Like and comment counts
  - Category tags

### 2. Admin Controls

- **Create New Posts**: Checkbox to mark posts as featured during creation
- **Edit Existing Posts**: Toggle featured status in the edit form
- **Visual Indicators**: Clear labeling and descriptions

### 3. Technical Implementation

#### Database

- Uses existing `featured` boolean field in `blog_posts` table
- No additional database changes required

#### API Functions

- `getFeaturedPosts()`: Fetches all featured posts
- `getFeaturedPostsWithStats()`: Fetches featured posts with like/comment counts

#### Components

- `FeaturedBlogPosts.tsx`: Main component for displaying featured posts
- Integrated into main blog page (`app/(pages)/4c-blogs/page.tsx`)

## How to Use

### For Admins

1. **Creating a Featured Post**:
   - Go to `/admin/blog/new`
   - Fill in the post details
   - Check the "Mark as Featured Post" checkbox
   - Save the post

2. **Making an Existing Post Featured**:
   - Go to `/admin/blog/edit/[post-id]`
   - Check the "Featured Post" checkbox
   - Save changes

3. **Removing Featured Status**:
   - Go to `/admin/blog/edit/[post-id]`
   - Uncheck the "Featured Post" checkbox
   - Save changes

### For Users

- Featured posts are automatically displayed at the top of the blog page
- No additional action required
- Featured posts appear before the regular blog post grid
- "View All Articles" button scrolls to the regular blog section

## Best Practices

### Content Strategy

- **Limit Featured Posts**: Keep 2-4 featured posts for optimal impact
- **Quality Over Quantity**: Only feature high-quality, important content
- **Regular Updates**: Rotate featured posts to keep content fresh
- **Strategic Timing**: Feature posts during important research announcements

### Technical Considerations

- **Performance**: Featured posts are loaded efficiently with stats
- **Responsive Design**: Works seamlessly across all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **SEO**: Featured posts maintain proper heading hierarchy

## Styling

The featured posts section uses:

- **Colors**: Brand colors (cognition, consciousness, care)
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Consistent with site design
- **Spacing**: Generous padding and margins for visual hierarchy

## Future Enhancements

Potential improvements for the featured posts feature:

1. **Featured Post Scheduling**: Set featured status with start/end dates
2. **Featured Post Analytics**: Track engagement on featured posts
3. **A/B Testing**: Test different featured post layouts
4. **Featured Post Categories**: Organize featured posts by research area
5. **Social Sharing**: Enhanced sharing options for featured posts

## Troubleshooting

### Common Issues

1. **Featured Posts Not Showing**:
   - Check if posts have `featured: true` in the database
   - Verify the `getFeaturedPostsWithStats()` function is working
   - Check browser console for errors

2. **Styling Issues**:
   - Ensure Tailwind CSS is properly compiled
   - Check if custom CSS classes are loaded
   - Verify responsive breakpoints

3. **Admin Controls Not Working**:
   - Verify admin role permissions
   - Check form submission handling
   - Ensure database updates are successful

### Support

For technical issues or questions about the featured posts feature, please refer to the development team or create an issue in the project repository.
