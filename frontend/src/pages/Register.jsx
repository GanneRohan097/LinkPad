import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const tabs = [
  {
    color: "#2F4BFF",
    name: "Files",
    text: "Upload once, open it on any device.",
  },
  {
    color: "#FFD23F",
    name: "Notes",
    text: "Write on your laptop, read on your phone.",
  },
  {
    color: "#FF6B57",
    name: "Tasks",
    text: "Check things off wherever you are.",
  },
];

const field =
  "w-full border-0 border-b-2 border-[#14213D]/25 bg-transparent px-1 py-2.5 text-base text-[#14213D] outline-none transition-colors placeholder:text-[#14213D]/35 focus:border-[#14213D] focus:bg-[#FFF3B0]";

const label = "block text-sm font-semibold text-[#14213D]/70";

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-[#2F4BFF]">
        <span className="h-3.5 w-3.5 rounded-sm border-2 border-white" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[#14213D]">
        LinkPad
      </span>
    </div>
  );
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleRegistration(e) {
    e.preventDefault();
    try {
      const result = await fetch(
        "http://localhost:5000/api/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );
      const data = await result.json();
      console.log(data)
      if (!result.ok) {
        console.log("Registration failed");
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log("Unable to connect server");
    }
  }
  return (
    <div
      className="min-h-screen bg-[#E9EEF5] text-[#14213D] lg:grid lg:grid-cols-[5fr_6fr]"
      style={{
        fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        backgroundImage: "radial-gradient(#14213D22 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Left: what a pad holds */}
      <section className="hidden flex-col justify-between px-14 py-12 lg:flex">
        <Wordmark />

        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight">
            Start a pad that follows you around.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#14213D]/70">
            One login keeps your files, notes and tasks together, on every
            device you sign in from.
          </p>

          <div className="mt-10 space-y-3">
            {tabs.map((t) => (
              <div
                key={t.name}
                className="flex overflow-hidden rounded-md bg-white/70"
              >
                <span
                  className="w-2 shrink-0"
                  style={{ background: t.color }}
                />
                <div className="px-4 py-3">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-[#14213D]/65">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#14213D]/50">
          LinkPad, a personal workspace project.
        </p>
      </section>

      {/* Right: the pad */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Wordmark />
          </div>

          <div className="relative">
            {/* sheets underneath */}
            <div className="absolute inset-0 -rotate-2 rounded-md border border-[#14213D]/20 bg-white" />
            <div className="absolute inset-0 rotate-[1.5deg] rounded-md border border-[#14213D]/20 bg-white" />

            {/* top sheet */}
            <div className="relative overflow-hidden rounded-md border-2 border-[#14213D] bg-white">
              {/* binding strip */}
              <div className="flex h-9 items-center justify-around bg-[#14213D] px-10">
                <span className="h-3 w-3 rounded-full bg-[#E9EEF5]" />
                <span className="h-3 w-3 rounded-full bg-[#E9EEF5]" />
                <span className="h-3 w-3 rounded-full bg-[#E9EEF5]" />
              </div>

              <div className="px-7 pb-8 pt-7 sm:px-9">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Open a new pad
                </h2>
                <p className="mt-1.5 text-sm text-[#14213D]/65">
                  Takes a minute. You can sign in from any device afterwards.
                </p>

                <form onSubmit={handleRegistration} className="mt-7 space-y-6">
                  <div>
                    <label className={label}>Your name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Rohan"
                      className={field}
                    />
                  </div>

                  <div>
                    <label className={label}>Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="rohan@example.com"
                      className={field}
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label className={label}>Password</label>
                    </div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="At least 8 characters"
                      className={field}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md border-2 border-[#14213D] bg-[#2F4BFF] py-3.5 text-base font-bold text-white shadow-[4px_4px_0_#14213D] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#14213D] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#FFD23F]"
                  >
                    Create my pad
                  </button>
                </form>

                <p className="mt-7 text-sm text-[#14213D]/70">
                  Already have a pad?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#2F4BFF] underline underline-offset-4"
                  >
                    Sign in
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

export default Register;
