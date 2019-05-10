import React, { Component } from 'react';
import Producto from '../Producto/Producto';
import Buscador from '../Buscador/Buscador';
import './Productos.css';
import axios from 'axios';
class Productos extends Component {
     state = {
          productos : [],
          terminoBusqueda : ''
     }

     componentWillMount() {
          this.queryAPI();
     }

     queryAPI = () =>{
          //console.log(this.props.auth.isAuthenticated());
          const {getAccessToken} = this.props.auth;
          //permite ganar autorizacion con un token valido en auth0
          const headers = {'Authorization': `Bearer ${getAccessToken()}`}; // 
          //puerto + endpoint protegido.
          const url = 'http://localhost:5000/productos';

          return axios.get(url, {headers})
               .then(respuesta => console.log(respuesta.data));
     }
     
     login = () => {
          this.props.auth.login();
     }

     render() { 
          const {isAuthenticated} = this.props.auth;
          return ( 
               <div className="productos">
                    <h2>Nuestros Productos</h2>
                    <Buscador
                        busqueda={this.props.busquedaProducto}/>
                        {isAuthenticated() && (
                             <p>Estas Logueado</p>
                        )}
                    <ul className="lista-productos"></ul>
                    {!isAuthenticated() && (<div className="contenedor-boton"> 
                         <p>Para ver debes estar logueado</p>
                         <a className="boton" onClick={this.login}> Iniciar Sesion</a>
                    </div>)}
               </div>
           )
     }
}
 
export default Productos;


/**
 * 
 * {Object.keys(this.props.productos).map(producto => (
     <Producto
          informacion={this.props.productos[producto]}
          key={producto}
     />
)) }
 */


