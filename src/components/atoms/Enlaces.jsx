import { Link } from 'react-router-dom';

function Enlace({ children, href = '/', target, className = '' }) {
  return (
    <Link to={href} target={target} className={`atom-enlaces ${className}`}>
      {children}
    </Link>
  );
}

export default Enlace;
