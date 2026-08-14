import { Database } from '../types/supabase';

// Environment variable fallbacks for local development
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-kinderlog.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock';

export interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

// In-Memory Live Reactive Store for offline/fallback mode
class MockSupabaseStore {
  private findings: Database['public']['Tables']['teacher_findings']['Row'][] = [
    { id: 'f-1', child_id: 'c-1', teacher_id: 't-1', category: 'MEAL', value: '100% Eaten', note: 'Lunch completed cleanly', created_at: new Date().toISOString() },
    { id: 'f-2', child_id: 'c-2', teacher_id: 't-1', category: 'NAP', value: 'Slept 1.5 Hours', note: 'Resting well', created_at: new Date().toISOString() }
  ];

  private vitals: Database['public']['Tables']['resident_vitals']['Row'][] = [
    { id: 'v-1', resident_id: 'r-1', nurse_id: 'n-1', blood_pressure: '120/80', pulse: 72, blood_sugar: 98, temperature: 36.6, created_at: new Date().toISOString() }
  ];

  async insertFinding(finding: Database['public']['Tables']['teacher_findings']['Insert']) {
    const newFinding: Database['public']['Tables']['teacher_findings']['Row'] = {
      id: `f-${Date.now()}`,
      child_id: finding.child_id,
      teacher_id: finding.teacher_id || 't-1',
      category: finding.category,
      value: finding.value,
      note: finding.note || null,
      created_at: new Date().toISOString()
    };
    this.findings.unshift(newFinding);
    return { data: newFinding, error: null };
  }

  async insertVitals(vital: Database['public']['Tables']['resident_vitals']['Insert']) {
    const newVital: Database['public']['Tables']['resident_vitals']['Row'] = {
      id: `v-${Date.now()}`,
      resident_id: vital.resident_id,
      nurse_id: vital.nurse_id || 'n-1',
      blood_pressure: vital.blood_pressure,
      pulse: vital.pulse,
      blood_sugar: vital.blood_sugar,
      temperature: vital.temperature,
      created_at: new Date().toISOString()
    };
    this.vitals.unshift(newVital);
    return { data: newVital, error: null };
  }

  async getFindings() {
    return { data: this.findings, error: null };
  }

  async getVitals() {
    return { data: this.vitals, error: null };
  }
}

export const supabaseStore = new MockSupabaseStore();
