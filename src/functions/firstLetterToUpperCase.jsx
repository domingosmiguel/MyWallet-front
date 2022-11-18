export default function firstLetterToUpperCase(name) {
  return name.split(' ')[0][0].toUpperCase() + name.split(' ')[0].substring(1);
}
