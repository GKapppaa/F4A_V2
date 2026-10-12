import '../../styles/atoms/Input.css'

function Input({type="text", placeholder, required=false, className="", value, onChange}){
    return(
        <input type={type} 
               placeholder={placeholder} 
               //className={className} 
               className={`atom-input ${className}`.trim()} //asi toma los valores del Input.css
               required={required} 
               value={value} 
               onChange={onChange}/>
    );
}
export default Input;