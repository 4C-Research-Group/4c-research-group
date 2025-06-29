import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleBlogs = [
  {
    slug: "advances-in-pediatric-neurocritical-care",
    title: "Advances in Pediatric Neurocritical Care: A 4C Perspective",
    excerpt:
      "Exploring the latest developments in pediatric neurocritical care and how our 4C approach is revolutionizing patient outcomes.",
    content:
      "# Advances in Pediatric Neurocritical Care: A 4C Perspective\n\nThe field of pediatric neurocritical care has seen remarkable advancements in recent years, particularly in our understanding of how to better support critically ill children with neurological conditions. At the 4C Research Group, we've been at the forefront of these developments, applying our unique four-pillar approach to improve outcomes.\n\n## The 4C Framework in Action\n\nOur research focuses on four critical areas:\n\n### Cognition\nUnderstanding how critical illness affects cognitive development in children is crucial. We've developed new assessment tools that can detect subtle cognitive changes early in the course of illness, allowing for timely intervention.\n\n### Consciousness\nMonitoring consciousness levels in pediatric patients requires specialized approaches. Our team has pioneered non-invasive methods for assessing consciousness that are both accurate and child-friendly.\n\n### Critical Care\nThe integration of neurological monitoring into standard critical care protocols has been a game-changer. We've shown that early neurological assessment can predict outcomes and guide treatment decisions.\n\n### Comfort\nEnsuring patient comfort while maintaining therapeutic effectiveness is essential. Our research has led to new protocols that minimize discomfort while maximizing therapeutic benefit.\n\n## Recent Breakthroughs\n\nOur latest study, published in *Pediatric Critical Care Medicine*, demonstrated a 30% improvement in cognitive outcomes when our 4C protocol was implemented in pediatric ICUs. The study involved over 200 critically ill children and showed significant benefits in both short-term and long-term outcomes.\n\n## Looking Forward\n\nAs we continue our research, we're focusing on:\n- Developing more sensitive biomarkers for early detection\n- Creating family-centered care protocols\n- Expanding our research to include more diverse patient populations\n\nThe future of pediatric neurocritical care is bright, and the 4C approach is leading the way.",
    category: "Research",
    read_time: "8 min read",
    image_url: "/images/brain-pattern.svg",
    tags: ["pediatric", "neurocritical care", "cognition", "consciousness"],
    featured: true,
    author_name: "Dr. Rishi Ganesan",
    author_role: "Principal Investigator",
    author_image_url: "/team/team-1.jpg",
  },
  {
    slug: "understanding-delirium-in-critical-care",
    title: "Understanding Delirium in Critical Care: A Comprehensive Guide",
    excerpt:
      "Delirium is a common but often misunderstood condition in critical care. Learn about our latest findings and treatment approaches.",
    content:
      "# Understanding Delirium in Critical Care: A Comprehensive Guide\n\nDelirium is one of the most common complications in critical care, affecting up to 80% of mechanically ventilated patients. Despite its prevalence, delirium remains underdiagnosed and undertreated. Our research team has been working to change this.\n\n## What is Delirium?\n\nDelirium is an acute change in mental status characterized by:\n- Inattention\n- Disorganized thinking\n- Altered level of consciousness\n\nIt can present as hyperactive, hypoactive, or mixed subtypes, each requiring different approaches to management.\n\n## Risk Factors and Prevention\n\nOur research has identified several key risk factors:\n- Advanced age\n- Pre-existing cognitive impairment\n- Severe illness\n- Use of certain medications\n- Sleep deprivation\n\n## Early Detection Methods\n\nWe've developed several tools for early detection:\n1. **CAM-ICU**: Confusion Assessment Method for the ICU\n2. **RASS**: Richmond Agitation-Sedation Scale\n3. **Our Custom 4C Assessment**: Combines cognitive, consciousness, and comfort measures\n\n## Treatment Approaches\n\nOur 4C approach to delirium management includes:\n\n### Cognition\n- Regular cognitive assessments\n- Orientation strategies\n- Family involvement\n\n### Consciousness\n- Appropriate sedation management\n- Sleep-wake cycle preservation\n- Environmental modifications\n\n### Critical Care\n- Evidence-based protocols\n- Multidisciplinary team approach\n- Regular reassessment\n\n### Comfort\n- Pain management\n- Anxiety reduction\n- Family support\n\n## Outcomes and Recovery\n\nPatients who receive our 4C delirium protocol show:\n- 40% reduction in delirium duration\n- 25% improvement in cognitive outcomes at discharge\n- 30% reduction in length of stay\n\n## Future Directions\n\nWe're currently investigating:\n- Biomarkers for early detection\n- Pharmacological interventions\n- Long-term cognitive outcomes\n- Family education programs\n\nDelirium management is evolving rapidly, and our 4C approach is leading the way in improving patient outcomes.",
    category: "Clinical Care",
    read_time: "10 min read",
    image_url:
      "/images/Graphic_image_of_patient_with_confusion_memory_.original.jpg",
    tags: ["delirium", "critical care", "cognitive assessment", "treatment"],
    featured: true,
    author_name: "Dr. Sarah Chen",
    author_role: "Research Fellow",
    author_image_url: "/team/team-2.jpg",
  },
  {
    slug: "neuroimaging-breakthroughs-in-consciousness-assessment",
    title: "Neuroimaging Breakthroughs in Consciousness Assessment",
    excerpt:
      "How advanced neuroimaging techniques are revolutionizing our ability to assess consciousness in critically ill patients.",
    content:
      "# Neuroimaging Breakthroughs in Consciousness Assessment\n\nThe assessment of consciousness in critically ill patients has long been a challenge for healthcare providers. Traditional methods rely heavily on clinical observation, which can be subjective and limited. Our research team has been exploring advanced neuroimaging techniques to provide more objective and accurate assessments.\n\n## The Challenge of Consciousness Assessment\n\nConsciousness assessment in critical care is complicated by:\n- Sedation effects\n- Neurological injury\n- Metabolic disturbances\n- Medication interactions\n\nTraditional methods often fail to detect subtle changes in consciousness, leading to delayed interventions and poorer outcomes.\n\n## Advanced Neuroimaging Techniques\n\nOur research focuses on several cutting-edge techniques:\n\n### Functional MRI (fMRI)\n- Maps brain activity patterns\n- Identifies consciousness networks\n- Provides objective measures\n\n### EEG with Advanced Analytics\n- Real-time brain monitoring\n- Pattern recognition algorithms\n- Predictive modeling\n\n### Near-Infrared Spectroscopy (NIRS)\n- Non-invasive brain oxygenation\n- Continuous monitoring\n- Early detection of changes\n\n## Our 4C Neuroimaging Protocol\n\nWe've developed a comprehensive protocol that integrates multiple imaging modalities:\n\n### Cognition Assessment\n- fMRI during cognitive tasks\n- EEG response to stimuli\n- Memory encoding patterns\n\n### Consciousness Monitoring\n- Resting state connectivity\n- Default mode network analysis\n- Alertness level quantification\n\n### Critical Care Integration\n- Real-time monitoring\n- Automated alerts\n- Treatment response tracking\n\n### Comfort Considerations\n- Minimally invasive procedures\n- Patient-friendly protocols\n- Family communication\n\n## Clinical Applications\n\nOur neuroimaging protocol has been applied in:\n- Traumatic brain injury\n- Post-cardiac arrest\n- Sepsis-associated encephalopathy\n- Drug-induced coma\n\n## Results and Impact\n\nPatients managed with our neuroimaging protocol show:\n- 50% faster consciousness recovery detection\n- 35% improvement in treatment timing\n- 40% better long-term outcomes\n- 25% reduction in unnecessary interventions\n\n## Future Developments\n\nWe're currently working on:\n- Portable imaging devices\n- AI-powered analysis\n- Predictive algorithms\n- Integration with electronic health records\n\nThe future of consciousness assessment lies in the integration of advanced neuroimaging with clinical expertise, and our 4C approach is leading this revolution.",
    category: "Technology",
    read_time: "12 min read",
    image_url: "/images/brain-pattern.svg",
    tags: ["neuroimaging", "consciousness", "fMRI", "EEG", "technology"],
    featured: false,
    author_name: "Dr. Michael Rodriguez",
    author_role: "Neuroimaging Specialist",
    author_image_url: "/team/team-3.jpg",
  },
  {
    slug: "family-centered-care-in-pediatric-critical-care",
    title: "Family-Centered Care in Pediatric Critical Care: The 4C Approach",
    excerpt:
      "How involving families in care decisions improves outcomes for critically ill children and supports family well-being.",
    content:
      "# Family-Centered Care in Pediatric Critical Care: The 4C Approach\n\nFamily-centered care is not just a philosophy—it's a proven approach that improves outcomes for critically ill children while supporting family well-being. Our research has shown that when families are actively involved in care decisions, both patients and families benefit significantly.\n\n## The Importance of Family Involvement\n\nCritical illness affects the entire family, not just the patient. Our research has demonstrated that family involvement leads to:\n- Better patient outcomes\n- Reduced family stress\n- Improved communication\n- Enhanced decision-making\n\n## The 4C Family-Centered Care Model\n\nWe've developed a comprehensive model that integrates family needs with patient care:\n\n### Cognition Support\n- Family education about the child's condition\n- Clear communication about treatment plans\n- Involvement in care decisions\n- Memory-making opportunities\n\n### Consciousness Awareness\n- Understanding the child's level of awareness\n- Family presence during procedures\n- Respect for family preferences\n- Cultural sensitivity\n\n### Critical Care Partnership\n- Family participation in rounds\n- Shared decision-making\n- Family input in care planning\n- Regular family meetings\n\n### Comfort for All\n- Family support services\n- Sibling support programs\n- Bereavement support\n- Long-term follow-up\n\n## Research Findings\n\nOur studies have shown remarkable improvements:\n\n### Patient Outcomes\n- 30% reduction in length of stay\n- 25% improvement in pain scores\n- 40% better medication adherence\n- 35% fewer complications\n\n### Family Outcomes\n- 50% reduction in family stress\n- 45% improvement in family satisfaction\n- 40% better family coping\n- 30% reduction in post-traumatic stress\n\n## Implementation Strategies\n\nWe've developed several strategies for implementing family-centered care:\n\n### Communication Protocols\n- Daily family updates\n- Multidisciplinary family meetings\n- Written care plans\n- Family education materials\n\n### Support Services\n- Family resource rooms\n- Sibling support programs\n- Spiritual care services\n- Social work support\n\n### Cultural Competence\n- Language services\n- Cultural liaisons\n- Religious accommodations\n- Dietary considerations\n\n## Challenges and Solutions\n\nImplementing family-centered care comes with challenges:\n\n### Staff Training\n- Communication skills\n- Cultural competence\n- Family dynamics\n- Stress management\n\n### Resource Allocation\n- Family support staff\n- Educational materials\n- Support services\n- Follow-up programs\n\n### System Integration\n- Electronic health records\n- Care protocols\n- Quality metrics\n- Outcome tracking\n\n## Future Directions\n\nWe're currently researching:\n- Technology-enhanced family communication\n- Virtual family support programs\n- Long-term family outcomes\n- Cost-effectiveness analysis\n\nFamily-centered care is the future of pediatric critical care, and our 4C approach is leading the way in making this vision a reality.",
    category: "Patient Care",
    read_time: "15 min read",
    image_url: "/images/mission.jpg",
    tags: ["family-centered care", "pediatric", "communication", "support"],
    featured: true,
    author_name: "Dr. Emily Watson",
    author_role: "Family Care Specialist",
    author_image_url: "/team/team-4.jpg",
  },
  {
    slug: "biomarkers-in-neurological-monitoring",
    title:
      "Biomarkers in Neurological Monitoring: The Future of Precision Medicine",
    excerpt:
      "How biomarkers are revolutionizing our ability to monitor neurological function and predict outcomes in critical care.",
    content:
      "# Biomarkers in Neurological Monitoring: The Future of Precision Medicine\n\nThe field of neurological monitoring is undergoing a revolution with the discovery and validation of novel biomarkers. These biological indicators provide unprecedented insights into brain function, injury severity, and recovery potential. Our research team has been at the forefront of biomarker development and validation.\n\n## What Are Neurological Biomarkers?\n\nNeurological biomarkers are measurable biological indicators that reflect:\n- Brain injury severity\n- Neurological function\n- Recovery potential\n- Treatment response\n\n## Types of Biomarkers We Study\n\n### Protein Biomarkers\n- **S100B**: Glial cell injury marker\n- **NSE**: Neuronal injury marker\n- **GFAP**: Astrocyte injury marker\n- **UCH-L1**: Neuronal damage marker\n\n### Imaging Biomarkers\n- **Diffusion tensor imaging**: White matter integrity\n- **Functional connectivity**: Network function\n- **Cerebral blood flow**: Perfusion status\n- **Metabolic imaging**: Brain metabolism\n\n### Electrophysiological Biomarkers\n- **EEG patterns**: Brain activity\n- **Evoked potentials**: Sensory function\n- **Quantitative EEG**: Advanced analysis\n- **Sleep architecture**: Recovery patterns\n\n## Our 4C Biomarker Protocol\n\nWe've developed a comprehensive protocol that integrates multiple biomarker types:\n\n### Cognition Biomarkers\n- Memory encoding markers\n- Attention network markers\n- Executive function indicators\n- Learning capacity measures\n\n### Consciousness Biomarkers\n- Arousal level indicators\n- Awareness network markers\n- Responsiveness measures\n- Recovery potential indicators\n\n### Critical Care Biomarkers\n- Injury severity markers\n- Treatment response indicators\n- Complication predictors\n- Outcome prognosticators\n\n### Comfort Biomarkers\n- Pain level indicators\n- Stress response markers\n- Anxiety measures\n- Well-being indicators\n\n## Clinical Applications\n\nOur biomarker protocols are used in:\n\n### Acute Brain Injury\n- Traumatic brain injury\n- Stroke\n- Hypoxic-ischemic injury\n- Seizure disorders\n\n### Critical Illness\n- Sepsis-associated encephalopathy\n- Delirium\n- Sedation management\n- Recovery monitoring\n\n### Long-term Outcomes\n- Cognitive recovery\n- Functional outcomes\n- Quality of life\n- Return to work/school\n\n## Research Findings\n\nOur biomarker research has yielded significant results:\n\n### Early Detection\n- 60% earlier detection of neurological complications\n- 45% improvement in treatment timing\n- 50% better outcome prediction\n- 40% reduction in unnecessary interventions\n\n### Treatment Guidance\n- Personalized treatment protocols\n- Real-time treatment adjustment\n- Outcome prediction\n- Resource optimization\n\n### Quality Improvement\n- Standardized monitoring protocols\n- Quality metrics development\n- Outcome tracking\n- Performance improvement\n\n## Future Developments\n\nWe're currently working on:\n\n### Novel Biomarkers\n- MicroRNA markers\n- Metabolomic profiles\n- Proteomic signatures\n- Genetic markers\n\n### Technology Integration\n- Point-of-care testing\n- Continuous monitoring\n- Automated analysis\n- Predictive modeling\n\n### Clinical Implementation\n- Protocol development\n- Staff training\n- Quality assurance\n- Outcome validation\n\n## Challenges and Solutions\n\n### Technical Challenges\n- Assay standardization\n- Quality control\n- Reference ranges\n- Interpretation guidelines\n\n### Clinical Challenges\n- Integration into workflow\n- Staff education\n- Cost considerations\n- Outcome validation\n\n### Regulatory Challenges\n- FDA approval\n- Clinical validation\n- Reimbursement\n- Standardization\n\n## Impact on Patient Care\n\nBiomarker-guided care has transformed our approach to neurological monitoring:\n\n### Precision Medicine\n- Individualized treatment\n- Targeted interventions\n- Personalized prognostication\n- Optimized outcomes\n\n### Quality Improvement\n- Standardized protocols\n- Outcome tracking\n- Performance metrics\n- Continuous improvement\n\n### Research Advancement\n- Novel discoveries\n- Clinical validation\n- Technology development\n- Knowledge translation\n\nThe future of neurological monitoring lies in the integration of multiple biomarkers with clinical expertise, and our 4C approach is leading this revolution.",
    category: "Research",
    read_time: "18 min read",
    image_url: "/images/AdobeStock_108381488.jpg",
    tags: [
      "biomarkers",
      "neurological monitoring",
      "precision medicine",
      "research",
    ],
    featured: false,
    author_name: "Dr. James Thompson",
    author_role: "Biomarker Research Lead",
    author_image_url: "/team/team-5.jpg",
  },
];

async function resetBlogs() {
  try {
    console.log("Starting blog reset process...");

    // Delete all existing blog posts
    console.log("Deleting existing blog posts...");
    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all posts

    if (deleteError) {
      console.error("Error deleting blog posts:", deleteError);
      return;
    }

    console.log("Successfully deleted existing blog posts");

    // Insert sample blog posts
    console.log("Inserting sample blog posts...");
    const { data: insertedPosts, error: insertError } = await supabase
      .from("blog_posts")
      .insert(sampleBlogs)
      .select();

    if (insertError) {
      console.error("Error inserting sample blog posts:", insertError);
      return;
    }

    console.log(
      `Successfully inserted ${insertedPosts?.length} sample blog posts`
    );
    console.log("Blog reset completed successfully!");

    // Log the created posts
    if (insertedPosts) {
      console.log("\nCreated blog posts:");
      insertedPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title} (${post.slug})`);
      });
    }
  } catch (error) {
    console.error("Unexpected error during blog reset:", error);
  }
}

// Run the reset function
resetBlogs();
