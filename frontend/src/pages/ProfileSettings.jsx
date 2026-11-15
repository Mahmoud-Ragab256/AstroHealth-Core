import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAstronautProfile from '../hooks/useAstronautProfile';
import { profileIsReady, saveAstronautProfile } from '../data/astronautProfile';
import AssessmentSectionCard from '../Components/AssessmentSectionCard';

function ProfileEditor({ profile }) {
  const [values, setValues] = useState(profile);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const fields = [
    { name: 'astronaut', label: 'Name' }, { name: 'id', label: 'Astronaut ID', required: true },
    { name: 'mission', label: 'Mission name', required: true },
    { name: 'day', label: 'Mission day', type: 'number', min: 0, step: 1, required: true }
  ];
  function submit(event) {
    event.preventDefault();
    const data = { ...profile, ...values, id: values.id?.trim(), mission: values.mission?.trim(), day: values.day === '' || values.day == null ? '' : Number(values.day) };
    if (!profileIsReady(data)) { setSaved(false); setMessage('Enter an astronaut ID, mission name, and a whole mission day of zero or greater.'); return; }
    try { saveAstronautProfile(data); setSaved(true); setMessage('Mission settings saved. All assessments will use this profile.'); }
    catch { setSaved(false); setMessage('Your browser could not save these settings. Allow local storage and try again.'); }
  }
  return <div className="max-w-3xl space-y-6">
    <header><h1 className="text-3xl font-bold text-navy">Astronaut & mission</h1><p className="mt-2 text-muted">Set up once on this browser. Update your mission day when it changes.</p></header>
    <form noValidate onSubmit={submit} className="space-y-5">
      <AssessmentSectionCard title="Profile details" inputs={fields} values={values} onChange={(name, value) => { setValues(previous => ({ ...previous, [name]: value })); setMessage(''); setSaved(false); }} />
      {message && <p role={saved ? 'status' : 'alert'} className={`rounded-xl border p-4 ${saved ? 'border-emerald-200 bg-emerald-50 text-health' : 'border-red-200 bg-red-50 text-red-800'}`}>{message}</p>}
      <div className="flex flex-wrap gap-4 items-center"><button className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark">Save mission settings</button><Link to="/psychological/assessment" className="text-primary underline">Go to assessment</Link></div>
    </form>
    <p className="text-sm text-muted">Your saved weight, sex, and other existing profile fields are preserved.</p>
  </div>;
}
export default function ProfileSettings() {
  const profile = useAstronautProfile();
  return <ProfileEditor profile={profile} />;
}
