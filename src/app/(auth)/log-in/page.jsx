"use client";

import { SessionProvider } from "next-auth/react";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ShoppingCart, User, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid username or password");
    } else {
      toast.success("Login successful");
      window.location.href = "/mainpage";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-500 px-4">
      <div className="w-full max-w-sm text-center"> 

      <Image
        src="/images/542313.png"
        alt="Logo"
        width={250}
        height={250}
        className="mx-auto rounded-lg object-cover p-2"
      />

        {/* Email */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={18} />
          <input
            type="email"
            placeholder="USERNAME"
            className="w-full bg-transparent border border-white/60 text-white placeholder-white/70 px-10 py-3 rounded-md outline-none focus:border-white text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <Lock className="  absolute left-3  top-1/2 -translate-y-1/2 text-white/70" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="PASSWORD"
            className="w-full bg-transparent border border-white/60 text-white placeholder-white/70 px-10 py-3 rounded-md outline-none focus:border-white text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
          >
            {showPassword ? <EyeOff size={18} className="cursor-pointer" /> : <Eye size={18} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-blue-500  cursor-pointer py-3 rounded-md shadow hover:bg-blue-800 hover:text-white hover:shadow-2xl transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
}
