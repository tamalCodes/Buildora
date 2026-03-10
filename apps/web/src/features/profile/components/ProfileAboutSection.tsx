import type { ProfileAboutSectionProps } from "@/features/profile/constants/interfaces";
import { useUpdateProfile } from "@/features/profile/hooks/useProfile";
import SettingsCard from "@/features/settings/components/SettingsCard";
import {
  SettingsButton,
  SettingsInput,
} from "@/features/settings/components/SettingsControls";
import React, { useEffect, useMemo, useState } from "react";

const ProfileAboutSection: React.FC<ProfileAboutSectionProps> = ({
  profile,
}) => {
  const updateProfile = useUpdateProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [readme, setReadme] = useState("");

  const baseline = useMemo(
    () => ({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      gender: profile?.gender || "",
      tshirtSize: profile?.tshirtSize || "",
      city: profile?.city || "",
      bio: profile?.bio || "",
      readme: profile?.readme || "",
    }),
    [profile],
  );

  useEffect(() => {
    setFirstName(baseline.firstName);
    setLastName(baseline.lastName);
    setGender(baseline.gender);
    setTshirtSize(baseline.tshirtSize);
    setCity(baseline.city);
    setBio(baseline.bio);
    setReadme(baseline.readme);
  }, [baseline]);

  const isBasicDirty = useMemo(
    () =>
      Boolean(profile) &&
      (firstName !== baseline.firstName ||
        lastName !== baseline.lastName ||
        gender !== baseline.gender ||
        tshirtSize !== baseline.tshirtSize ||
        city !== baseline.city),
    [baseline, city, firstName, gender, lastName, profile, tshirtSize],
  );

  const isAboutDirty = useMemo(
    () =>
      Boolean(profile) &&
      (bio !== baseline.bio || readme !== baseline.readme),
    [baseline, bio, profile, readme],
  );

  const canSaveBasic =
    isBasicDirty &&
    !updateProfile.isPending &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0;

  const canSaveAbout = isAboutDirty && !updateProfile.isPending;

  const handleSaveBasicInfo = () => {
    const payload: Record<string, string> = {};

    if (firstName.trim() && firstName !== baseline.firstName) {
      payload.firstName = firstName.trim();
    }
    if (lastName.trim() && lastName !== baseline.lastName) {
      payload.lastName = lastName.trim();
    }
    if (gender && gender !== baseline.gender) {
      payload.gender = gender;
    }
    if (tshirtSize && tshirtSize !== baseline.tshirtSize) {
      payload.tshirtSize = tshirtSize;
    }
    if (city.trim() && city !== baseline.city) {
      payload.city = city.trim();
    }

    if (Object.keys(payload).length === 0) return;
    updateProfile.mutate(payload);
  };

  const handleSaveAbout = () => {
    const payload: Record<string, string> = {};

    if (bio.trim() && bio !== baseline.bio) {
      payload.bio = bio.trim();
    }
    if (readme.trim() && readme !== baseline.readme) {
      payload.readme = readme.trim();
    }

    if (Object.keys(payload).length === 0) return;
    updateProfile.mutate(payload);
  };

  return (
    <>
      <SettingsCard
        title="Basic Info"
        description="Just the essentials."
        action={
          <SettingsButton
            onClick={handleSaveBasicInfo}
            disabled={!canSaveBasic}
          >
            Save
          </SettingsButton>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SettingsInput
            label="First name"
            placeholder="e.g. Tamal"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <SettingsInput
            label="Last name"
            placeholder="e.g. Das"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Identify as
            </span>
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </label>
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              T-shirt size
            </span>
            <select
              value={tshirtSize}
              onChange={(event) => setTshirtSize(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
            >
              <option value="">Select</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </label>
          <SettingsInput
            label="City"
            placeholder="e.g. Bangalore"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="About You"
        description="Tell your story."
        action={
          <SettingsButton
            onClick={handleSaveAbout}
            disabled={!canSaveAbout}
          >
            Save
          </SettingsButton>
        }
      >
        <div className="space-y-5">
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Bio
            </span>
            <textarea
              className="h-24 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600"
              placeholder="Add a short bio."
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </label>
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Readme
            </span>
            <textarea
              className="h-40 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600"
              placeholder="Write your story, goals, and past wins."
              value={readme}
              onChange={(event) => setReadme(event.target.value)}
            />
            <p className="mt-2 text-xs text-slate-500">
              Markdown supported. Keep it concise and skimmable.
            </p>
          </label>
        </div>
      </SettingsCard>
    </>
  );
};

export default ProfileAboutSection;
