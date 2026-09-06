import Button from './Button';

const NavButton = ({ onClick, children, isActive, className = "" }) => {
  return (
    <Button
      onClick={onClick}
      variant="nav"
      size="sm"
      className={`nav-button ${isActive ? "text-primary border-primary" : "hover:text-primary border-transparent"} ${className}`}
    >
      {children}
    </Button>
  )
};

export default NavButton;
