


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`w-full bg-black text-white text-sm font-medium uppercase tracking-widest py-4 hover:bg-gray-800 transition-all duration-300 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};