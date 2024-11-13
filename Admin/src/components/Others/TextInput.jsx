const TextInput = ({ label, name, value, onChange, error }) => (
    <div className="col-span-full">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
            {label}
        </label>
        <input
            name={name}
            type="text"
            value={value}
            onChange={onChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        />
        {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
    </div>
);
export default TextInput;
