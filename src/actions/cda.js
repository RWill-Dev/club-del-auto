import { types } from '../types/types';
import { fetchSinToken, fetchEnhance } from '../helpers/fetch';
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

export const cuponsStartLoading = () => {
    return async(dispatch) => {

        try {    
            
            const resp = await fetchSinToken( 'cupones' );          
            const body = await resp.json();                     
            
            dispatch( cuponLoaded( body ) );

        } catch (error) {
            console.log('Access Unauthorized')
        }

    }
}

export const getCuponClientes = (id) => {
    return async (dispatch) => {

        try {        
            dispatch(({ type: types.GET_COUPON_CLIENTE }));
            const response = await fetchEnhance(`getCuponclientesByClient/${id}`);
            const cuponCliente = await response.json();           
            
            dispatch(({ 
                type: types.GET_COUPON_CLIENTE_SUCCESS,
                payload: cuponCliente 
            }));                      
    
        } catch (error) {
            console.log(error)
        }
    }
}
export const getTextosApp = () => {
    return async(dispatch) => {
        try {        
            dispatch(({ type: types.GET_TEXTOS_APP }));
            const response = await fetchEnhance(`app`);
            const textos = await response.json();              
           
            dispatch(({ 
                type: types.GET_TEXTOS_SUCCESS,
                payload: textos 
            }));            
    
        } catch (error) {
            console.log(error)
        }   
    }
}
export const getBannersCupones = () => {
    return async(dispatch) => {
        try {        
            dispatch(({ type: types.GET_BANNERS_CUPONES }));
            const response = await fetchEnhance(`banners-cupones`);
            const banners = await response.json();              
            
            dispatch(({ 
                type: types.GET_BANNERS_SUCCESS,
                payload: banners 
            }));            
    
        } catch (error) {
            console.log(error)
        }   
    }
}

const cuponLoaded = (cupons) => ({
    type: types.cuponLoaded,
    payload: cupons
})

export const getCouponById = id => async(dispatch) => {
        try {        
            dispatch(({ type: types.GET_COUPON_REQUEST }));
            const response = await fetchEnhance(`cupones/${id}`);
            const coupon = await response.json();
            
            // console.log(coupon)          
            
            dispatch(({ 
                type: types.GET_COUPON_SUCCESS,
                payload: coupon 
            }));            

        } catch (error) {
            console.log(error)
        }   
}

export const buyCoupon = ( rut, patente, cupon ) => {
    return async( dispatch ) => {
        
        Swal.showLoading();
        let rutNew = rut.replace(/"/g,'')
        const data = { "identifier": rut, "cupon": cupon }; 

        //Validar si el cupon tiene maximos de solicitudes por patente

        const resp = await fetchSinToken( 'cupones/obtener/'+rutNew+'/'+cupon+'/'+patente, data, 'GET' );
        
        console.log(resp);

        if( resp.status === 200 ) {
            
            Swal.fire({
                icon: 'success',
                title: 'Cup??n obtenido',
                text: 'El detalle del cup??n fue enviado a su correo',
                footer: 'recuerda revisar la carpeta spam'
              })
            
        } else {
            if( resp.status === 406 ) {
                Swal.fire('Error', 'Cup??n agotado o caducado '+
                    '</BR> Ya superaste el m??ximo de cupones a solicitar para este servicio.', 'error');
            }
            else{
                Swal.fire('Error', 'Ocurri?? un error al procesar el cup??n', 'error');
            } 
        }
        

    }
}

export const suscripcion = ( nombre, email ) => {
    return async( dispatch ) => {
        
        Swal.showLoading();

        const data = { "nombre": nombre, "email": email };       

        const resp = await fetchSinToken( 'suscripciones', data, 'POST' );
        console.log("consulta en BD: "+resp);
        console.log("status de la respuesta: "+resp.status);

        if( resp.status === 200 ) {
            
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'Pr??ximamente te enviaremos noticias!'
              })
            
        } else {            
            Swal.fire('Error', 'Ocurri?? un error al registrar tu suscripci??n, Intenta de nuevo m??s tarde.', 'error');
        }
        

    }
}

export const sendFormChoque = (data) => {
    return async () => { 
        Swal.showLoading();     
        var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };
        
        await fetch(`${baseUrl}/app/accidente`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log('resultado:',result)
            if( result.message==="OK"  || result.includes("OK") ) {            
                Swal.fire({
                    icon: 'success',
                    title: 'Datos enviados',
                    text: 'Tu caso pronto sera atendido'
                })
                
            } else {            
                Swal.fire('Error', 'Ocurri?? un error al enviar tus datos, Intenta de nuevo m??s tarde.', 'error');
            }
        }
        )
        .catch(error => console.log('error', error));                
    }
}

export const sendFormRobo = (data) => {
    return async () => {  
        // console.log(data) 
        Swal.showLoading();   
        var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };
        
        await fetch(`${baseUrl}/app/robo`, requestOptions)
        .then(response => response.text())
        .then(result => {
                console.log('resultado:',result)
                if( result.message==="OK"  || result.includes("OK") ) {            
                    Swal.fire({
                        icon: 'success',
                        title: 'Datos enviados',
                        text: 'Tu caso pronto sera atendido'
                    })
                    
                } else {            
                    Swal.fire('Error', 'Ocurri?? un error al enviar tus datos, Intenta de nuevo m??s tarde.', 'error');
                }
            }
        )
        .catch(error => console.log('error', error)); 
    }
}                          
export const sendAcc = ( rut, cupon ) => {
    return async( dispatch ) => {
        
        Swal.showLoading();
        let rutNew = rut.replace(/"/g,'')
        const data = { "identifier": rut, "cupon": cupon }; 

        const resp = await fetchSinToken( 'cupones/obtener/'+rutNew+'/'+cupon, data, 'GET' );

        if( resp.status === 200 ) {
            
            Swal.fire({
                icon: 'success',
                title: 'Incidente reportado',
                text: 'Los detalles fueron enviados a nuestro equipo',
                footer: 'El los pr??ximos d??as nos pondremos en contacto con ud'
            })
            
        } else {            
            Swal.fire('Error', 'Ocurri?? un error al procesar el cup??n', 'error');
        }
        

    }
}

export const cuponLogout =() => ({ type: types.cuponLogout });


