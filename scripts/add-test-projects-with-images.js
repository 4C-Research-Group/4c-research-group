import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function uploadImageToProjectsBucket(imageUrl, filename) {
  try {
    console.log(`Uploading image: ${filename}`);

    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const file = new Uint8Array(imageBuffer);

    // Upload to projects bucket
    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filename, file, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(filename);

    console.log(`✅ Successfully uploaded: ${filename}`);
    return publicUrl;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function addTestProjectsWithImages() {
  try {
    console.log("🚀 Starting to add test projects with images...\n");

    const testProjects = [
      {
        title: "Cognitive Assessment in Critical Care",
        description:
          "A comprehensive study examining cognitive function assessment tools in ICU patients, focusing on delirium detection and long-term cognitive outcomes.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This research project focuses on developing and validating cognitive assessment tools specifically designed for critical care environments. The study aims to improve early detection of cognitive impairments in ICU patients.</p>
          
          <h3>Key Objectives</h3>
          <ul>
            <li>Develop bedside cognitive assessment protocols</li>
            <li>Validate assessment tools in diverse patient populations</li>
            <li>Establish baseline cognitive function measurements</li>
            <li>Track long-term cognitive outcomes</li>
          </ul>
          
          <h3>Methodology</h3>
          <p>The study employs a mixed-methods approach combining quantitative assessments with qualitative patient feedback. We utilize advanced monitoring technologies alongside traditional cognitive tests.</p>
        `,
        category: "Clinical Research",
        status: "active",
        start_date: "2024-01-15",
        tags: ["ICU", "Delirium", "Assessment", "Cognitive Function"],
        link: "https://example.com/project1",
        slug: "cognitive-assessment-critical-care",
        funding: "National Institute of Health",
        objectives: [
          "Develop reliable cognitive assessment tools for ICU patients",
          "Establish baseline cognitive function measurements",
          "Track long-term cognitive outcomes post-ICU",
          "Improve early detection of cognitive impairments",
        ],
        team_members: [
          { name: "Dr. Sarah Johnson", role: "Principal Investigator" },
          { name: "Dr. Michael Chen", role: "Research Coordinator" },
          { name: "Emily Rodriguez", role: "Clinical Research Assistant" },
        ],
        publications: [
          {
            title: "Cognitive Assessment in Critical Care: A Systematic Review",
            link: "https://example.com/publication1",
            date: "2024-03-15",
          },
        ],
        additional_info: `
          <h3>Additional Information</h3>
          <p>This project is part of a larger initiative to improve patient outcomes in critical care settings. We collaborate with multiple hospitals and research institutions.</p>
        `,
        imageUrl:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
        ],
      },
      {
        title: "Consciousness Monitoring Systems",
        description:
          "Development of advanced monitoring systems to track consciousness levels in patients with severe brain injuries using EEG and machine learning.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This innovative project focuses on developing real-time consciousness monitoring systems using advanced EEG technology and machine learning algorithms. The goal is to provide continuous, non-invasive monitoring of consciousness levels in patients with severe brain injuries.</p>
          
          <h3>Technology Integration</h3>
          <p>We integrate multiple technologies including high-density EEG, machine learning algorithms, and real-time data processing to create a comprehensive monitoring solution.</p>
          
          <h3>Clinical Applications</h3>
          <ul>
            <li>Traumatic brain injury monitoring</li>
            <li>Coma state assessment</li>
            <li>Anesthesia depth monitoring</li>
            <li>Neurological recovery tracking</li>
          </ul>
        `,
        category: "Basic Science",
        status: "completed",
        start_date: "2023-06-01",
        end_date: "2024-03-15",
        tags: ["EEG", "Machine Learning", "Brain Injury", "Consciousness"],
        link: "https://example.com/project2",
        slug: "consciousness-monitoring-systems",
        funding: "Canadian Institutes of Health Research",
        objectives: [
          "Develop real-time consciousness monitoring algorithms",
          "Validate EEG-based consciousness assessment tools",
          "Create user-friendly monitoring interface",
          "Establish clinical protocols for implementation",
        ],
        team_members: [
          { name: "Dr. David Kim", role: "Principal Investigator" },
          { name: "Dr. Lisa Wang", role: "EEG Specialist" },
          { name: "Alex Thompson", role: "Machine Learning Engineer" },
        ],
        publications: [
          {
            title:
              "Real-time Consciousness Monitoring Using EEG and Machine Learning",
            link: "https://example.com/publication2",
            date: "2024-02-20",
          },
        ],
        additional_info: `
          <h3>Project Outcomes</h3>
          <p>This project successfully developed a prototype monitoring system that has been tested in clinical settings with promising results. The technology is now being prepared for larger clinical trials.</p>
        `,
        imageUrl:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
        ],
      },
      {
        title: "Critical Care Outcomes Research",
        description:
          "Longitudinal study investigating the relationship between critical care interventions and patient outcomes, with focus on cognitive recovery.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This comprehensive longitudinal study examines the long-term outcomes of critical care interventions, with particular emphasis on cognitive recovery and quality of life measures. The research spans multiple years and includes diverse patient populations.</p>
          
          <h3>Study Design</h3>
          <p>Multi-center, prospective cohort study with 5-year follow-up period. We collect data at multiple time points to track recovery trajectories and identify factors that influence outcomes.</p>
          
          <h3>Key Measures</h3>
          <ul>
            <li>Cognitive function assessments</li>
            <li>Quality of life questionnaires</li>
            <li>Physical function tests</li>
            <li>Mental health evaluations</li>
          </ul>
        `,
        category: "Clinical Research",
        status: "active",
        start_date: "2024-02-01",
        tags: ["Outcomes", "Longitudinal", "Recovery", "Quality of Life"],
        link: "https://example.com/project3",
        slug: "critical-care-outcomes-research",
        funding: "Heart and Stroke Foundation",
        objectives: [
          "Track long-term outcomes of critical care patients",
          "Identify factors influencing recovery trajectories",
          "Develop predictive models for patient outcomes",
          "Improve post-ICU care protocols",
        ],
        team_members: [
          { name: "Dr. Maria Garcia", role: "Principal Investigator" },
          { name: "Dr. James Wilson", role: "Statistician" },
          { name: "Sophie Chen", role: "Research Coordinator" },
        ],
        publications: [
          {
            title:
              "Long-term Outcomes in Critical Care: A 5-Year Follow-up Study",
            link: "https://example.com/publication3",
            date: "2024-01-10",
          },
        ],
        additional_info: `
          <h3>Current Status</h3>
          <p>The study is currently in its second year with over 500 patients enrolled. Preliminary results show promising trends in cognitive recovery patterns.</p>
        `,
        imageUrl:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
        ],
      },
      {
        title: "Implementation of Delirium Prevention Protocols",
        description:
          "A multi-center study to implement and evaluate delirium prevention protocols in critical care units.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This project focuses on the real-world implementation of evidence-based delirium prevention protocols across multiple ICUs. The goal is to reduce the incidence and severity of delirium in critically ill patients.</p>
          <h3>Key Activities</h3>
          <ul>
            <li>Staff training and education</li>
            <li>Protocol adaptation for local context</li>
            <li>Continuous quality monitoring</li>
          </ul>
        `,
        category: "Implementation Science",
        status: "active",
        start_date: "2024-03-01",
        tags: ["Delirium", "Implementation", "ICU", "Prevention"],
        link: "https://example.com/implementation-delirium",
        slug: "implementation-delirium-prevention",
        funding: "Hospital Innovation Fund",
        objectives: [
          "Train ICU staff on delirium prevention",
          "Adapt protocols for local needs",
          "Monitor outcomes and adjust protocols",
        ],
        team_members: [
          { name: "Dr. Priya Patel", role: "Implementation Lead" },
          { name: "Nurse John Lee", role: "ICU Nurse Champion" },
        ],
        publications: [],
        additional_info: `<p>Participating hospitals are located in three provinces.</p>`,
        imageUrl:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop",
        ],
      },
      {
        title: "Quality Improvement in Sepsis Management",
        description:
          "A quality improvement initiative to standardize and enhance sepsis management protocols in emergency departments.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This project aims to reduce sepsis-related mortality by standardizing early recognition and management protocols in emergency settings.</p>
          <h3>Interventions</h3>
          <ul>
            <li>Rapid sepsis screening tools</li>
            <li>Standardized order sets</li>
            <li>Real-time feedback dashboards</li>
          </ul>
        `,
        category: "Quality Improvement",
        status: "completed",
        start_date: "2023-01-01",
        end_date: "2023-12-31",
        tags: ["Sepsis", "Quality Improvement", "Emergency", "Protocols"],
        link: "https://example.com/quality-sepsis",
        slug: "quality-improvement-sepsis",
        funding: "Quality Care Grant",
        objectives: [
          "Implement rapid sepsis screening",
          "Standardize management protocols",
          "Monitor and report outcomes",
        ],
        team_members: [
          { name: "Dr. Ahmed El-Sayed", role: "QI Lead" },
          { name: "Dr. Laura Smith", role: "ED Physician" },
        ],
        publications: [
          {
            title:
              "Impact of Standardized Sepsis Protocols on Patient Outcomes",
            link: "https://example.com/sepsis-publication",
            date: "2023-11-15",
          },
        ],
        additional_info: `<p>Project resulted in a 15% reduction in sepsis mortality.</p>`,
        imageUrl:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd2e?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1511174511562-5f97f4f4c1b3?w=600&h=400&fit=crop",
        ],
      },
      {
        title: "Randomized Controlled Trial of New Sedation Agent",
        description:
          "A clinical trial evaluating the efficacy and safety of a novel sedation agent in mechanically ventilated patients.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This randomized controlled trial compares a new sedation agent to standard care in ICU patients requiring mechanical ventilation.</p>
          <h3>Study Design</h3>
          <ul>
            <li>Double-blind, placebo-controlled</li>
            <li>200 patients enrolled</li>
            <li>Primary outcome: time to extubation</li>
          </ul>
        `,
        category: "Clinical Trial",
        status: "upcoming",
        start_date: "2024-07-01",
        tags: ["Sedation", "RCT", "ICU", "Ventilation"],
        link: "https://example.com/sedation-trial",
        slug: "sedation-agent-trial",
        funding: "Pharma Research Fund",
        objectives: [
          "Compare new agent to standard care",
          "Assess safety and adverse events",
          "Measure time to extubation",
        ],
        team_members: [
          { name: "Dr. Hannah Kim", role: "Principal Investigator" },
          { name: "Dr. Robert Green", role: "Pharmacologist" },
        ],
        publications: [],
        additional_info: `<p>Trial registered at clinicaltrials.gov.</p>`,
        imageUrl:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
        ],
      },
      {
        title: "Pediatric Neurocritical Care Outcomes",
        description:
          "A prospective study of neurocognitive outcomes in children admitted to pediatric intensive care units.",
        long_description: `
          <h2>Project Overview</h2>
          <p>This study tracks neurocognitive development and recovery in children following critical illness, with a focus on long-term outcomes and family support.</p>
          <h3>Key Measures</h3>
          <ul>
            <li>Neurocognitive assessments at 6, 12, and 24 months</li>
            <li>Family stress and support surveys</li>
            <li>School reintegration outcomes</li>
          </ul>
        `,
        category: "Pediatric Research",
        status: "active",
        start_date: "2024-04-01",
        tags: [
          "Pediatrics",
          "Neurocritical Care",
          "Outcomes",
          "Family Support",
        ],
        link: "https://example.com/pediatric-neuro",
        slug: "pediatric-neurocritical-care",
        funding: "Children's Health Foundation",
        objectives: [
          "Track neurocognitive recovery in PICU patients",
          "Assess family support needs",
          "Improve school reintegration protocols",
        ],
        team_members: [
          { name: "Dr. Olivia Brown", role: "Pediatric Intensivist" },
          { name: "Dr. Ethan White", role: "Neuropsychologist" },
        ],
        publications: [],
        additional_info: `<p>Study includes collaboration with local schools and family support organizations.</p>`,
        imageUrl:
          "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?w=800&h=600&fit=crop",
        additionalImageUrls: [
          "https://images.unsplash.com/photo-1503437313881-503a91226419?w=600&h=400&fit=crop",
        ],
      },
    ];

    for (let i = 0; i < testProjects.length; i++) {
      const project = testProjects[i];
      console.log(`\n📋 Processing project ${i + 1}: ${project.title}`);

      // Upload main image
      const mainImageFilename = `${Date.now()}-${i}-main-${project.slug}.jpg`;
      const mainImageUrl = await uploadImageToProjectsBucket(
        project.imageUrl,
        mainImageFilename
      );

      // Upload additional images
      const additionalImageUrls = [];
      for (let j = 0; j < project.additionalImageUrls.length; j++) {
        const additionalImageFilename = `${Date.now()}-${i}-additional-${j}-${project.slug}.jpg`;
        const additionalImageUrl = await uploadImageToProjectsBucket(
          project.additionalImageUrls[j],
          additionalImageFilename
        );
        if (additionalImageUrl) {
          additionalImageUrls.push(additionalImageUrl);
        }
      }

      // Prepare project data
      const projectData = {
        slug: project.slug,
        title: project.title,
        description: project.description,
        long_description: project.long_description,
        category: project.category,
        status: project.status,
        start_date: project.start_date,
        end_date: project.end_date,
        image: mainImageUrl,
        images: additionalImageUrls,
        tags: project.tags,
        link: project.link,
        funding: project.funding,
        objectives: project.objectives,
        team_members: project.team_members,
        publications: project.publications,
        additional_info: project.additional_info,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log(`📝 Adding project to database: ${project.title}`);

      const { data, error } = await supabase
        .from("projects")
        .insert(projectData)
        .select()
        .single();

      if (error) {
        console.error(`❌ Error adding project ${project.title}:`, error);
        continue;
      }

      console.log(`✅ Successfully added project: ${project.title}`);
      console.log(`   ID: ${data.id}`);
      console.log(`   Slug: ${data.slug}`);
      console.log(`   Main Image: ${mainImageUrl ? "✅" : "❌"}`);
      console.log(`   Additional Images: ${additionalImageUrls.length}`);
      console.log(
        `   Public URL: ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/research/${data.slug}`
      );
      console.log(
        `   Admin Edit: ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/projects/edit/${data.id}`
      );
    }

    console.log("\n🎉 All test projects have been added successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Projects added: ${testProjects.length}`);
    console.log(`   - Images uploaded to projects bucket`);
    console.log(`   - Database records created`);

    console.log("\n🔍 Next steps:");
    console.log(
      "   1. Check the Supabase dashboard → Storage → projects bucket"
    );
    console.log("   2. Visit the public research page to see the projects");
    console.log("   3. Test project deletion to verify image cleanup works");
  } catch (error) {
    console.error("❌ Error in addTestProjectsWithImages:", error);
  }
}

// Run the script
addTestProjectsWithImages();
