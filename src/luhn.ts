// Lookup table for doubled digits
const DOUBLED_DIGITS = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

export default function validate(stringToValidate: string): boolean {
  // Early return for empty strings
  if (!stringToValidate) return false;
  
  const str = stringToValidate.replace(/\s/g, '');
  
  // Early validation
  if (!/^\d+$/.test(str) || str.length < 2) return false;
  
  let sum = 0;
  let isEven = str.length % 2 === 0;
  
  // Process string directly without parseInt where possible
  for (let i = 0; i < str.length; i++) {
    let digit = str.charCodeAt(i) - 48; // Convert char to number
    
    if (isEven === (i % 2 === 0)) {
      digit = DOUBLED_DIGITS[digit];
    }
    
    sum += digit;
  }
  
  return sum > 0 && sum % 10 === 0;
}
