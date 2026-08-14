export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          type: 'KINDERLOG' | 'CARELOG'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'KINDERLOG' | 'CARELOG'
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'TEACHER' | 'NURSE' | 'PARENT' | 'MANAGER'
          organization_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role: 'TEACHER' | 'NURSE' | 'PARENT' | 'MANAGER'
          organization_id?: string | null
          created_at?: string
        }
      }
      children: {
        Row: {
          id: string
          full_name: string
          age: number
          room_number: string
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          age: number
          room_number?: string
          organization_id: string
          created_at?: string
        }
      }
      residents: {
        Row: {
          id: string
          full_name: string
          room_number: string
          age: number
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          room_number: string
          age: number
          organization_id: string
          created_at?: string
        }
      }
      teacher_findings: {
        Row: {
          id: string
          child_id: string
          teacher_id: string | null
          category: 'MEAL' | 'NAP' | 'ACTIVITY' | 'MEDICATION'
          value: string
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          teacher_id?: string | null
          category: 'MEAL' | 'NAP' | 'ACTIVITY' | 'MEDICATION'
          value: string
          note?: string | null
          created_at?: string
        }
      }
      resident_vitals: {
        Row: {
          id: string
          resident_id: string
          nurse_id: string | null
          blood_pressure: string
          pulse: number
          blood_sugar: number
          temperature: number
          created_at: string
        }
        Insert: {
          id?: string
          resident_id: string
          nurse_id?: string | null
          blood_pressure: string
          pulse: number
          blood_sugar: number
          temperature: number
          created_at?: string
        }
      }
    }
  }
}
