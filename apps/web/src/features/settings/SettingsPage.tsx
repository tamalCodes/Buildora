import React, { useState } from "react";
import SettingsCard from "./components/SettingsCard";
import SettingsSidebar from "./components/SettingsSidebar";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import {
  SettingsButton,
  SettingsCheckbox,
  SettingsInput,
  SettingsToggle,
} from "./components/SettingsControls";
import Modal from "@shared/components/Modal";
import { SETTINGS_NAV_ITEMS } from "./constants/constants";
import type { SettingsPageProps } from "./constants/interfaces";
import type { SettingsSectionId } from "./constants/types";

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onSignOut }) => {
  const [activeSection, setActiveSection] =
    useState<SettingsSectionId>("account");
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onSignOut?.();
  };

  const userLabel = user?.name || "tamalCodes";
  const userEmail = user?.email || "tamalcodes@gmail.com";

  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-130 w-130 rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-1/3 right-0 h-105 w-105 rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-120 w-120 rounded-full bg-rose-500/10 blur-[160px]" />
      </div>

      <main className="mx-auto max-w-300 px-6 pb-24 pt-32 lg:px-12">
        <div className="mb-10 flex flex-col gap-4">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
            Account settings
          </p>
          <h1 className="text-4xl lg:text-5xl font-geist font-black text-white">
            Manage your Buildora account
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Customize how you receive updates, connect wallets, and manage the
            security settings for your account.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <SettingsSidebar
            items={SETTINGS_NAV_ITEMS}
            activeId={activeSection}
            onSelect={setActiveSection}
            onLogout={handleLogout}
          />

          <div className="space-y-6">
            <div className="flex flex-col gap-3 rounded-4xl border border-white/10 bg-white/5 px-4 py-4 lg:hidden">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Jump to
              </label>
              <select
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                value={activeSection}
                onChange={(event) =>
                  setActiveSection(event.target.value as SettingsSectionId)
                }
              >
                {SETTINGS_NAV_ITEMS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <button
                className="text-left text-sm font-semibold text-rose-300"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>

            {activeSection === "account" && (
              <>
                <SettingsCard
                  title="Profile"
                  description="Your profile settings and privacy preferences."
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 via-cyan-400 to-rose-400 p-0.5">
                        <img
                          src={`https://i.pravatar.cc/120?u=${encodeURIComponent(
                            userEmail
                          )}`}
                          alt={userLabel}
                          className="h-full w-full rounded-full border border-white"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {userLabel}
                        </p>
                        <p className="text-xs text-slate-400">{userEmail}</p>
                      </div>
                    </div>
                    <SettingsToggle label="Hide my Buildora profile from public view" />
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                      <SettingsInput
                        label="Username"
                        defaultValue={userLabel}
                        placeholder="Enter username"
                      />
                      <div className="flex items-end">
                        <SettingsButton variant="secondary">
                          Change username
                        </SettingsButton>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                      <SettingsInput
                        label="Email"
                        defaultValue={userEmail}
                        placeholder="Enter email"
                      />
                      <div className="flex items-end">
                        <SettingsButton variant="secondary">
                          Change email
                        </SettingsButton>
                      </div>
                    </div>
                  </div>
                </SettingsCard>

                <SettingsCard
                  title="Link accounts"
                  description="Connect your social accounts for faster sign in."
                >
                  <div className="space-y-4">
                    {[
                      { label: "Google", status: "Linked" },
                      { label: "GitHub", status: "Linked" },
                      { label: "LinkedIn", status: "Linked" },
                      { label: "Discord", status: "Connect" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.status === "Linked"
                              ? "Connected to your Buildora profile."
                              : "Not linked yet."}
                          </p>
                        </div>
                        <SettingsButton
                          variant={item.status === "Linked" ? "outline" : "primary"}
                        >
                          {item.status === "Linked" ? "Unlink" : "Link"}
                        </SettingsButton>
                      </div>
                    ))}
                  </div>
                </SettingsCard>

                <SettingsCard
                  title="Delete account"
                  description="This action will permanently remove your data."
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">
                      You will lose access to your hackathon history and wallet
                      connections.
                    </p>
                    <SettingsButton variant="danger">
                      Delete account
                    </SettingsButton>
                  </div>
                </SettingsCard>
              </>
            )}

            {activeSection === "notifications" && (
              <>
                <SettingsCard
                  title="Notify me"
                  description="Stay in the loop about new opportunities."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SettingsCheckbox label="Upcoming hackathons" defaultChecked />
                    <SettingsCheckbox label="Community newsletter" defaultChecked />
                    <SettingsCheckbox label="Partner initiatives" />
                    <SettingsCheckbox label="Ecosystem updates" />
                  </div>
                </SettingsCard>

                <SettingsCard
                  title="Opportunity emails"
                  description="Choose which types of roles you want to hear about."
                >
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Tracks
                      </p>
                      <div className="space-y-3">
                        <SettingsCheckbox label="Internships" defaultChecked />
                        <SettingsCheckbox label="Full-time roles" />
                        <SettingsCheckbox label="Contract teams" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Focus areas
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Design",
                          "Frontend",
                          "Backend",
                          "Mobile",
                          "Blockchain",
                          "AI",
                        ].map((label) => (
                          <SettingsCheckbox
                            key={label}
                            label={label}
                            defaultChecked
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </SettingsCard>
              </>
            )}

            {activeSection === "wallets" && (
              <SettingsCard
                title="Link wallet"
                description="Connect your wallet to unlock Web3-native features."
                action={<SettingsButton>Link wallet</SettingsButton>}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8" />
                      <path d="M16 21l5-5-5-5" />
                      <path d="M21 16H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Link your Ethereum wallet to Buildora.
                    </p>
                    <p className="text-sm text-slate-400">
                      Claim on-chain credentials and participate in quadratic
                      voting during hackathons.
                    </p>
                    <button className="mt-3 text-sm font-semibold text-indigo-300">
                      Do not have a wallet?
                    </button>
                  </div>
                </div>
              </SettingsCard>
            )}

            {activeSection === "beta" && (
              <SettingsCard
                title="Buildora Beta"
                description="You are enrolled in the Buildora Beta program."
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">
                      You have early access to experimental features. Some
                      options may be less stable than production.
                    </p>
                    <p className="text-sm text-slate-500">
                      Share feedback at beta@buildora.co.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <SettingsButton variant="outline">Changelog</SettingsButton>
                    <SettingsButton variant="danger">Leave beta</SettingsButton>
                  </div>
                </div>
              </SettingsCard>
            )}

            {activeSection === "kyc" && (
              <SettingsCard
                title="Complete your KYC"
                description="Verify your identity to claim hackathon bounties."
                action={<SettingsButton>Start verification</SettingsButton>}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="14" rx="2" />
                      <circle cx="8" cy="10" r="2" />
                      <path d="M14 8h4" />
                      <path d="M14 12h4" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300">
                      Verify your identity on Buildora.
                    </p>
                    <p className="text-sm text-slate-500">
                      Need help? Reach us at help@buildora.co.
                    </p>
                  </div>
                </div>
              </SettingsCard>
            )}

            {activeSection === "mcp" && (
              <SettingsCard
                title="Configure MCP"
                description="Connect an MCP-compatible agent to your Buildora MCP server."
              >
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">
                    Add this configuration to your Streamable HTTP/SSE MCP
                    client.
                  </p>
                  <pre className="overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                    {`{
  "mcpServers": {
    "buildora": {
      "url": "https://mcp.buildora.co/mcp?apiKey=XXXX-XXXX-XXXX-XXXX"
    }
  }
}`}
                  </pre>
                  <div className="flex flex-wrap items-center gap-3">
                    <SettingsButton variant="outline">
                      What is MCP?
                    </SettingsButton>
                    <SettingsButton>Generate API key</SettingsButton>
                  </div>
                </div>
              </SettingsCard>
            )}

            {activeSection === "security" && (
              <SettingsCard
                title="Change password"
                description="Your password should be at least 8 characters."
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <SettingsInput
                    label="Current password"
                    placeholder="Enter current password"
                    type="password"
                  />
                  <div className="hidden lg:block" />
                  <SettingsInput
                    label="New password"
                    placeholder="Enter new password"
                    type="password"
                  />
                  <SettingsInput
                    label="Confirm password"
                    placeholder="Enter new password again"
                    type="password"
                  />
                </div>
                <div className="mt-6">
                  <SettingsButton>Save changes</SettingsButton>
                </div>
              </SettingsCard>
            )}
          </div>
        </div>
      </main>

      <Modal
        isOpen={showLogoutModal}
        title="Logging you out"
        description="Are you sure you want to log out of Buildora?"
        onClose={() => setShowLogoutModal(false)}
      >
        <div className="my-6 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-500/10 text-rose-300">
            <svg
              aria-hidden="true"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 6 6v6c0 5 3 9 6 10 3-1 6-5 6-10V6l-6-4z" />
              <path d="M9 12h6" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <SettingsButton
            variant="outline"
            onClick={() => setShowLogoutModal(false)}
          >
            Back
          </SettingsButton>
          <SettingsButton variant="danger" onClick={handleConfirmLogout}>
            Yes, log out
          </SettingsButton>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
