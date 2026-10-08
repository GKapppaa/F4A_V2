function Enlace({children, href, target, className}){
    return <a href={href} target={target} className={className} >{children}</a>;
}

export default Enlace;