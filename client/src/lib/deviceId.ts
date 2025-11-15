import { Device } from '@capacitor/device';

let cachedDeviceId: string | null = null;

export async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  try {
    const info = await Device.getId();
    cachedDeviceId = info.identifier || generateFallbackId();
    console.log('📱 Device ID:', cachedDeviceId);
    return cachedDeviceId;
  } catch (error) {
    console.error('❌ Erreur Device ID:', error);
    cachedDeviceId = generateFallbackId();
    return cachedDeviceId;
  }
}

function generateFallbackId(): string {
  // Fallback pour le web
  let id = localStorage.getItem('device_id');
  if (!id) {
    id = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('device_id', id);
  }
  return id;
}