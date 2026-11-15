import { useMemo, useSyncExternalStore } from 'react';
import { PROFILE_EVENT, PROFILE_KEY, parseAstronautProfile } from '../data/astronautProfile.js';

function read() {
  try { return localStorage.getItem(PROFILE_KEY); } catch { return null; }
}
function subscribe(notify) {
  window.addEventListener('storage', notify);
  window.addEventListener(PROFILE_EVENT, notify);
  return () => { window.removeEventListener('storage', notify); window.removeEventListener(PROFILE_EVENT, notify); };
}
export default function useAstronautProfile() {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  return useMemo(() => parseAstronautProfile(raw), [raw]);
}
