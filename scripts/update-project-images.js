import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateProjectImages() {
  try {
    console.log("Updating project images to use EEG/fNIRS cap photos...");

    // Define the updates for each project
    const updates = [
      {
        slug: "nuanced",
        title: "NuANCEd",
        newImage:
          "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
        newImages: [
          "/images/project-1.png",
          "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
          "/images/placeholder.jpg",
        ],
      },
      {
        slug: "transience",
        title: "TraNSIEnCe",
        newImage:
          "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
        newImages: [
          "/images/project-2.jpg",
          "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
          "/images/placeholder.jpg",
        ],
      },
      {
        slug: "predict-abi",
        title: "PREDICT ABI",
        newImage:
          "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
        newImages: [
          "/images/project-3.png",
          "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
          "/images/placeholder.jpg",
        ],
      },
    ];

    let updatedCount = 0;
    for (const update of updates) {
      console.log(`Updating ${update.title}...`);

      const { error } = await supabase
        .from("projects")
        .update({
          image: update.newImage,
          images: update.newImages,
        })
        .eq("slug", update.slug);

      if (error) {
        console.error(`Error updating ${update.title}:`, error);
      } else {
        console.log(`✓ Updated ${update.title}`);
        updatedCount++;
      }
    }

    console.log(`\nDone! Updated ${updatedCount} project(s).`);
    console.log("\nChanges made:");
    console.log(
      "- Transience, Nuanced, and Predict now use EEG/fNIRS cap photos on main research page"
    );
    console.log("- Original artistic images moved to individual project pages");
    console.log("- ABOVE and NORSE kept unchanged (they work well together)");

    // Verify the changes
    console.log("\nVerifying changes...");
    const { data: projects, error: fetchError } = await supabase
      .from("projects")
      .select("slug, title, image, images")
      .order("slug");

    if (fetchError) {
      console.error("Error fetching projects for verification:", fetchError);
    } else {
      console.log("\nCurrent project images:");
      projects.forEach((project) => {
        console.log(`${project.slug}: ${project.title}`);
        console.log(`  Main image: ${project.image}`);
        console.log(`  Additional images: ${JSON.stringify(project.images)}`);
        console.log("");
      });
    }
  } catch (error) {
    console.error("Script error:", error);
  }
}

updateProjectImages();
