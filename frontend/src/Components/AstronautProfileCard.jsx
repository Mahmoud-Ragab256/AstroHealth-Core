import { Link } from 'react-router-dom';
import { UserRound, ArrowUpRight } from 'lucide-react';
import useAstronautProfile from '../hooks/useAstronautProfile';
import { profileIsReady } from '../data/astronautProfile';

export default function AstronautProfileCard() {
  const profile = useAstronautProfile();
  const ready = profileIsReady(profile);
  return <section aria-label="Current astronaut" className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4">
    <div className="flex items-center gap-3 min-w-0">
      <span className="rounded-xl bg-surface p-3 text-primary"><UserRound size={22} aria-hidden="true" /></span>
      <div className="min-w-0"><p className="font-bold text-navy break-words">{profile.astronaut || profile.id || 'Set up your astronaut profile'}</p>
        <p className="text-sm text-muted break-words">{ready ? `${profile.id} · ${profile.mission} · Day ${profile.day}` : 'Complete mission settings before submitting an assessment.'}</p>
      </div>
    </div>
    <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">{ready ? 'Mission settings' : 'Complete setup'}<ArrowUpRight size={16} aria-hidden="true" /></Link>
  </section>;
}
