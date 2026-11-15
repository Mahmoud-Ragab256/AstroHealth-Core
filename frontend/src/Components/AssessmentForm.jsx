import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentFields } from '../../../shared/assessmentFields.js';
import { submitAssessment } from '../api/assessments.js';
import AssessmentSectionCard from './AssessmentSectionCard';

const identityFields = [
  { name: 'astronaut_id', label: 'Astronaut ID', required: true },
  { name: 'mission', label: 'Mission', required: true },
  { name: 'day', label: 'Mission day', type: 'number', min: 0, step: 1, required: true }
];

export default function AssessmentForm({ type, title }) {
  const [values, setValues] = useState({ astronaut_id: '', mission: '', day: '' });
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
      const report = await submitAssessment(type, values, controller.signal);
      navigate(`/reports/${report._id}`);
    } catch (failure) {
      if (failure.name !== 'AbortError') setError(failure.message);
    } finally {
      request.current = null;
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={loading} className="space-y-6 pb-10">
      <p className="text-muted">Enter the available measurements. Leave unmeasured values blank; at least one is needed.</p>
      <fieldset disabled={loading} className="space-y-6 min-w-0">
        <legend className="sr-only">{title}</legend>
        <AssessmentSectionCard title="Astronaut and mission" inputs={identityFields} values={values} onChange={onChange} />
        <AssessmentSectionCard title={title} inputs={inputs} values={values} onChange={onChange} />
      </fieldset>
      {error && <p ref={errorRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">{error}</p>}
      <p role="status" className="text-sm text-muted">{loading ? 'Analyzing measurements and saving your report…' : 'Your report will open after analysis and saving are complete.'}</p>
      <button type="submit" disabled={loading} className="rounded-full bg-primary px-7 py-3 font-semibold text-white hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-wait">
        {loading ? 'Analyzing…' : 'Analyze measurements'}
      </button>
    </form>
  );
}
