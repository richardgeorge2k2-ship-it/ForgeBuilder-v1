export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">
        ForgeBuilder
      </h1>

      <p className="mt-4 max-w-xl text-slate-600">
        The operational spine for real businesses.
        Infrastructure before growth. Ownership before scale.
      </p>

      <a
        href="/login"
        className="mt-8 inline-flex items-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition"
      >
        Start operating
      </a>
    </main>
  );
}
