"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const { push } = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputVal.trim()) return;
    push(`/weather/${inputVal.trim()}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-sky-200 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-cyan-800">CITY WEATHER</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm min-w-[200px]">
      <div className="relative flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-cyan-800">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
      </svg>
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-cyan-800 placeholder:opacity-50 text-cyan-800 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="UI Kits, Dashboards..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
  type="submit"
  className="ml-4 relative inline-flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium text-white shadow-md border border-transparent bg-cyan-800 transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-pink-300 hover:text-white hover:bg-cyan-950"
>
  <span className="relative z-10">Check</span>
</button>
        </div>
      </form>
    </div>
  );
}