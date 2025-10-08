"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

type PageContent = {
  content: string;
};
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function EditAboutPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", "about")
        .single<PageContent>();

      if (error) {
        // If the page doesn't exist, that's okay - we'll create it
        if (error.code === "PGRST116") {
          console.log("About page doesn't exist yet - will create on save");
          setContent({});
        } else {
          console.error("Database error:", error);
          setError(
            "Failed to load about page content. Please check your connection."
          );
        }
        setLoading(false);
        return;
      }

      let parsedContent = null;
      if (typeof data?.content === "string") {
        try {
          parsedContent = JSON.parse(data.content);
        } catch (parseError) {
          console.error("Error parsing content:", parseError);
          setError("Failed to parse page content. Please contact support.");
          setLoading(false);
          return;
        }
      }
      setContent(parsedContent || {});
      setLoading(false);
    }
    fetchContent();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  // Helper functions
  function handleSectionChange(section: string, value: any) {
    setContent((prev: any) => ({ ...prev, [section]: value }));
  }

  function handleNestedChange(section: string, field: string, value: any) {
    setContent((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  // Save Logic
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Check if page exists, if not create it
    const { data: existingPage } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", "about")
      .single();

    if (existingPage) {
      // Update existing page
      // Update the page with proper typing
      const { error } = await supabase
        .from("pages")
        .update({
          content: JSON.stringify(content),
          updated_at: new Date().toISOString(),
        })
        .eq("slug", "about");

      if (error) {
        setError("Failed to save changes.");
      } else {
        router.refresh();
        alert("About page updated successfully!");
      }
    } else {
      // Create new page
      const { error } = await (supabase.from("pages").insert({
        slug: "about",
        title: "About Page",
        content: JSON.stringify(content),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any) as any);

      if (error) {
        setError("Failed to create about page.");
      } else {
        router.refresh();
        alert("About page created successfully!");
      }
    }

    setSaving(false);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit About Page</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <form className="space-y-8" onSubmit={handleSave}>
        {/* Hero Section */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={content.hero?.title || ""}
                onChange={(e) =>
                  handleNestedChange("hero", "title", e.target.value)
                }
                placeholder="About 4C Research"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle (HTML supported)</Label>
              <ReactQuill
                value={content.hero?.subtitle || ""}
                onChange={(val) => handleNestedChange("hero", "subtitle", val)}
                placeholder="Advancing the frontiers of Cognition, Consciousness, and Critical Care through innovative research"
              />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Mission Section</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mission-title">Section Title</Label>
              <Input
                id="mission-title"
                value={content.mission?.title || ""}
                onChange={(e) =>
                  handleNestedChange("mission", "title", e.target.value)
                }
                placeholder="Our Mission"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="what-title">What Title</Label>
                <Input
                  id="what-title"
                  value={content.mission?.whatTitle || ""}
                  onChange={(e) =>
                    handleNestedChange("mission", "whatTitle", e.target.value)
                  }
                  placeholder="What?"
                />
              </div>
              <div>
                <Label htmlFor="how-title">How Title</Label>
                <Input
                  id="how-title"
                  value={content.mission?.howTitle || ""}
                  onChange={(e) =>
                    handleNestedChange("mission", "howTitle", e.target.value)
                  }
                  placeholder="How?"
                />
              </div>
              <div>
                <Label htmlFor="why-title">Why Title</Label>
                <Input
                  id="why-title"
                  value={content.mission?.whyTitle || ""}
                  onChange={(e) =>
                    handleNestedChange("mission", "whyTitle", e.target.value)
                  }
                  placeholder="Why?"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="what-description">
                  What Description (HTML supported)
                </Label>
                <ReactQuill
                  value={content.mission?.whatDescription || ""}
                  onChange={(val) =>
                    handleNestedChange("mission", "whatDescription", val)
                  }
                  placeholder="To improve outcomes for critically ill patients..."
                />
              </div>
              <div>
                <Label htmlFor="how-description">
                  How Description (HTML supported)
                </Label>
                <ReactQuill
                  value={content.mission?.howDescription || ""}
                  onChange={(val) =>
                    handleNestedChange("mission", "howDescription", val)
                  }
                  placeholder="Through the development and validation..."
                />
              </div>
              <div>
                <Label htmlFor="why-description">
                  Why Description (HTML supported)
                </Label>
                <ReactQuill
                  value={content.mission?.whyDescription || ""}
                  onChange={(val) =>
                    handleNestedChange("mission", "whyDescription", val)
                  }
                  placeholder="The long-term consequences of brain injury..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About Us Section</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-title">Section Title</Label>
              <Input
                id="about-title"
                value={content.aboutUs?.title || ""}
                onChange={(e) =>
                  handleNestedChange("aboutUs", "title", e.target.value)
                }
                placeholder="Our Dedicated Research"
              />
            </div>
            <div>
              <Label htmlFor="about-description">
                Description (HTML supported)
              </Label>
              <ReactQuill
                value={content.aboutUs?.description || ""}
                onChange={(val) =>
                  handleNestedChange("aboutUs", "description", val)
                }
                placeholder="Our dedicated research group focuses on..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="about-button-text">Button Text</Label>
                <Input
                  id="about-button-text"
                  value={content.aboutUs?.buttonText || ""}
                  onChange={(e) =>
                    handleNestedChange("aboutUs", "buttonText", e.target.value)
                  }
                  placeholder="View all projects"
                />
              </div>
              <div>
                <Label htmlFor="about-button-link">Button Link</Label>
                <Input
                  id="about-button-link"
                  value={content.aboutUs?.buttonLink || ""}
                  onChange={(e) =>
                    handleNestedChange("aboutUs", "buttonLink", e.target.value)
                  }
                  placeholder="/research"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="about-image">Image URL</Label>
                <Input
                  id="about-image"
                  value={content.aboutUs?.image || ""}
                  onChange={(e) =>
                    handleNestedChange("aboutUs", "image", e.target.value)
                  }
                  placeholder="/images/mission.jpg"
                />
              </div>
              <div>
                <Label htmlFor="about-image-alt">Image Alt Text</Label>
                <Input
                  id="about-image-alt"
                  value={content.aboutUs?.imageAlt || ""}
                  onChange={(e) =>
                    handleNestedChange("aboutUs", "imageAlt", e.target.value)
                  }
                  placeholder="Our Mission in Pediatric Research"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PI Section */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Principal Investigator Section
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pi-title">Section Title</Label>
                <Input
                  id="pi-title"
                  value={content.pi?.title || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "title", e.target.value)
                  }
                  placeholder="About the PI"
                />
              </div>
              <div>
                <Label htmlFor="pi-subtitle">Subtitle</Label>
                <Input
                  id="pi-subtitle"
                  value={content.pi?.subtitle || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "subtitle", e.target.value)
                  }
                  placeholder="Dr. Rishi Ganesan, MD, DM, MSc"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pi-name">Name/Title</Label>
              <Input
                id="pi-name"
                value={content.pi?.name || ""}
                onChange={(e) =>
                  handleNestedChange("pi", "name", e.target.value)
                }
                placeholder="Pediatric Intensive Care Physician-Researcher"
              />
            </div>
            <div>
              <Label htmlFor="pi-bio">Bio (HTML supported)</Label>
              <ReactQuill
                value={content.pi?.bio || ""}
                onChange={(val) => handleNestedChange("pi", "bio", val)}
                placeholder="Dr. Rishi Ganesan is a paediatric intensive care..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pi-image">Image URL</Label>
                <Input
                  id="pi-image"
                  value={content.pi?.image || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "image", e.target.value)
                  }
                  placeholder="/team/team-1.jpg"
                />
              </div>
              <div>
                <Label htmlFor="pi-image-alt">Image Alt Text</Label>
                <Input
                  id="pi-image-alt"
                  value={content.pi?.imageAlt || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "imageAlt", e.target.value)
                  }
                  placeholder="Dr. Rishi Ganesan"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pi-education">
                Education & Training (HTML supported)
              </Label>
              <ReactQuill
                value={content.pi?.education || ""}
                onChange={(val) => handleNestedChange("pi", "education", val)}
                placeholder="• MD, DM (Pediatric Critical Care), MSc (Neurosciences)"
              />
            </div>
            <div>
              <Label htmlFor="pi-research-focus">
                Research Focus (HTML supported)
              </Label>
              <ReactQuill
                value={content.pi?.researchFocus || ""}
                onChange={(val) =>
                  handleNestedChange("pi", "researchFocus", val)
                }
                placeholder="Developing EEG-based monitoring tools..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pi-profile-link">Profile Link</Label>
                <Input
                  id="pi-profile-link"
                  value={content.pi?.profileLink || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "profileLink", e.target.value)
                  }
                  placeholder="/about-pi"
                />
              </div>
              <div>
                <Label htmlFor="pi-profile-link-text">Profile Link Text</Label>
                <Input
                  id="pi-profile-link-text"
                  value={content.pi?.profileLinkText || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "profileLinkText", e.target.value)
                  }
                  placeholder="View Full Profile"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pi-team-link">Team Link</Label>
                <Input
                  id="pi-team-link"
                  value={content.pi?.teamLink || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "teamLink", e.target.value)
                  }
                  placeholder="/team"
                />
              </div>
              <div>
                <Label htmlFor="pi-team-link-text">Team Link Text</Label>
                <Input
                  id="pi-team-link-text"
                  value={content.pi?.teamLinkText || ""}
                  onChange={(e) =>
                    handleNestedChange("pi", "teamLinkText", e.target.value)
                  }
                  placeholder="View Full Team"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Research Focus Section */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Research Focus Section</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="research-title">Section Title</Label>
              <Input
                id="research-title"
                value={content.researchFocus?.title || ""}
                onChange={(e) =>
                  handleNestedChange("researchFocus", "title", e.target.value)
                }
                placeholder="Our Research Focus"
              />
            </div>
            <div>
              <Label htmlFor="research-subtitle">
                Subtitle (HTML supported)
              </Label>
              <ReactQuill
                value={content.researchFocus?.subtitle || ""}
                onChange={(val) =>
                  handleNestedChange("researchFocus", "subtitle", val)
                }
                placeholder="At 4C Research, we're dedicated to transforming patient outcomes..."
              />
            </div>
            <div>
              <Label htmlFor="research-key-areas-title">Key Areas Title</Label>
              <Input
                id="research-key-areas-title"
                value={content.researchFocus?.keyAreasTitle || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "researchFocus",
                    "keyAreasTitle",
                    e.target.value
                  )
                }
                placeholder="Key Areas"
              />
            </div>
            <div>
              <Label htmlFor="research-approach-title">Approach Title</Label>
              <Input
                id="research-approach-title"
                value={content.researchFocus?.approachTitle || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "researchFocus",
                    "approachTitle",
                    e.target.value
                  )
                }
                placeholder="Our Approach"
              />
            </div>
            <div>
              <Label htmlFor="research-approach">
                Approach Description (HTML supported)
              </Label>
              <ReactQuill
                value={content.researchFocus?.approach || ""}
                onChange={(val) =>
                  handleNestedChange("researchFocus", "approach", val)
                }
                placeholder="We combine clinical expertise with cutting-edge research..."
              />
            </div>
            <div>
              <Label htmlFor="research-key-areas">
                Key Areas (one per line)
              </Label>
              <textarea
                id="research-key-areas"
                className="w-full p-2 border rounded"
                rows={6}
                value={content.researchFocus?.keyAreas?.join("\n") || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "researchFocus",
                    "keyAreas",
                    e.target.value.split("\n").filter((line) => line.trim())
                  )
                }
                placeholder="Cognitive assessment in critical care settings&#10;Neural mechanisms of consciousness&#10;Neuroprotective strategies in critical illness&#10;Long-term cognitive outcomes in critical care survivors&#10;Advanced neuroimaging techniques in critical care"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
