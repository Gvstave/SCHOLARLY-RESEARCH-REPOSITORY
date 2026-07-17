const NavButton = ({ onClick, children, isActive, className = "" }) => {
    return (
        <button onClick={onClick} className={`cursor-pointer transition duration-200 pb-0.5 border-b-2 inline-flex items-center gap-1.5 ${isActive ? "text-primary border-primary font-extrabold" : "text-gray-500 hover:text-primary border-transparent"} ${className}`}>
            {children}
        </button>
    )
};

export default NavButton;