import { useState } from 'react';

export default function useForm(initialValue) {
  const [form, setForm] = useState(initialValue);

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return [form, updateForm, setForm];
}
