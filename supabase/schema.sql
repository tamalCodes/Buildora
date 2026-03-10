-- ============================================================
-- Buildora V2 — Complete Database Schema
-- Run this in Supabase SQL Editor to recreate all tables
-- ============================================================

-- 1. PROFILES (core user profile, 1:1 with auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    user_type TEXT,
    organization_name TEXT,
    avatar_url TEXT,
    name TEXT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    tshirt_size TEXT,
    city TEXT,
    bio TEXT,
    readme TEXT,
    contact_email TEXT,
    phone_country TEXT,
    phone_number TEXT,
    emergency_name TEXT,
    emergency_phone TEXT,
    no_formal_education BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROFILE EDUCATIONS (1:N)
CREATE TABLE public.profile_educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    degree_type TEXT,
    institution TEXT,
    field_of_study TEXT,
    is_current BOOLEAN,
    graduation_month INT,
    graduation_year INT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. PROFILE EXPERIENCES (1:N)
CREATE TABLE public.profile_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company TEXT,
    title TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    is_current BOOLEAN,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROFILE LINKS (1:N)
CREATE TABLE public.profile_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PROFILE RESUMES (1:1, unique on profile_id)
CREATE TABLE public.profile_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    label TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROFILE ROLES (1:N, bulk-replaced via PUT)
CREATE TABLE public.profile_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PROFILE SKILLS (1:N, bulk-replaced via PUT)
CREATE TABLE public.profile_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    rank INT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES (for query performance)
-- ============================================================
CREATE INDEX idx_profile_educations_profile_id ON public.profile_educations(profile_id);
CREATE INDEX idx_profile_experiences_profile_id ON public.profile_experiences(profile_id);
CREATE INDEX idx_profile_links_profile_id ON public.profile_links(profile_id);
CREATE INDEX idx_profile_roles_profile_id ON public.profile_roles(profile_id);
CREATE INDEX idx_profile_skills_profile_id ON public.profile_skills(profile_id);
CREATE INDEX idx_profile_skills_rank ON public.profile_skills(profile_id, rank);

-- ============================================================
-- RLS (disabled — backend uses Service Role Key)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_skills ENABLE ROW LEVEL SECURITY;

-- Service Role Key bypasses RLS, so no policies needed for backend access.
-- If you add direct client-side Supabase access later, add policies here.
