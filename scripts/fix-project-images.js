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

async function fixProjectImages() {
  try {
    console.log("Fetching projects with problematic images...");
    const { data: projects, error: fetchError } = await supabase
      .from("projects")
      .select("id, title, image, images");
    if (fetchError) {
      console.error("Error fetching projects:", fetchError);
      return;
    }

    let updatedCount = 0;
    for (const project of projects) {
      let needsUpdate = false;
      let newImage = project.image;
      let newImages = project.images;

      // Fix main image
      if (
        typeof newImage === "string" &&
        newImage.startsWith("https:///images/")
      ) {
        newImage = newImage.replace("https://", ""); // becomes '/images/...'
        needsUpdate = true;
      }

      // Fix images array
      if (Array.isArray(newImages)) {
        const fixedImages = newImages.map((img) =>
          typeof img === "string" && img.startsWith("https:///images/")
            ? img.replace("https://", "")
            : img
        );
        if (JSON.stringify(fixedImages) !== JSON.stringify(newImages)) {
          newImages = fixedImages;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from("projects")
          .update({ image: newImage, images: newImages })
          .eq("id", project.id);
        if (updateError) {
          console.error(
            `Error updating project ${project.title}:`,
            updateError
          );
        } else {
          console.log(`Fixed images for project: ${project.title}`);
          updatedCount++;
        }
      }
    }
    console.log(`\nDone! Updated ${updatedCount} project(s).`);
  } catch (error) {
    console.error("Script error:", error);
  }
}

fixProjectImages();
