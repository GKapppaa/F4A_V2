function Input({type="text", placeholder, required=false, className="", value, onChange}){
    return(
        <input type={type} placeholder={placeholder} className={className} required={required} value={value} onChange={onChange}></input>
    );
}
export default Input;