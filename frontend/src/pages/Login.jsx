import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { color: "#2F4BFF", name: "Files", text: "Your files stay ready wherever you sign in." },
  { color: "#FFD23F", name: "Notes", text: "Pick up your notes from any device." },
  { color: "#FF6B57", name: "Tasks", text: "Keep your work moving wherever you go." },
];

const field =
  "w-full border-0 border-b-2 border-[#14213D]/25 bg-transparent px-1 py-2.5 text-base text-[#14213D] outline-none transition-colors placeholder:text-[#14213D]/35 focus:border-[#14213D] focus:bg-[#FFF3B0] dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-slate-800";

const label = "block text-sm font-semibold text-[#14213D]/70 dark:text-slate-300";

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-[#2F4BFF]">
        <span className="h-3.5 w-3.5 rounded-sm border-2 border-white" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[#14213D] dark:text-slate-100">
        LinkPad
      </span>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(false);

    try {
      const response = await fetch(
        "https://linkpad-q82m.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        return;
      }

      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Unable to connect to server", err);
      setError(true);
    }
  }

  return (
    <div
      className="min-h-screen bg-[#E9EEF5] text-[#14213D] transition-colors dark:bg-slate-950 dark:text-slate-100 lg:grid lg:grid-cols-[5fr_6fr]"
      style={{
        fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        backgroundImage:
          "radial-gradient(#14213D22 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Left section */}
      <section className="hidden flex-col justify-between px-14 py-12 lg:flex">
        <Wordmark />

        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight">
            Pick up where you left off.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[#14213D]/70 dark:text-slate-300">
            Sign in to access your files, notes and tasks from wherever you
            are.
          </p>

          <div className="mt-10 space-y-3">
            {tabs.map((t) => (
              <div
                key={t.name}
                className="flex overflow-hidden rounded-md bg-white/70 dark:bg-slate-900"
              >
                <span
                  className="w-2 shrink-0"
                  style={{ background: t.color }}
                />

                <div className="px-4 py-3">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-[#14213D]/65 dark:text-slate-400">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#14213D]/50 dark:text-slate-500">
          LinkPad, a personal workspace project.
        </p>
      </section>

      {/* Login form */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Wordmark />
          </div>

          <div className="relative">
            <div className="absolute inset-0 -rotate-2 rounded-md border border-[#14213D]/20 bg-white dark:border-slate-700 dark:bg-slate-900" />
            <div className="absolute inset-0 rotate-[1.5deg] rounded-md border border-[#14213D]/20 bg-white dark:border-slate-700 dark:bg-slate-900" />

            <div className="relative overflow-hidden rounded-md border-2 border-[#14213D] bg-white dark:border-slate-700 dark:bg-slate-900">
              <div className="flex h-9 items-center justify-around bg-[#14213D] px-10 dark:bg-slate-800">
                <span className="h-3 w-3 rounded-full bg-[#E9EEF5]" />
                <span className="h-3 w-3 rounded-full bg-[#E9EEF5]" />
                <span className="h-3 w-3 rounded-full bg-[#E9EEF5]" />
              </div>

              <div className="px-7 pb-8 pt-7 sm:px-9">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-1.5 text-sm text-[#14213D]/65 dark:text-slate-400">
                  Sign in and get back to your workspace.
                </p>

                <form onSubmit={handleLogin} className="mt-7 space-y-6">
                  <div>
                    <label className={label}>Email</label>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="rohan@example.com"
                      className={field}
                    />
                  </div>

                  <div>
                    <label className={label}>Password</label>
                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter your password"
                      className={field}
                    />
                  </div>

                  {error && (
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      Invalid credentials or unable to connect. Please try
                      again.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-md border-2 border-[#14213D] bg-[#2F4BFF] py-3.5 text-base font-bold text-white shadow-[4px_4px_0_#14213D] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#14213D] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#FFD23F]"
                  >
                    Open my pad
                  </button>
                </form>

                <p className="mt-7 text-sm text-[#14213D]/70 dark:text-slate-300">
                  Don't have a pad yet?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-[#2F4BFF] underline underline-offset-4 dark:text-blue-400"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;