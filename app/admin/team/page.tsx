"use client";

import { useState, useEffect } from "react";
import {
  getAllTeamMembers,
  deleteTeamMember,
  type TeamMember,
} from "@/lib/supabase/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaEdit, FaTrash, FaPlus, FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const members = await getAllTeamMembers();
      setTeamMembers(members);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTeamMember(id: string) {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await deleteTeamMember(id);
        setTeamMembers((prev) => prev.filter((member) => member.id !== id));
      } catch (error) {
        console.error("Error deleting team member:", error);
        alert("Failed to delete team member");
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cognition-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Team Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Manage team members</p>
      </div>

      {/* Team Members Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FaUser className="mr-2" />
            Team Members ({teamMembers.length})
          </h2>
          <Link href="/admin/team/new">
            <Button className="bg-cognition-600 hover:bg-cognition-700">
              <FaPlus className="mr-2" />
              Add Team Member
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                {member.image_url ? (
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                    <span className="text-4xl text-white font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {member.is_principal_investigator && (
                    <Badge className="bg-cognition-600">PI</Badge>
                  )}
                  {!member.is_active && (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </CardHeader>
              <CardContent>
                {member.superpower && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    <span className="font-semibold">Superpower:</span>{" "}
                    {member.superpower}
                  </p>
                )}
                <div className="flex justify-end space-x-2">
                  <Link href={`/admin/team/edit/${member.id}`}>
                    <Button size="sm" variant="outline">
                      <FaEdit className="w-3 h-3" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteTeamMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
