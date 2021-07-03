import logo1 from '../assets/cda-logo1.png';
import logo3 from '../assets/cda-logo3.png';

export const Footer = () => {
    return (
        <div className="footer">
            <a href="/" className="w-nav-brand">
                <div className="div-block-33">
                    <img src={ logo1 } className="image5" alt="logo1" />
                    <img src={ logo3 } className="image6" alt="logo3" />
                </div>
            </a>
            <div className="div-block-21">
                <a href="/" className="button-2 w-button">Contáctanos</a>
                <a href="/" className="button-2 w-button">Ingresar a mi cuenta</a>
            </div>
        </div>
    )
}
