const disposableDomains = new Set([
  "10minutemail.com",
  "mailinator.com",
  "tempmail.com",
  "yopmail.com",
]);

export default function validateEmailAddress(value) {
  const email = value.trim();
  if (!email) return "Please enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  const domain = email.split("@")[1].toLowerCase();
  const reservedDomain = domain.split(".").some((part) =>
    ["example", "invalid", "localhost", "test"].includes(part)
  );
  if (reservedDomain || disposableDomains.has(domain)) {
    return "Use an email address you can access. Test or disposable email domains aren't accepted.";
  }

  return "";
}