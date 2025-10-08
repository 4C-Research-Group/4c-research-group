import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const testBlogPosts = [
  {
    title: "Understanding Delirium in Critical Care: A Comprehensive Guide",
    slug: "understanding-delirium-in-critical-care",
    excerpt:
      "Explore the latest research on delirium in critical care settings, including risk factors, prevention strategies, and treatment approaches that are revolutionizing patient care.",
    content: `
      <h2>Introduction to Delirium</h2>
      <p>Delirium is a serious disturbance in mental abilities that results in confused thinking and reduced awareness of the environment. In critical care settings, it affects up to 80% of patients and is associated with increased mortality, longer hospital stays, and cognitive decline.</p>
      
      <h2>Risk Factors</h2>
      <p>Several factors contribute to the development of delirium in critical care patients:</p>
      <ul>
        <li>Advanced age</li>
        <li>Pre-existing cognitive impairment</li>
        <li>Severe illness</li>
        <li>Medication side effects</li>
        <li>Sleep deprivation</li>
        <li>Environmental factors</li>
      </ul>
      
      <h2>Prevention Strategies</h2>
      <p>Early identification and prevention are crucial in managing delirium. Our research has shown that implementing the ABCDEF bundle can significantly reduce delirium incidence:</p>
      <ul>
        <li><strong>A</strong>ssess, prevent, and manage pain</li>
        <li><strong>B</strong>oth spontaneous awakening and breathing trials</li>
        <li><strong>C</strong>hoice of analgesia and sedation</li>
        <li><strong>D</strong>elirium assessment and management</li>
        <li><strong>E</strong>arly mobility and exercise</li>
        <li><strong>F</strong>amily engagement and empowerment</li>
      </ul>
      
      <h2>Treatment Approaches</h2>
      <p>Current treatment strategies focus on addressing the underlying cause while providing supportive care. Non-pharmacological interventions are preferred, including:</p>
      <ul>
        <li>Orientation and reorientation</li>
        <li>Early mobilization</li>
        <li>Sleep hygiene</li>
        <li>Vision and hearing aids</li>
        <li>Family presence</li>
      </ul>
      
      <h2>Future Directions</h2>
      <p>Our ongoing research is exploring novel biomarkers for early detection and personalized treatment approaches. We're also investigating the role of technology in delirium prevention and management.</p>
    `,
    category: "Critical Care",
    tags: [
      "delirium",
      "critical care",
      "neurology",
      "patient care",
      "research",
    ],
    image_url:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    read_time: "8 min read",
    featured: true,
    author_name: "Dr. Sarah Chen",
    author_role: "Critical Care Neurologist",
    author_image_url:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "The Neuroscience of Consciousness: Breaking New Ground",
    slug: "neuroscience-consciousness-breaking-new-ground",
    excerpt:
      "Discover groundbreaking research on consciousness from our 4C lab, exploring the neural mechanisms that give rise to subjective experience and awareness.",
    content: `
      <h2>What is Consciousness?</h2>
      <p>Consciousness remains one of the most profound mysteries in neuroscience. It encompasses our subjective experience, self-awareness, and the ability to perceive and interact with the world around us.</p>
      
      <h2>Neural Correlates of Consciousness</h2>
      <p>Our research has identified several key brain regions and networks involved in consciousness:</p>
      <ul>
        <li>Thalamocortical system</li>
        <li>Default mode network</li>
        <li>Frontoparietal attention network</li>
        <li>Posterior hot zone</li>
      </ul>
      
      <h2>Measuring Consciousness</h2>
      <p>We've developed novel approaches to measure consciousness in both healthy individuals and patients with disorders of consciousness:</p>
      <ul>
        <li>EEG-based consciousness indices</li>
        <li>fMRI connectivity analysis</li>
        <li>Behavioral assessment tools</li>
        <li>Machine learning algorithms</li>
      </ul>
      
      <h2>Clinical Applications</h2>
      <p>Understanding consciousness has profound implications for clinical practice, particularly in:</p>
      <ul>
        <li>Anesthesia management</li>
        <li>Coma and vegetative state assessment</li>
        <li>Neurological rehabilitation</li>
        <li>Psychiatric disorders</li>
      </ul>
    `,
    category: "Consciousness",
    tags: ["consciousness", "neuroscience", "research", "brain", "awareness"],
    image_url:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    read_time: "6 min read",
    featured: true,
    author_name: "Dr. Michael Rodriguez",
    author_role: "Neuroscience Researcher",
    author_image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "Cognitive Enhancement Through Technology: The Future is Now",
    slug: "cognitive-enhancement-technology-future",
    excerpt:
      "Explore how emerging technologies are revolutionizing cognitive enhancement, from brain-computer interfaces to AI-powered cognitive training programs.",
    content: `
      <h2>The Rise of Cognitive Enhancement</h2>
      <p>Technology is transforming how we understand and enhance human cognition. From wearable devices to advanced brain-computer interfaces, the possibilities are expanding rapidly.</p>
      
      <h2>Current Technologies</h2>
      <p>Several technologies are already showing promise in cognitive enhancement:</p>
      <ul>
        <li>Transcranial electrical stimulation (tES)</li>
        <li>Neurofeedback systems</li>
        <li>Virtual reality training</li>
        <li>AI-powered cognitive games</li>
        <li>Brain-computer interfaces</li>
      </ul>
      
      <h2>Our Research Findings</h2>
      <p>Our lab has conducted extensive research on cognitive enhancement technologies:</p>
      <ul>
        <li>Improved working memory through tES</li>
        <li>Enhanced attention with neurofeedback</li>
        <li>Better learning outcomes with VR</li>
        <li>Personalized cognitive training with AI</li>
      </ul>
      
      <h2>Ethical Considerations</h2>
      <p>As these technologies advance, we must consider important ethical questions:</p>
      <ul>
        <li>Accessibility and equity</li>
        <li>Safety and long-term effects</li>
        <li>Privacy and data security</li>
        <li>Societal implications</li>
      </ul>
    `,
    category: "Cognition",
    tags: [
      "cognition",
      "technology",
      "brain-computer interface",
      "AI",
      "enhancement",
    ],
    image_url:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    read_time: "7 min read",
    featured: false,
    author_name: "Dr. Emily Watson",
    author_role: "Cognitive Neuroscientist",
    author_image_url:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "Sleep and Memory Consolidation: The Critical Connection",
    slug: "sleep-memory-consolidation-critical-connection",
    excerpt:
      "New research reveals the intricate relationship between sleep quality and memory consolidation, with implications for learning and cognitive health.",
    content: `
      <h2>The Sleep-Memory Connection</h2>
      <p>Sleep plays a crucial role in memory consolidation, the process by which new memories are stabilized and integrated into existing knowledge networks.</p>
      
      <h2>Sleep Stages and Memory</h2>
      <p>Different sleep stages contribute to different types of memory consolidation:</p>
      <ul>
        <li><strong>Slow-wave sleep (SWS):</strong> Declarative memory consolidation</li>
        <li><strong>REM sleep:</strong> Emotional memory processing</li>
        <li><strong>Stage 2 sleep:</strong> Procedural memory enhancement</li>
      </ul>
      
      <h2>Research Findings</h2>
      <p>Our studies have shown that:</p>
      <ul>
        <li>Sleep deprivation impairs memory consolidation</li>
        <li>Quality sleep enhances learning retention</li>
        <li>Sleep spindles correlate with memory performance</li>
        <li>Dreaming may facilitate memory integration</li>
      </ul>
      
      <h2>Practical Applications</h2>
      <p>These findings have important implications for:</p>
      <ul>
        <li>Educational practices</li>
        <li>Workplace productivity</li>
        <li>Mental health treatment</li>
        <li>Aging and cognitive decline</li>
      </ul>
    `,
    category: "Cognition",
    tags: ["sleep", "memory", "learning", "neuroscience", "health"],
    image_url:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop",
    read_time: "5 min read",
    featured: false,
    author_name: "Dr. James Thompson",
    author_role: "Sleep Researcher",
    author_image_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "Neuroplasticity in Adult Brains: Myths and Realities",
    slug: "neuroplasticity-adult-brains-myths-realities",
    excerpt:
      "Debunking common myths about neuroplasticity in adults and exploring the real potential for brain change throughout our lives.",
    content: `
      <h2>What is Neuroplasticity?</h2>
      <p>Neuroplasticity refers to the brain's ability to form and reorganize synaptic connections, especially in response to learning, experience, or injury.</p>
      
      <h2>Common Myths Debunked</h2>
      <p>Let's address some widespread misconceptions:</p>
      <ul>
        <li><strong>Myth:</strong> Adult brains can't change</li>
        <li><strong>Reality:</strong> Adult brains remain plastic throughout life</li>
        <li><strong>Myth:</strong> You can't learn new skills as you age</li>
        <li><strong>Reality:</strong> Learning continues, though at different rates</li>
      </ul>
      
      <h2>Evidence from Our Research</h2>
      <p>Our studies demonstrate that:</p>
      <ul>
        <li>Adults can learn new languages</li>
        <li>Musical training changes brain structure</li>
        <li>Physical exercise enhances neuroplasticity</li>
        <li>Mindfulness practices alter brain connectivity</li>
      </ul>
      
      <h2>Enhancing Neuroplasticity</h2>
      <p>Practical strategies to promote brain plasticity:</p>
      <ul>
        <li>Regular physical exercise</li>
        <li>Mental stimulation and learning</li>
        <li>Social engagement</li>
        <li>Healthy sleep habits</li>
        <li>Stress management</li>
      </ul>
    `,
    category: "Cognition",
    tags: ["neuroplasticity", "brain", "learning", "aging", "research"],
    image_url:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    read_time: "6 min read",
    featured: false,
    author_name: "Dr. Lisa Park",
    author_role: "Neuroplasticity Researcher",
    author_image_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "The Impact of Stress on Brain Function: A Comprehensive Analysis",
    slug: "impact-stress-brain-function-comprehensive-analysis",
    excerpt:
      "Understanding how chronic stress affects brain structure and function, with evidence-based strategies for stress management and brain health.",
    content: `
      <h2>Stress and the Brain</h2>
      <p>Chronic stress has profound effects on brain structure and function, affecting everything from memory to emotional regulation.</p>
      
      <h2>Neurological Effects of Stress</h2>
      <p>Research shows that chronic stress impacts:</p>
      <ul>
        <li>Hippocampus volume and function</li>
        <li>Prefrontal cortex connectivity</li>
        <li>Amygdala reactivity</li>
        <li>Neurotransmitter balance</li>
      </ul>
      
      <h2>Our Research Findings</h2>
      <p>Our studies have revealed:</p>
      <ul>
        <li>Stress accelerates brain aging</li>
        <li>Chronic stress impairs decision-making</li>
        <li>Stress affects sleep quality</li>
        <li>Stress impacts immune function</li>
      </ul>
      
      <h2>Stress Management Strategies</h2>
      <p>Evidence-based approaches to reduce stress:</p>
      <ul>
        <li>Mindfulness meditation</li>
        <li>Regular exercise</li>
        <li>Social support</li>
        <li>Cognitive behavioral therapy</li>
        <li>Sleep hygiene</li>
      </ul>
    `,
    category: "Consciousness",
    tags: ["stress", "brain", "mental health", "neuroscience", "wellness"],
    image_url:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    read_time: "7 min read",
    featured: false,
    author_name: "Dr. Robert Kim",
    author_role: "Stress Researcher",
    author_image_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    title:
      "Artificial Intelligence in Neuroscience: Current Applications and Future Prospects",
    slug: "artificial-intelligence-neuroscience-applications-prospects",
    excerpt:
      "Explore how AI is revolutionizing neuroscience research, from brain mapping to predictive modeling of neurological disorders.",
    content: `
      <h2>AI in Neuroscience</h2>
      <p>Artificial intelligence is transforming how we study and understand the brain, offering new insights and capabilities previously unimaginable.</p>
      
      <h2>Current Applications</h2>
      <p>AI is being used in various neuroscience applications:</p>
      <ul>
        <li>Brain imaging analysis</li>
        <li>Neural network modeling</li>
        <li>Drug discovery</li>
        <li>Diagnostic tools</li>
        <li>Predictive modeling</li>
      </ul>
      
      <h2>Our AI Research</h2>
      <p>Our lab is exploring:</p>
      <ul>
        <li>AI-powered brain mapping</li>
        <li>Machine learning for diagnosis</li>
        <li>Predictive models for treatment</li>
        <li>Automated data analysis</li>
      </ul>
      
      <h2>Future Prospects</h2>
      <p>The future of AI in neuroscience includes:</p>
      <ul>
        <li>Personalized medicine</li>
        <li>Brain-computer interfaces</li>
        <li>Automated research tools</li>
        <li>Enhanced diagnostics</li>
      </ul>
    `,
    category: "Cognition",
    tags: ["AI", "neuroscience", "technology", "research", "machine learning"],
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    read_time: "8 min read",
    featured: false,
    author_name: "Dr. Alex Johnson",
    author_role: "AI Neuroscientist",
    author_image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "The Gut-Brain Axis: How Your Microbiome Affects Mental Health",
    slug: "gut-brain-axis-microbiome-mental-health",
    excerpt:
      "Discover the fascinating connection between gut health and brain function, and how the microbiome influences our mental well-being.",
    content: `
      <h2>The Gut-Brain Connection</h2>
      <p>The gut-brain axis represents a complex bidirectional communication system between the gastrointestinal tract and the central nervous system.</p>
      
      <h2>How the Microbiome Affects the Brain</h2>
      <p>Research shows that gut bacteria influence:</p>
      <ul>
        <li>Neurotransmitter production</li>
        <li>Immune system function</li>
        <li>Inflammation levels</li>
        <li>Stress response</li>
        <li>Mood regulation</li>
      </ul>
      
      <h2>Our Research Findings</h2>
      <p>Our studies have revealed:</p>
      <ul>
        <li>Microbiome diversity affects cognition</li>
        <li>Gut health impacts anxiety and depression</li>
        <li>Diet influences brain function</li>
        <li>Probiotics may improve mental health</li>
      </ul>
      
      <h2>Practical Implications</h2>
      <p>These findings suggest:</p>
      <ul>
        <li>Dietary interventions for mental health</li>
        <li>Probiotic supplementation</li>
        <li>Lifestyle modifications</li>
        <li>New treatment approaches</li>
      </ul>
    `,
    category: "Consciousness",
    tags: [
      "microbiome",
      "gut-brain axis",
      "mental health",
      "nutrition",
      "research",
    ],
    image_url:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    read_time: "6 min read",
    featured: false,
    author_name: "Dr. Maria Garcia",
    author_role: "Microbiome Researcher",
    author_image_url:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
];

async function addTestBlogPosts() {
  console.log("Starting to add test blog posts...");

  for (const post of testBlogPosts) {
    try {
      const { data, error } = await supabase.from("blog_posts").insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        image_url: post.image_url,
        read_time: post.read_time,
        featured: post.featured,
        author_name: post.author_name,
        author_role: post.author_role,
        author_image_url: post.author_image_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error(`Error adding post "${post.title}":`, error);
      } else {
        console.log(`✅ Successfully added: ${post.title}`);
      }
    } catch (err) {
      console.error(`Error adding post "${post.title}":`, err);
    }
  }

  console.log("Finished adding test blog posts!");
}

// Run the script
addTestBlogPosts().catch(console.error);
