const NavButton = ({ onClick, children, isActive, className = "" }) => {
    return (
        <button onClick={onClick} className={`max-w-full min-w-0 overflow-hidden whitespace-nowrap cursor-pointer transition duration-200 pb-0.5 border-b-2 inline-flex items-center gap-1.5 ${isActive ? "text-primary border-primary font-extrabold" : "text-gray-500 hover:text-primary border-transparent"} ${className}`}>
            <span className="min-w-0 truncate inline-flex items-center gap-1.5">{children}</span>
        </button>
    )
};

export default NavButton;
