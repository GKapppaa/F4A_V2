function Image({src, alt, className=""}){
    return <img src={src} alt={alt} className={`atom-img ${className}`}/>;
}
export default Image;