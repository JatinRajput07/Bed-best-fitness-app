import { TagsInput } from "react-tag-input-component";

const TagsInputComponent = ({ label, value, onChange, error }) => (
    <div className="mt-10">
        <label className="block text-sm font-medium text-gray-900">{label}</label>
        <TagsInput
            value={value}
            onChange={onChange}
            name={label.toLowerCase()} // Use the label as name
            placeHolder={`Enter ${label.toLowerCase()}`}
        />
        {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
    </div>
);
export default TagsInputComponent;
