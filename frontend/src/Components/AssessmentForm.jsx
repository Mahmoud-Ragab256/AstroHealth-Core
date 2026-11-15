import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentFields } from '../../../shared/assessmentFields.js';
import { submitAssessment } from '../api/assessments.js';
import AssessmentSectionCard from './AssessmentSectionCard';
import AstronautProfileCard from './AstronautProfileCard';
import useAstronautProfile from '../hooks/useAstronautProfile';
import { profileIsReady } from '../data/astronautProfile';
import { assessmentSections } from '../data/assessmentSections';

export default function AssessmentForm({ type, title, derivedValues = {} }) {
  const profile = useAstronautProfile();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null);
  const errorRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const inputs = assessmentFields[type].map(field => ({
    name: field.key, label: field.name, unit: field.unit,
    type: field.key === 'radiation_type' ? 'text' : 'number', step: 'any'
  }));
  const onChange = (name, value) => setValues(previous => ({ ...previous, [name]: value }));

  async function onSubmit(event) {
    event.preventDefault();
    if (request.current) return;
    setError('');
    if (!profileIsReady(profile)) { setError('Complete your mission settings before submitting this assessment.'); return; }
    const invalid = [...event.currentTarget.elements].find(element => element.validity && !element.validity.valid);
    if (invalid) {
      invalid.focus();
      setError(invalid.validationMessage);
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    try {
      const report = await submitAssessment(type, { ...values, ...derivedValues, astronaut_id: profile.id, mission: profile.mission, day: profile.day }, controller.signal);
      navigate(`/reports/${report._id}`);
    } catch (failure) {
      if (failure.name !== 'AbortError') setError(failure.message);
    } finally {
      request.current = null;
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return (
    <form data-assessment={type} noValidate onSubmit={onSubmit} aria-busy={loading} className="space-y-6 pb-10">
      <AstronautProfileCard />
      <div><h2 className="text-2xl font-bold text-navy">{title}</h2><p className="mt-2 text-sm text-muted">Enter available measurements in the units shown. Leave unmeasured values blank.</p></div>
      <fieldset disabled={loading} className="space-y-6 min-w-0">
        <legend className="sr-only">{title}</legend>
        {assessmentSections[type].map(section => <AssessmentSectionCard key={section.title} title={section.title} description={section.description} inputs={section.keys.map(key => inputs.find(input => input.name === key))} values={values} onChange={onChange} />)}
      </fieldset>
      {error && <p ref={errorRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">{error}</p>}
      <p role="status" className="text-sm text-muted">{loading ? 'Analyzing measurements and saving your report…' : 'Your report will open after analysis and saving are complete.'}</p>
      <button type="submit" disabled={loading} className="rounded-full bg-primary px-7 py-3 font-semibold text-white hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-wait">
        {loading ? 'Analyzing…' : 'Analyze measurements'}
      </button>
    </form>
  );
}
