"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/Dashboard/ui/card";
import { Input } from "@/app/Dashboard/ui/input";
import { Button } from "@/app/Dashboard/ui/button";
import axios from "axios";
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if ((response.data as { success: boolean }).success) {
      localStorage.setItem("sessionToken", response.data.session_token);
      router.push("../Dashboard");
    } else {
      setError("Invalid email or password");
    }
  } catch (err) {
    setError("Login failed. Please try again.");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen absolute size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
      <Card className="w-full max-w-md bg-black text-white py-7">
        <CardHeader>
          <CardTitle className="text-center">LOGIN INTO YOUR ACCOUNT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-5 px-4 focus:ring-2 focus:ring-green-500 border border-white rounded-xl"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-5 px-4 focus:ring-2 focus:ring-green-500 border border-white rounded-xl"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button onClick={handleLogin} className="w-full pt-10 bg-green-600 hover:bg-green-700 text-white py-2 transition-all rounded">
            Login
          </Button>
        </CardContent>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="../Signup" className="text-green-700 hover:underline">
              Sign up here
            </Link>
          </p>
      </Card>
    </div>
  );
};

export default Login;