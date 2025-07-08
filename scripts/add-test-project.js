import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addTestProject() {
  try {
    console.log("Adding test project...");

    const testProject = {
      slug: "test-project-image-upload",
      title: "Test Project - Image Upload Functionality",
      description:
        "This is a test project to verify the image upload functionality works correctly. It includes multiple images and all project features.",
      long_description: `
        <h2>About This Test Project</h2>
        <p>This is a comprehensive test project designed to verify that all image upload functionality works correctly in the research projects system.</p>
        
        <h3>Test Objectives</h3>
        <ul>
          <li>Verify main hero image upload and display</li>
          <li>Test additional images upload functionality</li>
          <li>Ensure proper image storage and retrieval</li>
          <li>Validate image preview in admin interface</li>
          <li>Test image display on public project page</li>
        </ul>
        
        <h3>Technical Details</h3>
        <p>This project uses Supabase storage for image management and includes various image formats and sizes to test the system's robustness.</p>
      `,
      category: "Clinical Research",
      status: "active",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      ],
      tags: [
        "Test Project",
        "Image Upload",
        "Functionality Testing",
        "Research",
      ],
      link: "https://example.com/test-project",
      funding: "Test Funding Source",
      objectives: [
        "Test main image upload functionality",
        "Verify additional images upload and management",
        "Ensure proper image display on project pages",
        "Validate image storage and retrieval from Supabase",
        "Test image preview and removal features",
      ],
      team_members: [
        { name: "Dr. Test Researcher", role: "Principal Investigator" },
        { name: "Test Assistant", role: "Research Assistant" },
        { name: "Test Student", role: "Graduate Student" },
      ],
      publications: [
        {
          title: "Test Publication on Image Upload Systems",
          link: "https://example.com/test-publication",
          date: "2024-01-15",
        },
      ],
      additional_info: `
        <h3>Additional Test Information</h3>
        <p>This section contains additional information to test the rich text editor and content display functionality.</p>
        
        <h4>Test Features</h4>
        <ul>
          <li>Rich text content support</li>
          <li>HTML formatting</li>
          <li>Multiple image handling</li>
          <li>Team member management</li>
          <li>Publication tracking</li>
        </ul>
      `,
    };

    console.log("Test project data:", JSON.stringify(testProject, null, 2));

    const { data, error } = await supabase
      .from("projects")
      .insert(testProject)
      .select()
      .single();

    if (error) {
      console.error("Error adding test project:", error);
      throw error;
    }

    console.log("✅ Test project added successfully!");
    console.log("Project ID:", data.id);
    console.log("Project Slug:", data.slug);
    console.log(
      "Public URL:",
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/research/${data.slug}`
    );
    console.log(
      "Admin Edit URL:",
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/projects/edit/${data.id}`
    );

    return data;
  } catch (error) {
    console.error("❌ Failed to add test project:", error);
    throw error;
  }
}

// Run the script
addTestProject()
  .then(() => {
    console.log("🎉 Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
