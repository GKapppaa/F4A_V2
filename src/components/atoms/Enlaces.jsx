function Enlace({children, href, target, className=""}){
    return <a href={href} target={target} className={`atom-enlaces ${className}`} >{children}</a>;
}

export default Enlace;