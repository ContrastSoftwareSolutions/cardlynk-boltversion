import jsQR from 'jsqr';

export function decodeQRCode(imageData: ImageData): string | null {
  if (imageData.width === 0 || imageData.height === 0) {
    return null;
  }

  try {
    const code = jsQR(
      imageData.data,
      imageData.width,
      imageData.height,
      {
        inversionAttempts: "dontInvert",
      }
    );
    return code?.data || null;
  } catch (error) {
    console.error('QR decode error:', error);
    return null;
  }
}

export function isCardLynkQR(data: string): boolean {
  if (!data) return false;
  
  try {
    const url = new URL(data);
    return url.hostname === 'cardlynk.app' && url.pathname.startsWith('/p/');
  } catch {
    return false;
  }
}

export function extractUserIdFromQR(data: string): string | null {
  if (!data) return null;
  
  try {
    const url = new URL(data);
    if (isCardLynkQR(data)) {
      const parts = url.pathname.split('/');
      return parts.length >= 3 ? parts[2] : null;
    }
    return null;
  } catch {
    return null;
  }
}