"use client";
import { useState } from "react";
import { register } from "../../api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); // For button disable state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true); // Show loading state

      const response = await register(form);

      if (response?.status === 201) {
        localStorage.setItem("token", response.data.token);
        alert("Registration successful! ...");
        router.push("/tasks");
      } else {
        alert(response?.data?.message || "Registration failed. Try again.");
      }
    } catch (error) {
      console.log(error.response?.data?.message)
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 space-y-4 text-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-8 bg-slate-300 w-[400px] rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-gray-900">Register</h1>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 text-gray-900 border rounded-md placeholder-gray-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 text-gray-900 border rounded-md placeholder-gray-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 text-gray-900 border rounded-md placeholder-gray-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-400 text-sm pt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
