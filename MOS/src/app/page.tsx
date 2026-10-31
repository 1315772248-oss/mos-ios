import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">MOS</h1>
      <p className="text-zinc-400 text-sm">Multimodal Operating System</p>

      <div className="flex flex-col gap-3 mt-8">
        <Link
          href="/settings/"
          className="block rounded-lg bg-zinc-900 p-4 text-center active:bg-zinc-800"
        >
          ⚙️ API Key 设置
        </Link>
        <Link
          href="/security/"
          className="block rounded-lg bg-zinc-900 p-4 text-center active:bg-zinc-800"
        >
          🛡️ 安全审批中心
        </Link>
      </div>
    </main>
  );
}