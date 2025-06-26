import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EditHomePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Ensure the user is an admin
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "admin") {
    redirect("/dashboard");
  }

  // Fetch home page content or create it if it doesn't exist
  let { data: pageData } = await supabase
    .from("pages")
    .select("id, content")
    .eq("slug", "home")
    .single();

  if (!pageData) {
    const { data: newPageData } = await supabase
      .from("pages")
      .insert({
        title: "Home Page",
        slug: "home",
        content: JSON.stringify({}),
      })
      .select("id, content")
      .single();
    pageData = newPageData;
  }

  const content = pageData?.content ? JSON.parse(pageData.content) : {};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Home Page</h1>
      <form className="space-y-8">
        {/* Hero Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Main Title
              </label>
              <input
                type="text"
                defaultValue={content.hero?.title || ""}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Subtitle/Description
              </label>
              <textarea
                defaultValue={content.hero?.subtitle || ""}
                className="input w-full"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Button Text
              </label>
              <input
                type="text"
                defaultValue={content.hero?.primaryText || ""}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Button Link
              </label>
              <input
                type="text"
                defaultValue={content.hero?.primaryLink || ""}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Secondary Button Text
              </label>
              <input
                type="text"
                defaultValue={content.hero?.secondaryText || ""}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Secondary Button Link
              </label>
              <input
                type="text"
                defaultValue={content.hero?.secondaryLink || ""}
                className="input w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Logo Image Path
              </label>
              <input
                type="text"
                defaultValue={content.hero?.logo || "/logo.png"}
                className="input w-full"
              />
            </div>
          </div>
        </section>

        {/* Research Highlights Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Research Highlights</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Section Title
            </label>
            <input
              type="text"
              defaultValue={content.researchHighlights?.title || ""}
              className="input w-full"
            />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="mb-4 p-2 border rounded">
              <label className="block text-sm font-medium mb-1">
                Card {i + 1} Title
              </label>
              <input
                type="text"
                defaultValue={
                  content.researchHighlights?.cards?.[i]?.title || ""
                }
                className="input w-full mb-2"
              />
              <label className="block text-sm font-medium mb-1">
                Card {i + 1} Description
              </label>
              <textarea
                defaultValue={
                  content.researchHighlights?.cards?.[i]?.description || ""
                }
                className="input w-full"
                rows={2}
              />
            </div>
          ))}
        </section>

        {/* Services Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Section Title
            </label>
            <input
              type="text"
              defaultValue={content.services?.title || ""}
              className="input w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Section Description
            </label>
            <textarea
              defaultValue={content.services?.description || ""}
              className="input w-full"
              rows={2}
            />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="mb-4 p-2 border rounded">
              <label className="block text-sm font-medium mb-1">
                Card {i + 1} Title
              </label>
              <input
                type="text"
                defaultValue={content.services?.cards?.[i]?.title || ""}
                className="input w-full mb-2"
              />
              <label className="block text-sm font-medium mb-1">
                Card {i + 1} Description
              </label>
              <textarea
                defaultValue={content.services?.cards?.[i]?.description || ""}
                className="input w-full"
                rows={2}
              />
            </div>
          ))}
        </section>

        {/* Research Projects Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Research Projects</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Section Title
            </label>
            <input
              type="text"
              defaultValue={content.projects?.title || ""}
              className="input w-full"
            />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="mb-4 p-2 border rounded">
              <label className="block text-sm font-medium mb-1">
                Project {i + 1} Title
              </label>
              <input
                type="text"
                defaultValue={content.projects?.cards?.[i]?.title || ""}
                className="input w-full mb-2"
              />
              <label className="block text-sm font-medium mb-1">
                Project {i + 1} Description
              </label>
              <textarea
                defaultValue={content.projects?.cards?.[i]?.description || ""}
                className="input w-full"
                rows={2}
              />
              <label className="block text-sm font-medium mb-1">
                Project {i + 1} Image URL
              </label>
              <input
                type="text"
                defaultValue={content.projects?.cards?.[i]?.image || ""}
                className="input w-full"
              />
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="mb-4 p-2 border rounded">
              <label className="block text-sm font-medium mb-1">
                Stat {i + 1} Label
              </label>
              <input
                type="text"
                defaultValue={content.stats?.[i]?.label || ""}
                className="input w-full mb-2"
              />
              <label className="block text-sm font-medium mb-1">
                Stat {i + 1} Value
              </label>
              <input
                type="text"
                defaultValue={content.stats?.[i]?.value || ""}
                className="input w-full"
              />
            </div>
          ))}
        </section>

        {/* News Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">News Section</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Section Title
            </label>
            <input
              type="text"
              defaultValue={content.news?.title || ""}
              className="input w-full"
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Call to Action</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Section Title
            </label>
            <input
              type="text"
              defaultValue={content.cta?.title || ""}
              className="input w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              defaultValue={content.cta?.description || ""}
              className="input w-full"
              rows={2}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Primary Button Text
            </label>
            <input
              type="text"
              defaultValue={content.cta?.primaryText || ""}
              className="input w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Primary Button Link
            </label>
            <input
              type="text"
              defaultValue={content.cta?.primaryLink || ""}
              className="input w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Secondary Button Text
            </label>
            <input
              type="text"
              defaultValue={content.cta?.secondaryText || ""}
              className="input w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Secondary Button Link
            </label>
            <input
              type="text"
              defaultValue={content.cta?.secondaryLink || ""}
              className="input w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Social Link (X/Twitter)
            </label>
            <input
              type="text"
              defaultValue={content.cta?.social || ""}
              className="input w-full"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
