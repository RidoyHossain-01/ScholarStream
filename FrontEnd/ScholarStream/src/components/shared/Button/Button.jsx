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
              
               text-white
               ${full_Width ? "w-full" : ``}
               
          ${outline ? "bg-white" : "bg-accent"}
          ${outline ? "border-black" : "bg-accent"}
          ${outline ? "text-black" : "text-white"}
          ${outline ? "hover:bg-accent" : ""}
          ${outline ? "hover:text-white" : ""}
          ${small ? "text-sm" : "text-md"}
          ${small ? "py-1" : "py-3"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "border" : "border-2"}
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
