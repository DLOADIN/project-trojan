"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/Dashboard/ui/card";
import { Input } from "@/app/Dashboard/ui/input";
import { Button } from "@/app/Dashboard/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Settings = () => {
  const { user, sessionToken, updateUserContext } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    if (!sessionToken) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/get_current_user`, {
        headers: { Authorization: sessionToken },
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setName(data.data.name);
        setEmail(data.data.email);
        
        // Only update context if data changed
        if (JSON.stringify(user) !== JSON.stringify(data.data)) {
          updateUserContext?.(data.data);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [sessionToken, router, updateUserContext, user]);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    if (isMounted) {
      fetchUserData();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [fetchUserData]);

  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/update_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionToken || "",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess("Profile updated successfully!");
        updateUserContext?.({ ...user!, name, email });
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred while updating.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="ml-2 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="bg-blue-50 rounded-t-2xl">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-8 py-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl py-3 px-4 text-base focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl py-3 px-4 text-base focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <Button
              onClick={handleUpdate}
              disabled={isSaving}
              className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;