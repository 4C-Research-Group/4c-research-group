"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ICONS = ["brain", "flask", "heartbeat"];
const COLORS = ["cognition", "consciousness", "care"];

export default function EditHomePage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showResearch, setShowResearch] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", "home")
        .single();
      if (error) {
        setError("Failed to load home page content.");
        setLoading(false);
        return;
      }
      let parsedContent = null;
      if (typeof data?.content === "string") {
        parsedContent = JSON.parse(data.content);
      }
      setContent(parsedContent);
      setLoading(false);
    }
    fetchContent();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!content)
    return <div className="p-8 text-red-600">No content found.</div>;

  // --- Dynamic Section/Card Editing Helpers ---
  function handleSectionChange(section: string, value: any) {
    setContent((prev: any) => ({ ...prev, [section]: value }));
  }
  function handleCardChange(
    section: string,
    idx: number,
    field: string,
    value: any
  ) {
    setContent((prev: any) => {
      const cards = [...(prev[section]?.cards || [])];
      cards[idx] = { ...cards[idx], [field]: value };
      return { ...prev, [section]: { ...prev[section], cards } };
    });
  }
  function addCard(section: string) {
    setContent((prev: any) => {
      const cards = [
        ...(prev[section]?.cards || []),
        { title: "", description: "", color: COLORS[0], icon: ICONS[0] },
      ];
      return { ...prev, [section]: { ...prev[section], cards } };
    });
  }
  function removeCard(section: string, idx: number) {
    setContent((prev: any) => {
      const cards = [...(prev[section]?.cards || [])];
      cards.splice(idx, 1);
      return { ...prev, [section]: { ...prev[section], cards } };
    });
  }
  function moveCard(section: string, idx: number, dir: -1 | 1) {
    setContent((prev: any) => {
      const cards = [...(prev[section]?.cards || [])];
      if (idx + dir < 0 || idx + dir >= cards.length) return prev;
      [cards[idx], cards[idx + dir]] = [cards[idx + dir], cards[idx]];
      return { ...prev, [section]: { ...prev[section], cards } };
    });
  }

  const handleStatChange = (index, field, value) => {
    setContent((prevContent) => ({
      ...prevContent,
      stats: prevContent.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      ),
    }));
  };

  // --- Save Logic ---
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("pages")
      .update({
        content: JSON.stringify(content),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", "home");
    setSaving(false);
    if (error) {
      setError("Failed to save changes.");
    } else {
      router.refresh();
    }
  }

  // --- Render ---
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Home Page</h1>
      <form className="space-y-8" onSubmit={handleSave}>
        {/* Hero Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <input
            type="text"
            className="input w-full mb-2"
            value={content.hero?.title || ""}
            onChange={(e) =>
              handleSectionChange("hero", {
                ...content.hero,
                title: e.target.value,
              })
            }
            placeholder="Main Title"
          />
          <ReactQuill
            value={content.hero?.subtitle || ""}
            onChange={(val) =>
              handleSectionChange("hero", { ...content.hero, subtitle: val })
            }
            className="mb-2"
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={content.hero?.primaryText || ""}
            onChange={(e) =>
              handleSectionChange("hero", {
                ...content.hero,
                primaryText: e.target.value,
              })
            }
            placeholder="Primary Button Text"
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={content.hero?.primaryLink || ""}
            onChange={(e) =>
              handleSectionChange("hero", {
                ...content.hero,
                primaryLink: e.target.value,
              })
            }
            placeholder="Primary Button Link"
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={content.hero?.secondaryText || ""}
            onChange={(e) =>
              handleSectionChange("hero", {
                ...content.hero,
                secondaryText: e.target.value,
              })
            }
            placeholder="Secondary Button Text"
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={content.hero?.secondaryLink || ""}
            onChange={(e) =>
              handleSectionChange("hero", {
                ...content.hero,
                secondaryLink: e.target.value,
              })
            }
            placeholder="Secondary Button Link"
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={content.hero?.logo || ""}
            onChange={(e) =>
              handleSectionChange("hero", {
                ...content.hero,
                logo: e.target.value,
              })
            }
            placeholder="Logo Image Path"
          />
        </section>

        {/* Research Highlights Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Research Highlights</h2>
          <input
            type="text"
            className="input w-full mb-4"
            value={content.researchHighlights?.title || ""}
            onChange={(e) =>
              handleSectionChange("researchHighlights", {
                ...content.researchHighlights,
                title: e.target.value,
              })
            }
            placeholder="Section Title"
          />
          {(content.researchHighlights?.cards || []).map(
            (card: any, i: number) => (
              <div
                key={i}
                className="mb-4 p-2 border rounded flex flex-col gap-2"
              >
                <input
                  type="text"
                  className="input w-full"
                  value={card.title}
                  onChange={(e) =>
                    handleCardChange(
                      "researchHighlights",
                      i,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder={`Card ${i + 1} Title`}
                />
                <ReactQuill
                  value={card.description}
                  onChange={(val) =>
                    handleCardChange(
                      "researchHighlights",
                      i,
                      "description",
                      val
                    )
                  }
                />
                <select
                  className="input w-full"
                  value={card.color || COLORS[0]}
                  onChange={(e) =>
                    handleCardChange(
                      "researchHighlights",
                      i,
                      "color",
                      e.target.value
                    )
                  }
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  className="input w-full"
                  value={card.icon || ICONS[0]}
                  onChange={(e) =>
                    handleCardChange(
                      "researchHighlights",
                      i,
                      "icon",
                      e.target.value
                    )
                  }
                >
                  {ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => moveCard("researchHighlights", i, -1)}
                    disabled={i === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => moveCard("researchHighlights", i, 1)}
                    disabled={i === content.researchHighlights.cards.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeCard("researchHighlights", i)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )
          )}
          <Button type="button" onClick={() => addCard("researchHighlights")}>
            Add Card
          </Button>
        </section>

        {/* Services Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <input
            type="text"
            className="input w-full mb-4"
            value={content.services?.title || ""}
            onChange={(e) =>
              handleSectionChange("services", {
                ...content.services,
                title: e.target.value,
              })
            }
            placeholder="Section Title"
          />
          <ReactQuill
            value={content.services?.description || ""}
            onChange={(val) =>
              handleSectionChange("services", {
                ...content.services,
                description: val,
              })
            }
            className="mb-4"
          />
          {(content.services?.cards || []).map((card: any, i: number) => (
            <div
              key={i}
              className="mb-4 p-2 border rounded flex flex-col gap-2"
            >
              <input
                type="text"
                className="input w-full"
                value={card.title}
                onChange={(e) =>
                  handleCardChange("services", i, "title", e.target.value)
                }
                placeholder={`Card ${i + 1} Title`}
              />
              <ReactQuill
                value={card.description}
                onChange={(val) =>
                  handleCardChange("services", i, "description", val)
                }
              />
              <select
                className="input w-full"
                value={card.color || COLORS[0]}
                onChange={(e) =>
                  handleCardChange("services", i, "color", e.target.value)
                }
              >
                {COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                className="input w-full"
                value={card.icon || ICONS[0]}
                onChange={(e) =>
                  handleCardChange("services", i, "icon", e.target.value)
                }
              >
                {ICONS.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeCard("services", i)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={() => addCard("services")}>
            Add Card
          </Button>
        </section>

        {/* Research Projects Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Research Projects</h2>
          <input
            type="text"
            className="input w-full mb-4"
            value={content.projects?.title || ""}
            onChange={(e) =>
              handleSectionChange("projects", {
                ...content.projects,
                title: e.target.value,
              })
            }
            placeholder="Section Title"
          />
          {(content.projects?.cards || []).map((card: any, i: number) => (
            <div
              key={i}
              className="mb-4 p-2 border rounded flex flex-col gap-2"
            >
              <input
                type="text"
                className="input w-full"
                value={card.title}
                onChange={(e) =>
                  handleCardChange("projects", i, "title", e.target.value)
                }
                placeholder={`Project ${i + 1} Title`}
              />
              <ReactQuill
                value={card.description}
                onChange={(val) =>
                  handleCardChange("projects", i, "description", val)
                }
              />
              <input
                type="text"
                className="input w-full"
                value={card.image || ""}
                onChange={(e) =>
                  handleCardChange("projects", i, "image", e.target.value)
                }
                placeholder={`Project ${i + 1} Image URL`}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeCard("projects", i)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={() => addCard("projects")}>
            Add Project
          </Button>
        </section>

        {/* Stats Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          {(Array.isArray(content.stats) ? content.stats : []).map(
            (stat: any, i: number) => (
              <div
                key={i}
                className="mb-4 p-2 border rounded flex flex-col gap-2"
              >
                <input
                  type="text"
                  className="input w-full"
                  value={stat.label || ""}
                  onChange={(e) => handleStatChange(i, "label", e.target.value)}
                  placeholder={`Stat ${i + 1} Label`}
                />
                <input
                  type="text"
                  className="input w-full"
                  value={stat.value || ""}
                  onChange={(e) => handleStatChange(i, "value", e.target.value)}
                  placeholder={`Stat ${i + 1} Value`}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      setContent((prevContent) => ({
                        ...prevContent,
                        stats: prevContent.stats.filter(
                          (_, index) => index !== i
                        ),
                      }))
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )
          )}
          <Button
            type="button"
            onClick={() =>
              setContent((prevContent) => ({
                ...prevContent,
                stats: [...(prevContent.stats || []), { value: "", label: "" }],
              }))
            }
          >
            Add Stat
          </Button>
        </section>

        {/* News Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">News Section</h2>
          <input
            type="text"
            className="input w-full mb-4"
            value={content.news?.title || ""}
            onChange={(e) =>
              handleSectionChange("news", {
                ...content.news,
                title: e.target.value,
              })
            }
            placeholder="Section Title"
          />
        </section>

        {/* Call to Action Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Call to Action</h2>
          <input
            type="text"
            className="input w-full mb-4"
            value={content.cta?.title || ""}
            onChange={(e) =>
              handleSectionChange("cta", {
                ...content.cta,
                title: e.target.value,
              })
            }
            placeholder="Section Title"
          />
          <ReactQuill
            value={content.cta?.description || ""}
            onChange={(val) =>
              handleSectionChange("cta", { ...content.cta, description: val })
            }
            className="mb-4"
          />
          <input
            type="text"
            className="input w-full mb-4"
            value={content.cta?.primaryText || ""}
            onChange={(e) =>
              handleSectionChange("cta", {
                ...content.cta,
                primaryText: e.target.value,
              })
            }
            placeholder="Primary Button Text"
          />
          <input
            type="text"
            className="input w-full mb-4"
            value={content.cta?.primaryLink || ""}
            onChange={(e) =>
              handleSectionChange("cta", {
                ...content.cta,
                primaryLink: e.target.value,
              })
            }
            placeholder="Primary Button Link"
          />
          <input
            type="text"
            className="input w-full mb-4"
            value={content.cta?.secondaryText || ""}
            onChange={(e) =>
              handleSectionChange("cta", {
                ...content.cta,
                secondaryText: e.target.value,
              })
            }
            placeholder="Secondary Button Text"
          />
          <input
            type="text"
            className="input w-full mb-4"
            value={content.cta?.secondaryLink || ""}
            onChange={(e) =>
              handleSectionChange("cta", {
                ...content.cta,
                secondaryLink: e.target.value,
              })
            }
            placeholder="Secondary Button Link"
          />
          <input
            type="text"
            className="input w-full mb-4"
            value={content.cta?.social || ""}
            onChange={(e) =>
              handleSectionChange("cta", {
                ...content.cta,
                social: e.target.value,
              })
            }
            placeholder="Social Link (X/Twitter)"
          />
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}
