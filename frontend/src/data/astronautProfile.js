export const PROFILE_KEY = 'astronautData';
export const PROFILE_EVENT = 'astrohealth:profile-changed';

export function parseAstronautProfile(raw) {
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return {};
    const day = data.day ?? data.missionDay;
    return {
      ...data,
      astronaut: typeof data.astronaut === 'string' ? data.astronaut : '',
      id: typeof (data.id ?? data.astronaut_id) === 'string' ? (data.id ?? data.astronaut_id).trim() : '',
      mission: typeof data.mission === 'string' ? data.mission.trim() : '',
      day: ['number', 'string'].includes(typeof day) && String(day).trim() !== '' && day != null && Number.isInteger(Number(day)) && Number(day) >= 0 ? Number(day) : ''
    };
  } catch { return {}; }
}

export function profileIsReady(profile) {
  return Boolean(profile.id && profile.mission && Number.isInteger(profile.day) && profile.day >= 0);
}

export function saveAstronautProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(PROFILE_EVENT));
}
