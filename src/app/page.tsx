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
    <div className="p-8">
      <h1 className="text-2xl mb-4">🌍 Klimatyczny Podgląd Miasta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Wpisz miasto"
          className="text-black p-2 rounded"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Sprawdź
        </button>
      </form>
    </div>
  );
}