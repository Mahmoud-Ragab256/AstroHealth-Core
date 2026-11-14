const LabInput = ({
  label,
  required,
  value,
  onChange,
  unit,
  placeholder,
  type = "text",
  options = [],
  hasMultipleCases,
  refRange,
  refNote = "(demo default)",
  onEditRange,
}) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      <label className="text-base font-medium text-[#203040]">
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>

      <div className="relative flex items-center w-full">
        {type === "select" ? (
          <select
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-[#1D4F9C] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="" disabled>
              {placeholder || "Select"}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 ${unit ? "pr-24" : ""
              } text-base text-gray-900 focus:border-[#1D4F9C] focus:outline-none transition-colors`}
          />
        )}

        {unit && type !== "select" && (
          <span className="absolute right-4 text-base font-medium text-gray-500 pointer-events-none">
            {unit}
          </span>
        )}
      </div>

      {hasMultipleCases && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 pt-0.5">
          <span>
            Lab reference: <span className="font-bold text-gray-900">{refRange}</span> {refNote}
          </span>

          {onEditRange && (
            <button
              type="button"
              onClick={onEditRange}
              className="inline-flex items-center gap-1 text-[#1D4F9C] hover:text-[#173F7D] underline font-medium ml-2 cursor-pointer"
            >
              <span>✎</span>
              <span>Edit range</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LabInput;