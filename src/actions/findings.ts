import { supabaseStore } from '../lib/supabaseClient';
import { Database } from '../types/supabase';

export async function submitTeacherFindingAction(formData: {
  childId: string;
  category: 'MEAL' | 'NAP' | 'ACTIVITY' | 'MEDICATION';
  value: string;
  note?: string;
}) {
  const result = await supabaseStore.insertFinding({
    child_id: formData.childId,
    category: formData.category,
    value: formData.value,
    note: formData.note
  });

  return {
    success: true,
    data: result.data,
    message: `✔ Finding successfully logged in Supabase Database for Child: ${formData.childId}`
  };
}

export async function submitNurseVitalsAction(formData: {
  residentId: string;
  bloodPressure: string;
  pulse: number;
  bloodSugar: number;
  temperature: number;
}) {
  const result = await supabaseStore.insertVitals({
    resident_id: formData.residentId,
    blood_pressure: formData.bloodPressure,
    pulse: formData.pulse,
    blood_sugar: formData.bloodSugar,
    temperature: formData.temperature
  });

  return {
    success: true,
    data: result.data,
    message: `✔ Resident Vitals successfully persisted in Supabase Database!`
  };
}
