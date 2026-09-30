import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/layout/Footer";
import { getLoginErrorMessage, loginUser } from "../services/authService";
import validateEmailAddress from "../utils/validateEmail";
import backgroundImage from "../assets/images/download.jfif";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", form: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = { email: "", password: "", form: "" };
    const email = credentials.email.trim();
    nextErrors.email = validateEmailAddress(email);
    if (!credentials.password) nextErrors.password = "Please enter your password.";
    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await loginUser({ ...credentials, email });
      login(data.token);
      navigate("/");
    } catch (error) {
      setErrors({ email: "", password: "", form: getLoginErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#FFF8EF]">
      <div className="relative z-10 flex min-h-screen w-full bg-white">
        <div className="relative hidden w-[45%] bg-cover bg-center md:block" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute right-[-2px] top-0 h-full w-[150px] bg-white" style={{ clipPath: "path('M0 0 C120 120 30 260 120 390 C170 500 50 580 0 700 L150 700 L150 0 Z')" }} />
        </div>

        <main className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10 md:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-[#2C3E50]">Horizon</h1>
              <p className="mt-3 text-lg text-[#6B7280]">Your personal LifeOS</p>
            </div>
            <h2 className="mb-7 text-3xl font-semibold text-[#2C3E50]">Log in</h2>

            {location.state?.registered && <p role="status" className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">Your account is ready. Please log in.</p>}
            {errors.form && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errors.form}</p>}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="login-email" className="mb-1 block px-4 text-sm font-medium text-[#2C3E50]">Email address <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="login-email" type="email" name="email" placeholder="Email" autoComplete="email" required value={credentials.email} onChange={handleChange} onBlur={(event) => setErrors((current) => ({ ...current, email: validateEmailAddress(event.target.value) }))} aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "login-email-error" : undefined} className="w-full rounded-full border border-[#F2D5A5] bg-[#FFF8EF] px-6 py-4 outline-none focus:ring-2 focus:ring-[#F4B643]" />
                {errors.email && <p id="login-email-error" className="mt-1 px-4 text-sm text-red-700">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="login-password" className="mb-1 block px-4 text-sm font-medium text-[#2C3E50]">Password <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="login-password" type="password" name="password" placeholder="Password" autoComplete="current-password" required value={credentials.password} onChange={handleChange} aria-required="true" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "login-password-error" : undefined} className="w-full rounded-full border border-[#F2D5A5] bg-[#FFF8EF] px-6 py-4 outline-none focus:ring-2 focus:ring-[#F4B643]" />
                {errors.password && <p id="login-password-error" className="mt-1 px-4 text-sm text-red-700">{errors.password}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#F4B643] py-4 text-lg font-semibold text-white transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60">
                {isSubmitting ? "Signing in..." : "Log in"}
              </button>
            </form>

            <div className="mt-7 flex justify-end text-sm">
              <button type="button" onClick={() => navigate("/register")} className="font-semibold text-[#C84D38] transition hover:underline">Create account</button>
            </div>
          </div>
        </main>
      </div>
      <Footer align="left" className="absolute bottom-4 left-6 z-20 text-[#B7796B] md:text-white" />
    </div>
  );
}