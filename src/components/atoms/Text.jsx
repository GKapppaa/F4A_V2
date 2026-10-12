function Text({children, variant='p', className=""}){
    const Tag = variant;
    return <Tag className={`atom-text ${className}`}>{children}</Tag>;
}

export default Text;