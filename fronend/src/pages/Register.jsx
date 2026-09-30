import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { getRegistrationErrorMessage, registerUser } from "../services/authService";
import validateEmailAddress from "../utils/validateEmail";
import backgroundImage from "../assets/images/download.jfif";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ username: "", email: "", password: "", confirmPassword: "", form: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", ...(name === "password" ? { confirmPassword: "" } : {}), form: "" }));
  }

  async function handleRegister(event) {
    event.preventDefault();
    const nextErrors = { username: "", email: "", password: "", confirmPassword: "", form: "" };
    const email = formData.email.trim();
    if (!formData.username.trim()) nextErrors.username = "Please enter a username.";
    nextErrors.email = validateEmailAddress(email);
    if (!formData.password) nextErrors.password = "Please enter a password.";
    if (!formData.confirmPassword) nextErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser({ username: formData.username.trim(), email, password: formData.password });
      navigate("/login", { state: { registered: true } });
    } catch (error) {
      setErrors({ username: "", email: "", password: "", confirmPassword: "", form: getRegistrationErrorMessage(error) });
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

        <main className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 md:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-[#2C3E50]">Horizon</h1>
              <p className="mt-3 text-lg text-[#6B7280]">Your personal LifeOS</p>
            </div>
            <h2 className="mb-6 text-3xl font-semibold text-[#2C3E50]">Create account</h2>
            {errors.form && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errors.form}</p>}

            <form onSubmit={handleRegister} noValidate className="space-y-3">
              <div>
                <label htmlFor="register-username" className="mb-1 block px-4 text-sm font-medium text-[#2C3E50]">Username <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="register-username" name="username" type="text" autoComplete="username" placeholder="Username" required value={formData.username} onChange={handleChange} aria-required="true" aria-invalid={Boolean(errors.username)} aria-describedby={errors.username ? "register-username-error" : undefined} className="w-full rounded-full border border-[#F2D5A5] bg-[#FFF8EF] px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#F4B643]" />
                {errors.username && <p id="register-username-error" className="mt-1 px-4 text-sm text-red-700">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="register-email" className="mb-1 block px-4 text-sm font-medium text-[#2C3E50]">Email address <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="register-email" name="email" type="email" autoComplete="email" placeholder="Email" required value={formData.email} onChange={handleChange} onBlur={(event) => setErrors((current) => ({ ...current, email: validateEmailAddress(event.target.value) }))} aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "register-email-error" : undefined} className="w-full rounded-full border border-[#F2D5A5] bg-[#FFF8EF] px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#F4B643]" />
                {errors.email && <p id="register-email-error" className="mt-1 px-4 text-sm text-red-700">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="register-password" className="mb-1 block px-4 text-sm font-medium text-[#2C3E50]">Password <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="register-password" name="password" type="password" autoComplete="new-password" placeholder="Password" required value={formData.password} onChange={handleChange} aria-required="true" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "register-password-error" : undefined} className="w-full rounded-full border border-[#F2D5A5] bg-[#FFF8EF] px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#F4B643]" />
                {errors.password && <p id="register-password-error" className="mt-1 px-4 text-sm text-red-700">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="register-confirm-password" className="mb-1 block px-4 text-sm font-medium text-[#2C3E50]">Confirm password <span aria-hidden="true" className="text-red-600">*</span></label>
                <input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Confirm password" required value={formData.confirmPassword} onChange={handleChange} aria-required="true" aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? "register-confirm-error" : undefined} className="w-full rounded-full border border-[#F2D5A5] bg-[#FFF8EF] px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#F4B643]" />
                {errors.confirmPassword && <p id="register-confirm-error" className="mt-1 px-4 text-sm text-red-700">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#F4B643] py-4 text-lg font-semibold text-white transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60">
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-7 flex justify-end text-sm">
              <button type="button" onClick={() => navigate("/login")} className="font-semibold text-[#C84D38] transition hover:underline">Already have an account? Log in</button>
            </div>
          </div>
        </main>
      </div>
      <Footer align="left" className="absolute bottom-4 left-6 z-20 text-[#B7796B] md:text-white" />
    </div>
  );
}