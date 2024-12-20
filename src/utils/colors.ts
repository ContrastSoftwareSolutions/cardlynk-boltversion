export function getContrastColor(background: string): string {
  // Handle gradient backgrounds
  if (background.includes('gradient')) {
    return '#FFFFFF'; // Default to white text for gradients
  }

  // Convert hex to RGB
  let color = background.charAt(0) === '#' ? background.substring(1, 7) : background;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white depending on background luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}