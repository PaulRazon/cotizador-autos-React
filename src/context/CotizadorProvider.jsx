import { createContext, useState } from "react";
import { obtenerDiferenciaYear,calcularMarca, calcularPlan, formatearDinero } from "../helpers";
const CotizadorContext  = createContext()

//provider una funcion que indicas de donde vienen los datos

const CotizadorProvider = ({children}) =>{

    const [datos,setDatos] = useState({
        marca:'',
        year:'',
        plan:''
    })

    const [error,setError] = useState('')
    const [resultado,setResultado] = useState(0)
    const [cargando,setCargando] = useState(false)
    const handleChangeDatos = e =>{
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

    }

    const cotizarSeguro=()=>{
        //una base
        let resultado =2000
        //obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        
        //Hay que restar el 3% por cada año
        resultado -= ( (diferencia * 3) * resultado) / 100
       
        //Europeo 30%
         //Americano 15%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        
       

        //Plan basico 20%
        //Completo 50%

        resultado *= calcularPlan(datos.plan)
        //Formatear Dinero
        resultado = formatearDinero(resultado)
        setCargando(true)
        setTimeout(()=>{
            setResultado(resultado)
            setCargando(false)
        },3000)
        

    }
    return(
        
        <CotizadorContext.Provider
            value={{
              datos,
              handleChangeDatos,
              error,
              setError,
              cotizarSeguro,
              resultado,
              cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext