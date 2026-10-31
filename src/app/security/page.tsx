"use client";

import { useEffect, useState } from "react";
import { globalGate } from "@/lib/security-gate";
import Link from "next/link";

export default function SecurityPage() {
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    globalGate.setHitlResolver((approved) => {
      setPendingAction(null);
      setResult(approved ? "✅ 已批准" : "❌ 已拒绝或超时");
    });
  }, []);

  const triggerHighRisk = async () => {
    setResult("");
    setPendingAction("是否允许发送这条消息？");
    await globalGate.gate({ type: "send_message", risk_tier: "critical" });
  };

  return (
    <main className="p-6 space-y-4">
      <Link href="/" className="text-zinc-400 text-sm">
        ← 返回首页
      </Link>
      <h1 className="text-xl font-bold">安全审批中心</h1>

      <button
        onClick={triggerHighRisk}
        className="w-full rounded-md bg-red-700 py-3 text-white active:bg-red-800"
      >
        模拟：请求发送消息
      </button>

      {result && <p className="text-sm text-zinc-300">{result}</p>}

      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="w-full max-w-sm rounded-xl bg-zinc-900 p-6 space-y-4">
            <h2 className="text-lg font-bold">⚠️ 安全拦截 (HITL)</h2>
            <p className="text-sm text-zinc-300">{pendingAction}</p>
            <p className="text-xs text-red-400">120 秒未操作将自动拒绝</p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => globalGate.setHitlResolver?.(false)}
                className="flex-1 rounded-md bg-zinc-800 py-2 active:bg-zinc-700"
              >
                拒绝
              </button>
              <button
                onClick={() => globalGate.setHitlResolver?.(true)}
                className="flex-1 rounded-md bg-cyan-600 py-2 active:bg-cyan-700"
              >
                批准
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}