import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import "./dogDetail.modules.css"
export default function DogsDetail() {

    const [dog, setDog] = useState(null)
    let {id} = useParams()

    useEffect (() => {
        axios.get("http://localhost:3001/api/dog/" + id)
        .then((response) => {
            setDog(response.data)
            console.log(response.data)
        })
    }, [])
    return <div className="general">
        {
        dog ? ( 
        <div className="containerxsx">
        <h3 className="titlexs">{dog.name}</h3>
        <img src={dog.image} alt="imagen" className="imgx" />
       <h4>
                
                Temperaments:
                {dog.temperaments ? (
                  dog.temperaments.map((act) => {
                   return (
                     <div key={act}>
                       <h4> 
                         {" "}
                         {act.name
                           ? act.name
                           : "No posee actividad"}{" "}
                       </h4>
                     </div>
                   );
                 })
               ) : (
                 <p> {dog.temperament} </p>
               )}{" "}
             </h4> 
        <p>Weight: {dog.createdDb ? dog.weight : dog.weight.metric} kg</p>
        <p>Height: {dog.createdDb ? dog.height : dog.height.metric} cm</p>
        <p>Lifespan: {dog.life_span} years</p>
        <Link to='/Home'><button className="btnx" >Volver</button></Link>
        
        
        </div>) : (
        <div className="loadingx">Loading...</div> )
        }
    </div>
 }





