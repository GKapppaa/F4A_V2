import React from 'react';
import '../../styles/organisms/Footer.css';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';
import Enlaces from '../atoms/Enlaces';

export const Footer = () => {


    return (
        <footer className="site-footer">
            <div className='footer-brand'>
                <Logo/>
            </div>
            <div className='footer-FAQ'>
                <Text variant='h3'>FAQ</Text>
                <Enlaces href="/Nosotros">Nosotros</Enlaces>

            </div>
            
        </footer>
    )
}

export default Footer;
