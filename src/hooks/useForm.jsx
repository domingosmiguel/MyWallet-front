import { useState } from 'react';
import formatMoney from '../functions/formatMoney';

export default function useForm(initialValue) {
  const [form, setForm] = useState(initialValue);

  const updateForm = (e) => {
    if (e.target.name === 'value') {
      e.target.value = formatMoney(e.target.value);
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return [form, updateForm, setForm];
}
