// Remove Polish diacritical marks from a string
export const removePolishChars = (text: string): string => {
    if (!text) return text;
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l")
      .replace(/Ł/g, "L");
  };
  