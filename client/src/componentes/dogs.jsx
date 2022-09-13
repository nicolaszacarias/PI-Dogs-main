import { Link } from "react-router-dom"
import "./dogs.modules.css"
export default function Dogs({id, name, image, temperaments, weight, temperament, createdDb}) {
   return <div className="containerss">
       <Link to={`/${id}`} className="cards">
       <h3 className="titles">{name}</h3>
       <img className="imgs" src={image} alt="image" />
         {/* <p className='info'>{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments;
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}</p> */}
        <p>Temperaments: {createdDb ? temperaments.map(e => e.name).join(", ") : temperament}</p>  
        <p>Weight: {weight} kg</p>
       </Link>
   </div>   
}
