"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save } from "lucide-react";
import RichTextEditor from "@/components/ui/rich-text-editor";
import type { AboutPI } from "@/lib/types/about-pi";

export default function EditAboutPIPage() {
  const [data, setData] = useState<AboutPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/about-pi");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP ${response.status}: ${response.statusText}`
          );
        }
        const aboutData = await response.json();
        setData(aboutData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          `Failed to load about PI data: ${err instanceof Error ? err.message : "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/about-pi", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Save successful:", result);
      alert("About PI page updated successfully!");
      router.refresh();
    } catch (err) {
      console.error("Error saving:", err);
      setError(
        `Failed to save changes: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setSaving(false);
    }
  };

  const addArrayItem = (field: keyof AboutPI, item: any) => {
    if (!data) return;
    setData({
      ...data,
      [field]: [...(data[field] as any[]), item],
    });
  };

  const removeArrayItem = (field: keyof AboutPI, index: number) => {
    if (!data) return;
    setData({
      ...data,
      [field]: (data[field] as any[]).filter((_, i) => i !== index),
    });
  };

  const updateArrayItem = (
    field: keyof AboutPI,
    index: number,
    updates: any
  ) => {
    if (!data) return;
    setData({
      ...data,
      [field]: (data[field] as any[]).map((item, i) =>
        i === index ? { ...item, ...updates } : item
      ),
    });
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!data) return <div className="p-8 text-red-600">No data found.</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit About PI Page</h1>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={data.image_url}
                onChange={(e) =>
                  setData({ ...data, image_url: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="hero_description">Hero Description</Label>
              <Textarea
                id="hero_description"
                value={data.hero_description}
                onChange={(e) =>
                  setData({ ...data, hero_description: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={data.linkedin_url || ""}
                onChange={(e) =>
                  setData({ ...data, linkedin_url: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="google_scholar_url">Google Scholar URL</Label>
              <Input
                id="google_scholar_url"
                value={data.google_scholar_url || ""}
                onChange={(e) =>
                  setData({ ...data, google_scholar_url: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="researchgate_url">ResearchGate URL</Label>
              <Input
                id="researchgate_url"
                value={data.researchgate_url || ""}
                onChange={(e) =>
                  setData({ ...data, researchgate_url: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="orcid_url">ORCID URL</Label>
              <Input
                id="orcid_url"
                value={data.orcid_url || ""}
                onChange={(e) =>
                  setData({ ...data, orcid_url: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* About Content */}
        <Card>
          <CardHeader>
            <CardTitle>About Content</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={data.about_content}
              onChange={(value) => setData({ ...data, about_content: value })}
              placeholder="Write the about content with rich formatting..."
              label="About Content"
            />
          </CardContent>
        </Card>

        {/* Current Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Positions & Leadership
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("current_positions", { title: "", subtitle: "" })
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.current_positions.map((position, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Title"
                    value={position.title}
                    onChange={(e) =>
                      updateArrayItem("current_positions", index, {
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Subtitle"
                    value={position.subtitle}
                    onChange={(e) =>
                      updateArrayItem("current_positions", index, {
                        subtitle: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeArrayItem("current_positions", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Education & Training
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("education", {
                    title: "",
                    subtitle: "",
                    note: "",
                  })
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Title (e.g., Clinical-Research Fellowship, Pediatric Critical Care Medicine Residency Program)"
                    value={edu.title}
                    onChange={(e) =>
                      updateArrayItem("education", index, {
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Subtitle (e.g., University of Toronto (2017–2018))"
                    value={edu.subtitle}
                    onChange={(e) =>
                      updateArrayItem("education", index, {
                        subtitle: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Note/Awards (e.g., Outstanding – Best resident – Bronze medal)"
                    value={edu.note || ""}
                    onChange={(e) =>
                      updateArrayItem("education", index, {
                        note: e.target.value,
                      })
                    }
                    rows={2}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeArrayItem("education", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Professional Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Professional Experience
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("professional_experience", {
                    title: "",
                    subtitle: "",
                  })
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.professional_experience.map((exp, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Title (e.g., Assistant Professor)"
                    value={exp.title}
                    onChange={(e) =>
                      updateArrayItem("professional_experience", index, {
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Subtitle (e.g., Western University (Aug 2019 – Present))"
                    value={exp.subtitle}
                    onChange={(e) =>
                      updateArrayItem("professional_experience", index, {
                        subtitle: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    removeArrayItem("professional_experience", index)
                  }
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Research & Awards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Research & Awards
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("research_awards", {
                    title: "",
                    subtitle: "",
                  })
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.research_awards.map((award, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Title (e.g., Research Focus, Awards, Teaching)"
                    value={award.title}
                    onChange={(e) =>
                      updateArrayItem("research_awards", index, {
                        title: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Subtitle (e.g., Early identification and mitigation of neurological insults in critically ill children...)"
                    value={award.subtitle}
                    onChange={(e) =>
                      updateArrayItem("research_awards", index, {
                        subtitle: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeArrayItem("research_awards", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Publications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Publications
              <Button
                size="sm"
                onClick={() =>
                  addArrayItem("publications", {
                    title: "",
                    journal: "",
                    date: "",
                    summary: "",
                  })
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.publications.map((pub, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Title (e.g., Airway Pressure Release Ventilation in Pediatric Acute Respiratory Distress Syndrome)"
                    value={pub.title}
                    onChange={(e) =>
                      updateArrayItem("publications", index, {
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Journal (e.g., American Journal of Respiratory & Critical Care Medicine)"
                    value={pub.journal}
                    onChange={(e) =>
                      updateArrayItem("publications", index, {
                        journal: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Date (e.g., Nov 1, 2018)"
                    value={pub.date}
                    onChange={(e) =>
                      updateArrayItem("publications", index, {
                        date: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Summary (e.g., A randomized controlled trial comparing APRV and conventional low–tidal volume ventilation...)"
                    value={pub.summary}
                    onChange={(e) =>
                      updateArrayItem("publications", index, {
                        summary: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeArrayItem("publications", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
