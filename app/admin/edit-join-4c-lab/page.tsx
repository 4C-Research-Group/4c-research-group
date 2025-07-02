"use client";
import { useEffect, useState } from "react";
import type { Join4CLabPage } from "@/lib/types/join-4c-lab-page";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DEFAULT_JOIN: Join4CLabPage = {
  id: "",
  hero_title: "",
  hero_description: "",
  hero_email: "",
  intro_title: "",
  card1_title: "",
  card1_description: "",
  card2_title: "",
  card2_description: "",
  card3_title: "",
  card3_description: "",
  cta_title: "",
  cta_description: "",
  cta_button_text: "",
  cta_button_link: "",
  updated_at: "",
};

export default function EditJoin4CLabPage() {
  const [form, setForm] = useState<Join4CLabPage>(DEFAULT_JOIN);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    fetch("/api/join-4c-lab-page")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setForm(data))
      .catch(() =>
        setStatus({ type: "error", message: "Failed to load join page info." })
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
    const res = await fetch("/api/join-4c-lab-page", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      setStatus({ type: "success", message: "Join 4C Lab page updated!" });
    } else {
      setStatus({
        type: "error",
        message: "Failed to update join 4C Lab page.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Join 4C Lab Page</h1>
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
          <label className="font-semibold">Hero Email</label>
          <Input
            name="hero_email"
            value={form.hero_email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">Intro Title</label>
          <Input
            name="intro_title"
            value={form.intro_title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Card 1 Title</label>
            <Input
              name="card1_title"
              value={form.card1_title}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <label className="font-semibold mt-2">Card 1 Description</label>
            <Textarea
              name="card1_description"
              value={form.card1_description}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="font-semibold">Card 2 Title</label>
            <Input
              name="card2_title"
              value={form.card2_title}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <label className="font-semibold mt-2">Card 2 Description</label>
            <Textarea
              name="card2_description"
              value={form.card2_description}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="font-semibold">Card 3 Title</label>
            <Input
              name="card3_title"
              value={form.card3_title}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <label className="font-semibold mt-2">Card 3 Description</label>
            <Textarea
              name="card3_description"
              value={form.card3_description}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div>
          <label className="font-semibold">CTA Title</label>
          <Input
            name="cta_title"
            value={form.cta_title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">CTA Description</label>
          <Textarea
            name="cta_description"
            value={form.cta_description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">CTA Button Text</label>
          <Input
            name="cta_button_text"
            value={form.cta_button_text}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="font-semibold">CTA Button Link</label>
          <Input
            name="cta_button_link"
            value={form.cta_button_link}
            onChange={handleChange}
            required
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
