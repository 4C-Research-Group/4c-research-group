"use client";

import { useState, useEffect } from "react";
import {
  getAllTestimonials,
  deleteTestimonialAndImage,
  type Testimonial,
} from "@/lib/supabase/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaEdit, FaTrash, FaPlus, FaQuoteLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const testimonialData = await getAllTestimonials();
      setTestimonials(testimonialData);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTestimonial(id: string) {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonialAndImage(id);
        setTestimonials((prev) =>
          prev.filter((testimonial) => testimonial.id !== id)
        );
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        alert("Failed to delete testimonial");
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cognition-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Testimonials Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage student testimonials for the Join 4C Lab page
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FaQuoteLeft className="mr-2" />
            Student Testimonials ({testimonials.length})
          </h2>
          <Link href="/admin/testimonials/new">
            <Button className="bg-cognition-600 hover:bg-cognition-700">
              <FaPlus className="mr-2" />
              Add Testimonial
            </Button>
          </Link>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                  {testimonial.image_url ? (
                    <Image
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {!testimonial.is_active && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                    &ldquo;{testimonial.quote.substring(0, 100)}...&rdquo;
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <strong>Education:</strong> {testimonial.education}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/testimonials/edit/${testimonial.id}`}>
                      <Button size="sm" variant="outline">
                        <FaEdit className="w-3 h-3" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <FaQuoteLeft className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No testimonials yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by adding your first student testimonial.
              </p>
              <Link href="/admin/testimonials/new">
                <Button className="bg-cognition-600 hover:bg-cognition-700">
                  <FaPlus className="mr-2" />
                  Add First Testimonial
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/testimonials/new">
            <Button variant="outline">
              <FaPlus className="mr-2" />
              Add New Testimonial
            </Button>
          </Link>
          <Link href="/join-4c-lab">
            <Button variant="outline">
              <FaQuoteLeft className="mr-2" />
              View Join 4C Lab Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
