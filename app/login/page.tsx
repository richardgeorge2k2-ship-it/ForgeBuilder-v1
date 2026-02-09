export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Sign in
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Access your ForgeBuilder workspace.
        </p>

        <div className="mt-6 space-y-4">
          <button
            type="button"
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
