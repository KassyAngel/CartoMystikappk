// lib/deviceId.ts

import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

let cachedDeviceId: string | null = null;

/**
 * Récupère un Device ID unique et persistant
 * Fonctionne sur Android, iOS et Web
 */
export async function getDeviceId(): Promise<string> {
  // ✅ Retourner le cache si déjà récupéré
  if (cachedDeviceId) {
    console.log('📱 Device ID (cache):', cachedDeviceId);
    return cachedDeviceId;
  }

  const isNative = Capacitor.isNativePlatform();

  // ✅ Sur mobile natif (Android/iOS)
  if (isNative) {
    try {
      const info = await Device.getId();

      // ⚠️ IMPORTANT : Android utilise "identifier", iOS utilise "uuid"
      cachedDeviceId = info.identifier || info.uuid || null;

      if (cachedDeviceId && cachedDeviceId !== 'unknown') {
        console.log('📱 Device ID (natif):', cachedDeviceId);
        return cachedDeviceId;
      }

      console.warn('⚠️ Device ID natif invalide, fallback');
    } catch (error) {
      console.error('❌ Erreur Device.getId():', error);
    }
  }

  // ✅ Fallback (web ou erreur native)
  cachedDeviceId = generateFallbackId();
  console.log('📱 Device ID (fallback):', cachedDeviceId);
  return cachedDeviceId;
}

/**
 * Génère ou récupère un ID unique persistant pour le web
 */
function generateFallbackId(): string {
  let id = localStorage.getItem('device_id');

  if (!id) {
    // Format : web_timestamp_randomstring
    id = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('device_id', id);
    console.log('🆕 Nouveau Device ID généré:', id);
  }

  return id;
}

/**
 * Réinitialise le Device ID (DEBUG uniquement)
 * ⚠️ À utiliser SEULEMENT pour les tests !
 */
export function resetDeviceId(): void {
  cachedDeviceId = null;
  localStorage.removeItem('device_id');
  console.log('🔄 Device ID réinitialisé');
}

/**
 * Récupère des infos détaillées sur l'appareil (DEBUG)
 */
export async function getDeviceInfo(): Promise<any> {
  const isNative = Capacitor.isNativePlatform();

  if (isNative) {
    try {
      const info = await Device.getInfo();
      const id = await Device.getId();
      return {
        ...info,
        deviceId: id.identifier || id.uuid,
        platform: Capacitor.getPlatform(),
      };
    } catch (error) {
      console.error('❌ Erreur Device.getInfo():', error);
    }
  }

  return {
    platform: 'web',
    deviceId: await getDeviceId(),
    userAgent: navigator.userAgent,
  };
}