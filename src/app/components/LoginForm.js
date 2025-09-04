"use client"
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { setCookie } from 'cookies-next';

export default function LoginForm() {
  const router = useRouter();
  const STATIC_EMAIL = "admin@example.com";
  const STATIC_PASSWORD = "123456";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
      // store login flag in cookie
      setCookie("loggedIn", "true");
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
