export default function firstLetterToUpperCase(name) {
  if (!name) return '';

  const [firstWord] = name.split(' ');
  return `${firstWord.charAt(0).toUpperCase()}${firstWord.slice(1)}`;
}
