export default function formatMoney(value) {
  const newValue = (value.replaceAll('.', '') / 100).toFixed(2);
  return newValue !== 0 ? newValue : '0.00';
}
