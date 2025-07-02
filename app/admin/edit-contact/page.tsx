"use client";
import { useEffect, useState } from "react";
import type { ContactPage } from "@/lib/types/contact-page";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DEFAULT_CONTACT: ContactPage = {
  id: "",
  address: "",
  phone: "",
  email: "",
  research_coordinator_name: "",
  research_coordinator_email: "",
  hours: "",
  hero_title: "",
  hero_description: "",
  map_embed_url: "",
  updated_at: "",
};

export default function EditContactPage() {
  const [form, setForm] = useState<ContactPage>(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    fetch("/api/contact/page")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setForm(data))
      .catch(() =>
        setStatus({ type: "error", message: "Failed to load contact info." })
      )
      .finally(() => setLoading(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    setLoading(true);
    const { id, updated_at, ...updates } = form;
    const res = await fetch("/api/contact/page", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      setStatus({ type: "success", message: "Contact page updated!" });
    } else {
      setStatus({ type: "error", message: "Failed to update contact page." });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Contact Page</h1>
      {status.type && (
        <div
          className={`mb-4 p-3 rounded ${status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Hero Title</label>
          <Input
            name="hero_title"
            value={form.hero_title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Hero Description</label>
          <Textarea
            name="hero_description"
            value={form.hero_description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Address</label>
          <Textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Phone</label>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Email</label>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Research Coordinator Name</label>
          <Input
            name="research_coordinator_name"
            value={form.research_coordinator_name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Research Coordinator Email</label>
          <Input
            name="research_coordinator_email"
            value={form.research_coordinator_email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Hours</label>
          <Textarea
            name="hours"
            value={form.hours}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Map Embed URL</label>
          <Input
            name="map_embed_url"
            value={form.map_embed_url}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Save
        </Button>
      </form>
    </div>
  );
}
