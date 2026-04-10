-- Buildora V2 builder seed: Vaibhav Saini
--
-- Usage:
-- Option A (recommended): set v_profile_email to an existing auth.users email.
-- Option B: set v_profile_id_override directly.
-- If neither is set, the script falls back to the most recently created auth user.

DO $$
DECLARE
  v_profile_email TEXT := NULL; -- example: 'you@example.com'
  v_profile_id_override UUID := NULL; -- example: '11111111-2222-3333-4444-555555555555'
  v_profile_id UUID;
  v_resolved_email TEXT;
BEGIN
  IF v_profile_id_override IS NOT NULL THEN
    SELECT id, email
    INTO v_profile_id, v_resolved_email
    FROM auth.users
    WHERE id = v_profile_id_override
    LIMIT 1;
  ELSIF v_profile_email IS NOT NULL THEN
    SELECT id, email
    INTO v_profile_id, v_resolved_email
    FROM auth.users
    WHERE email = v_profile_email
    ORDER BY created_at DESC
    LIMIT 1;
  ELSE
    SELECT id, email
    INTO v_profile_id, v_resolved_email
    FROM auth.users
    ORDER BY created_at DESC
    LIMIT 1;
  END IF;

  IF v_profile_id IS NULL OR v_resolved_email IS NULL THEN
    RAISE EXCEPTION 'No matching auth.users row found. Set v_profile_email or v_profile_id_override.';
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    user_type,
    avatar_url,
    name,
    first_name,
    last_name,
    city,
    bio,
    readme,
    contact_email,
    updated_at
  )
  VALUES (
    v_profile_id,
    v_resolved_email,
    'PERSONAL',
    'https://i.pravatar.cc/240?img=11',
    'Vaibhav Saini',
    'Vaibhav',
    'Saini',
    'New Delhi, India',
    'Building practical infra for decentralized apps, with a focus on developer tooling and clear technical communication.',
    'I build developer-focused products that simplify blockchain infra and help teams ship faster.',
    v_resolved_email,
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    user_type = EXCLUDED.user_type,
    avatar_url = EXCLUDED.avatar_url,
    name = EXCLUDED.name,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    city = EXCLUDED.city,
    bio = EXCLUDED.bio,
    readme = EXCLUDED.readme,
    contact_email = EXCLUDED.contact_email,
    updated_at = now();

  DELETE FROM public.profile_roles WHERE profile_id = v_profile_id;
  INSERT INTO public.profile_roles (profile_id, role)
  VALUES
    (v_profile_id, 'Co-founder, TowardsBlockchain'),
    (v_profile_id, 'Open-source maintainer'),
    (v_profile_id, 'Community mentor');

  DELETE FROM public.profile_skills WHERE profile_id = v_profile_id;
  INSERT INTO public.profile_skills (profile_id, name, rank)
  VALUES
    (v_profile_id, 'Solidity', 1),
    (v_profile_id, 'Go', 2),
    (v_profile_id, 'Node.js', 3),
    (v_profile_id, 'React', 4),
    (v_profile_id, 'MongoDB', 5);

  DELETE FROM public.profile_links WHERE profile_id = v_profile_id;
  INSERT INTO public.profile_links (profile_id, label, url)
  VALUES
    (v_profile_id, 'GitHub', 'https://github.com/cluster-labs'),
    (v_profile_id, 'LinkedIn', 'https://www.linkedin.com'),
    (v_profile_id, 'X', 'https://x.com');

  DELETE FROM public.profile_experiences WHERE profile_id = v_profile_id;
  INSERT INTO public.profile_experiences (
    profile_id,
    company,
    title,
    location,
    start_date,
    end_date,
    is_current,
    description
  )
  VALUES
    (
      v_profile_id,
      'TowardsBlockchain',
      'Co-founder',
      'India',
      '2019-01',
      NULL,
      TRUE,
      'Building products, infra, and educational content focused on practical blockchain adoption.'
    ),
    (
      v_profile_id,
      'Cluster Labs',
      'Core contributor',
      'Remote',
      '2020-01',
      NULL,
      TRUE,
      'Maintained open-source modules for distributed apps and mentored contributors.'
    );

  DELETE FROM public.profile_educations WHERE profile_id = v_profile_id;
  INSERT INTO public.profile_educations (
    profile_id,
    degree_type,
    institution,
    field_of_study,
    is_current,
    graduation_month,
    graduation_year
  )
  VALUES
    (
      v_profile_id,
      'B.Tech (incomplete)',
      'Indian Institute of Technology, Delhi',
      'Engineering Physics',
      FALSE,
      NULL,
      NULL
    );
END $$;
