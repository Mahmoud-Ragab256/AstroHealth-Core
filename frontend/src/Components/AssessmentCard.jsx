import LabInput from './reusable/LabInput';

const AssessmentSectionCard = ({
  title,
  arabicTitle,
  infoText,
  inputs = [],
  values = {},
  onChange,
  onEditRange,
}) => {
  return (
    <div className="card w-full shadow-sm flex flex-col p-6 md:p-8 rounded-3xl border border-gray-300 bg-white space-y-6">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="font-bold text-gray-900 text-2xl leading-snug">
          {title}
        </h2>

        {arabicTitle && (
          <span className="text-xl font-medium text-gray-500" dir="rtl">
            {arabicTitle}
          </span>
        )}
      </div>

      {infoText && (
        <div className="rounded-2xl bg-[#EDF2F9] border border-[#D8E0E7] p-4 flex items-start gap-3 text-sm text-[#203040] leading-relaxed">
          <span className="h-5 w-5 rounded-full bg-[#1D4F9C] text-white inline-flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            i
          </span>
          <p>{infoText}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {inputs.map((input) => (
          <LabInput
            key={input.name}
            label={input.label}
            required={input.required}
            value={values[input.name] || ''}
            onChange={(e) => onChange(input.name, e.target.value)}
            unit={input.unit}
            placeholder={input.placeholder}
            type={input.type || 'text'}
            options={input.options}
            hasMultipleCases={input.hasMultipleCases}
            refRange={input.refRange}
            refNote={input.refNote}
            onEditRange={
              input.onEditRange || (onEditRange ? () => onEditRange(input) : undefined)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentSectionCard;