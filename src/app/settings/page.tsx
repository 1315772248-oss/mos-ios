"use client";

import { useState, useEffect } from "react";
import { saveApiKey, getApiKey, clearApiKey } from "@/lib/secure-store";
import Link from "next/link";

export default function SettingsPage() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getApiKey().then((k) => {
      if (k) setKey("••••••••••••••••");
    });
  }, []);

  const handleSave = async () => {
    if (!key || key.includes("•••")) return;
    await saveApiKey(key);
    setStatus("✅ Key 已保存至 iOS Keychain");
    setKey("••••••••••••••••");
  };

  const handleClear = async () => {
    await clearApiKey();
    setKey("");
    setStatus("已清除");
  };

  return (
    <main className="p-6 space-y-4">
      <Link href="/" className="text-zinc-400 text-sm">
        ← 返回首页
      </Link>
      <h1 className="text-xl font-bold">DeepSeek API Key</h1>

      <div className="rounded-lg bg-zinc-900 p-4 space-y-4">
        <input
          type="password"
          placeholder="sk-..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full rounded-md bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 rounded-md bg-cyan-600 py-2 text-white active:bg-cyan-700"
          >
            保存
          </button>
          <button
            onClick={handleClear}
            className="flex-1 rounded-md bg-zinc-800 py-2 text-white active:bg-zinc-700"
          >
            清除
          </button>
        </div>
        {status && <p className="text-sm text-green-400">{status}</p>}
      </div>
    </main>
  );
}