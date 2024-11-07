export default function validateOptimized(stringToValidate: string): boolean {
  const trimmed = stringToValidate.replace(/\s+/g, '');
  let total = 0;
  let shouldDouble = false;

  if (!/^\d+$/.test(trimmed)) {
    return false;
  }

  for (let i = trimmed.length - 1; i >= 0; i--) {
    let digit = trimmed.charCodeAt(i) - 48; // Convertir char a número

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    total += digit;
    shouldDouble = !shouldDouble;
  }

  return total % 10 === 0;
} 