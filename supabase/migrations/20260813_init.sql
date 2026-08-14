-- KinderLog & CareLog Enterprise Supabase Schema Migration
-- Migration ID: 20260813_init.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('KINDERLOG', 'CARELOG')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('TEACHER', 'NURSE', 'PARENT', 'MANAGER')),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CHILDREN TABLE (KinderLog)
CREATE TABLE IF NOT EXISTS public.children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  age INT NOT NULL,
  room_number TEXT NOT NULL DEFAULT '102',
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. RESIDENTS TABLE (CareLog)
CREATE TABLE IF NOT EXISTS public.residents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  room_number TEXT NOT NULL,
  age INT NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TEACHER FINDINGS TABLE
CREATE TABLE IF NOT EXISTS public.teacher_findings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id),
  category TEXT NOT NULL CHECK (category IN ('MEAL', 'NAP', 'ACTIVITY', 'MEDICATION')),
  value TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. RESIDENT VITALS TABLE
CREATE TABLE IF NOT EXISTS public.resident_vitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  nurse_id UUID REFERENCES public.profiles(id),
  blood_pressure TEXT NOT NULL,
  pulse INT NOT NULL,
  blood_sugar INT NOT NULL,
  temperature NUMERIC(4,1) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SEED SEED DATA FOR DEMO FACILITY
INSERT INTO public.organizations (id, name, type)
VALUES ('11111111-1111-1111-1111-111111111111', 'Little Explorers & Sunrise Care Center', 'KINDERLOG')
ON CONFLICT DO NOTHING;

INSERT INTO public.children (id, full_name, age, room_number, organization_id)
VALUES 
  ('22222222-2222-2222-2222-222222222222', 'Mila Yılmaz', 3, '102', '11111111-1111-1111-1111-111111111111'),
  ('33333333-3333-3333-3333-333333333333', 'Zeynep Kaya', 3, '102', '11111111-1111-1111-1111-111111111111'),
  ('44444444-4444-4444-4444-444444444444', 'Ali Demir', 3, '102', '11111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;

INSERT INTO public.residents (id, full_name, room_number, age, organization_id)
VALUES 
  ('55555555-5555-5555-5555-555555555555', 'Ayşe Teyze', '204', 78, '11111111-1111-1111-1111-111111111111'),
  ('66666666-6666-6666-6666-666666666666', 'Mehmet Amca', '208', 82, '11111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;
