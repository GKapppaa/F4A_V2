import React from 'react';
import {Button as BootstrapButton} from 'react-bootstrap';
import '../../styles/atoms/Boton.css'

function Button({children, onClick="button", type, className=""}){
    const tipo = type;
    return(
        <button type={type} onClick={onclick} className={className}>{children}</button>
    );
}

export default Button;