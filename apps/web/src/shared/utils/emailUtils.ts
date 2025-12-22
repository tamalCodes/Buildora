
import { UserType } from '@buildora/shared';

const PERSONAL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'me.com'
];

export const detectUserType = (email: string): UserType => {
  if (!email || !email.includes('@')) return UserType.UNDETERMINED;
  
  const domain = email.split('@')[1].toLowerCase();
  if (PERSONAL_DOMAINS.includes(domain)) {
    return UserType.PERSONAL;
  }
  
  // Basic validation that it's not a common public domain, thus likely an org
  return domain.length > 3 ? UserType.ORGANIZATION : UserType.UNDETERMINED;
};

export const getOrgNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) return '';
  const domain = email.split('@')[1];
  const domainParts = domain.split('.');
  if (domainParts.length > 0) {
    const name = domainParts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return '';
};
