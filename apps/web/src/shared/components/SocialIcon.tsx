import React from "react";
import { FaDiscord, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export type SocialIconType = "X" | "GitHub" | "LinkedIn" | "Discord";

const ICONS: Record<SocialIconType, React.ComponentType<{ className?: string }>> =
  {
    X: FaXTwitter,
    GitHub: FaGithub,
    LinkedIn: FaLinkedinIn,
    Discord: FaDiscord,
  };

type SocialIconProps = {
  type: SocialIconType;
  className?: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ type, className }) => {
  const Icon = ICONS[type];
  return <Icon className={className} aria-hidden="true" />;
};

export default SocialIcon;
