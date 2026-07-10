"use client";

import { useState } from "react";

interface OutfitResponse {
  top: string;
  bottom: string;
  shoes: string;
  accessories: string;
  style_score: string;
  reason: string;
}

export default function Home() {
  const [occasion, setOccasion] = useState("");
  const [gender, setGender] = useState("Female");
  const [weather, setWeather] = useState("Sunny");
  const [style, setStyle] = useState("Casual");
  const [dressCode, setDressCode] = useState("Smart Casual");
  const [color, setColor] = useState("#000000");

  const [loading, setLoading] = useState(false);


  const [result, setResult] = useState<OutfitResponse>({
    top: "",
    bottom: "",
    shoes: "",
    accessories: "",
    style_score: "",
    reason: "",
  });

  const generateOutfit = async () => {
    if (!occasion.trim()) {
      alert("Please enter an occasion.");
      return;
    }

    setLoading(true);

    try {
      const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const response = await fetch(
  `${API_URL}/generate-outfit`,
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            occasion,
            gender,
            weather,
            style,
            dressCode,
            color,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

    
    } catch {
      alert("Unable to connect to backend.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-pink-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">

          <div className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 text-sm font-semibold text-pink-300">
            ✨ AI Powered Fashion Assistant
          </div>
          <h1 className="mt-6 text-6xl font-black">
            StyleAI
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            AI Powered Outfit Recommendation Engine
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">

            <h2 className="mb-6 text-2xl font-bold">
              Create Your Outfit
            </h2>

            <div className="space-y-5">
              <label className="mb-2 block text-sm font-semibold">
                Occasion
              </label>

              <input
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="Wedding, Office, Date..."
                className="w-full rounded-xl border border-white/20 bg-black/20 p-4 outline-none focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Gender
                </label>

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/20 p-4"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Weather
                </label>

                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/20 p-4"
                >
                  <option>Sunny</option>
                  <option>Rainy</option>
                  <option>Cold</option>
                  <option>Snow</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Style
                </label>

                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/20 p-4"
                >
                  <option>Casual</option>
                  <option>Formal</option>
                  <option>Luxury</option>
                  <option>Streetwear</option>
                  <option>Minimal</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Dress Code
                </label>

                <select
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/20 p-4"
                >
                  <option>Smart Casual</option>
                  <option>Business</option>
                  <option>Black Tie</option>
                  <option>Traditional</option>
                  <option>Party</option>
                </select>
              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Favorite Color
              </label>

              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-14 w-full rounded-xl border border-white/20 bg-black"
              />

            </div>

            <button
              onClick={generateOutfit}
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 py-4 text-lg font-bold transition hover:scale-[1.02]"
            >
              {loading ? "Generating..." : "✨ Generate Outfit"}
            </button>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">

            <h2 className="mb-6 text-2xl font-bold">
              AI Recommendation
            </h2>

          
            {result.top ? (

<div className="space-y-6">

  <div className="rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-slate-900 p-6">

    <h3 className="text-2xl font-bold mb-6">
      ✨ Outfit Preview
    </h3>

    <div className="grid gap-4">

      <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
        <div className="text-4xl mb-2">👔</div>
        <p className="text-sm text-gray-400">Top</p>
        <h4 className="font-semibold mt-1">
          {result.top}
        </h4>
      </div>

      <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
        <div className="text-4xl mb-2">👖</div>
        <p className="text-sm text-gray-400">Bottom</p>
        <h4 className="font-semibold mt-1">
          {result.bottom}
        </h4>
      </div>

      <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
        <div className="text-4xl mb-2">👟</div>
        <p className="text-sm text-gray-400">Shoes</p>
        <h4 className="font-semibold mt-1">
          {result.shoes}
        </h4>
      </div>

      <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
        <div className="text-4xl mb-2">💎</div>
        <p className="text-sm text-gray-400">
          Accessories
        </p>

        <h4 className="font-semibold mt-1">
          {result.accessories}
        </h4>

      </div>

    </div>

  </div>

  <div className="grid grid-cols-2 gap-4">

    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs text-gray-400">
        🌤 Weather
      </p>

      <h4 className="mt-2 font-semibold">
        {weather}
      </h4>
    </div>

    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs text-gray-400">
        🎯 Occasion
      </p>

      <h4 className="mt-2 font-semibold">
        {occasion}
      </h4>
    </div>

    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs text-gray-400">
        👗 Dress Code
      </p>

      <h4 className="mt-2 font-semibold">
        {dressCode}
      </h4>
    </div>

    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs text-gray-400">
        🎨 Favorite Color
      </p>

      <div
        className="mt-3 h-10 rounded-lg border border-white/20"
        style={{ backgroundColor: color }}
      />
    </div>

  </div>

  <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">

    <p className="text-sm text-purple-300">
      ⭐ Style Score
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {result.style_score}
    </h3>

  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

    <p className="text-sm text-gray-400">
      💡 AI Styling Reason
    </p>

    <p className="mt-3 leading-7 text-gray-200">
      {result.reason}
    </p>

  </div>

</div>

) : (
<div className="flex h-[520px] items-center justify-center rounded-2xl border border-dashed border-white/10">

<div className="text-center">

  <div className="mb-4 text-6xl">
    👗
  </div>

  <h3 className="text-xl font-bold">
    Your AI stylist is waiting
  </h3>

  <p className="mt-3 text-gray-400">
    Fill in your preferences and generate your perfect outfit.
  </p>

</div>

</div>

)}

        </div>

      </div>

    </div>

  </main>
);
}