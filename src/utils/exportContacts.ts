import type { Contact } from '../types';

export function exportContactsToCSV(contacts: Contact[]): string {
  const headers = [
    'Name',
    'Title',
    'Company',
    'Email',
    'Phone',
    'Website',
    'Location',
    'Tags',
    'Notes',
    'Date Added'
  ];

  const rows = contacts.map(contact => [
    contact.name,
    contact.title || '',
    contact.company || '',
    contact.email || '',
    contact.phone || '',
    contact.website || '',
    contact.location || '',
    (contact.tags || []).join('; '),
    contact.notes || '',
    new Date(contact.createdAt).toLocaleDateString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}