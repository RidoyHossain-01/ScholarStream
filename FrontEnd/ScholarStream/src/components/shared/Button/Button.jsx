const Button = ({
  label,
  type,
  onClick,
  disabled,
  outline,
  small,
  full_Width,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`relative
           disabled:opacity-70
            disabled:cursor-not-allowed
               rounded-lg
                hover:opacity-85
               animation
               cursor-pointer
               px-4
          ${full_Width ? "w-full" : ``}
          ${outline ? "bg-transparent border-accent text-accent hover:bg-accent hover:text-white" : "bg-accent text-white border-accent"}
          ${small ? "text-sm py-1 font-light border" : "text-md py-3 font-semibold border-2"}
               `}
    >
      <span className="flex items-center gap-2 justify-center">
        {Icon && <div size={24}>{Icon}</div>}
        {label}
      </span>
    </button>
  );
};

export default Button;
