export const isValidEmail = email => {
  // Check if the email matches the basic email pattern.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return false;
  }

  // Split the email into local and domain parts.
  const [localPart, domainPart] = email.split('@');

  // Check if the local part is not empty and doesn't start or end with a dot.
  if (!localPart || localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  // Check if the domain part is not empty and contains at least one dot.
  if (
    !domainPart ||
    !domainPart.includes('.') ||
    domainPart.startsWith('.') ||
    domainPart.endsWith('.')
  ) {
    return false;
  }

  // Check if the domain part contains only valid characters (alphanumeric and dots).
  const domainPattern = /^[a-zA-Z0-9.]+$/;
  if (!domainPattern.test(domainPart)) {
    return false;
  }

  return true;
};
