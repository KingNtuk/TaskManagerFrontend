"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../src/slices/authSlice";
import { login } from "../../api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(form);
      console.log(res)
      if (res && res.data) {
        localStorage.setItem( "token" , res.data.token );
        dispatch(setUser(res.data));
        router.push("/tasks");
      } else {
        setError("Login failed: No response data");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center items-center mt-32 justify-center flex flex-col space-y-4">
      <form  onSubmit={handleSubmit} className="space-y-3 p-10 bg-slate-300 w-[400px] h-[400]">
      {error && <p className="text-red-500 text-sm ">{error}</p>}
        <h1 className="text-2xl font-bold mb-10 text-gray-900">Login</h1>       
          <input
            type="text"
            placeholder="email"
            className="w-full p-2 border rounded-md text-gray-800 placeholder-slate-500  "
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md text-gray-800 placeholder-slate-500 "
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-gray-400 text-sm pt-5">
        Don't have an account? <a href="/register" className="text-blue-500">Sign Up</a>
      </p>
      </form>
    </div>
  </>
  );
}
