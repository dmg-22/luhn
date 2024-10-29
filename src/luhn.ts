export default function validate(stringToValidate: string) {
  let trimmed = stringToValidate.replace(/[\s]/g, ""),
    length: number = trimmed.length,
    odd: boolean = false,
    total: number = 0,
    calc: number;

  if (!/^[0-9]+$/.test(trimmed)) {
    return false;
  }

  for (let i = length; i > 0; i--) {
    calc = parseInt(trimmed.charAt(i - 1));
    if (odd) {
      calc *= 2;
      if (calc > 9) calc -= 9;
    }
    total += calc;
    odd = !odd;
  }

  return total !== 0 && total % 10 === 0;
};
