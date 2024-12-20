import type { Contact } from '../types';

export function extractContactInfo(text: string): Partial<Contact> {
  const lines = text.split('\n').map(line => line.trim());
  const contact: Partial<Contact> = {};

  // Extract name (usually first line with letters)
  const nameLine = lines.find(line => /^[A-Za-z\s]+$/.test(line));
  if (nameLine) {
    contact.name = nameLine.trim();
  }

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    contact.email = emailMatch[0];
  }

  // Extract phone number
  const phoneMatch = text.match(/(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    contact.phone = phoneMatch[0];
  }

  // Extract title and company
  const titleCompanyLine = lines.find(line => 
    /(?:CEO|CTO|CFO|Director|Manager|Engineer|Developer|Designer|Consultant)/i.test(line)
  );
  if (titleCompanyLine) {
    const parts = titleCompanyLine.split(/\bat\b|\b@\b|\b-\b/);
    if (parts.length >= 2) {
      contact.title = parts[0].trim();
      contact.company = parts[1].trim();
    } else {
      contact.title = titleCompanyLine.trim();
    }
  }

  // Extract website
  const websiteMatch = text.match(/(?:www\.)?[\w-]+\.[\w.-]+/);
  if (websiteMatch) {
    contact.website = websiteMatch[0].startsWith('www.') ? 
      `https://${websiteMatch[0]}` : 
      `https://www.${websiteMatch[0]}`;
  }

  return contact;
}