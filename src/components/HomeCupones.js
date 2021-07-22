


export const HomeCupones = () => {

    const mockCupons = [1,2,3,4,5,6];
    
    return (
        <div className="cupones">
            <div className="div-block-17">
                <h1 className="titulos-centrados">Cupones de descuento</h1>
            </div>
            <div className="div-block-10">
                {
                    mockCupons.length > 1 &&
                    mockCupons.slice(0, 3).map(( cupon, key ) => (

                        <div className="cupon-card" key={ key }>
                            <h1 className="heading-5">25% Off</h1>
                            <p className="texto-cupones">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="div-block-20">
                                <a href="/" className="link">OBTENER CUPÓN</a>
                                <div className="div-block-19"></div>
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className="div-block-18">
                <a href="/cupones-de-descuento" className="coupons">Ver todos los cupones</a>
            </div>
        </div>
    )
}
