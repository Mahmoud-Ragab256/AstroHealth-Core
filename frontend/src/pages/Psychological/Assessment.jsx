import AssessmentForm from '../../Components/AssessmentForm';
import { useState } from 'react';
import Phq9Assessment from '../../Components/Phq9Assessment';

export default function Assessment() {
  const [phqScore, setPhqScore] = useState(null);
  return <div className="space-y-10">
    <Phq9Assessment onScore={setPhqScore} />
    <section id="wellbeing-measurements" className="scroll-mt-6">
      {phqScore !== null && <p role="status" className="mb-4 rounded-xl border border-line bg-white p-4 text-sm text-primary">PHQ-9 score: {phqScore}/27. This score will be included with your submitted measurements.</p>}
      <AssessmentForm type="psychological" title="Sleep & wellbeing assessment" derivedValues={phqScore === null ? {} : { phq_9: phqScore }} />
    </section>
  </div>;
}
