

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 border-gray-300 text-black focus:ring-black rounded-none transition-colors cursor-pointer"
        {...props}
      />
      <label className="ml-2 text-base text-gray-900 cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};