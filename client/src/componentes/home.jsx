
import { useSelector, useDispatch } from "react-redux"
 import { useEffect, useState } from "react"
 import { Link } from "react-router-dom"
 import { fetchDog, orderweight, sort, orderCreated, getTemperaments, filterByTemp} from "../store/actions"
import SearchBar from "./searchbar"
import Paginado from "./paginado"
import "./home.modules.css"
import Dogs from "./dogs"

export default function Home(){

const dogss = useSelector((state) => state.dog)
const cont = dogss
         let dispatch = useDispatch()
const act=useSelector((state)=>state.temperaments)
  const [order,setOrder]=useState('')
  const [loading,setLoading]=useState(false)
  const [current, setCurrent] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(10);
  const indexLc = current * countryPerPage; 
  const indexFc = indexLc - countryPerPage; 
  const currentC = dogss.slice(indexFc, indexLc);
  const pagination = (number) => {
    setCurrent(number);
  };
  const actSelect = [];
  act?.forEach((e) =>
    e.activities?.forEach((f) => {
      actSelect.push(f.name);
    })
  );
  const dataArr = new Set(actSelect);
  let result = [...dataArr];
  const [max, setMax] = useState(8);
  const [min, setMin] = useState(0);
function HandleNext(e) {
    setMax(max + 8);
    setMin(min + 8);
  }
  function HandlePrev(e) {
    setMax(max - 8);
    setMin(min - 8);
  }
  useEffect(() => {
    setMin(0);
    setMax(8);
  }, [cont]);

  useEffect(() => {
    dispatch(fetchDog())
    setLoading(true);
}, [dispatch])
useEffect(() => {
    dispatch(getTemperaments())
}, [dispatch])

function handleOrderScore(e){
    e.preventDefault()
    dispatch(orderweight(e.target.value))
    // setCurrentPage(1)
    setOrder(e.target.value)
}
function handleOrderSort(e){
    e.preventDefault()
    dispatch(sort(e.target.value))
    // setCurrentPage(1)
    setOrder(e.target.value)
  }
  function handleFilterByGenre(e){
    e.preventDefault()
    dispatch(filterByTemp(e.target.value))
    setOrder(e.target.value);
    // setCurrentPage(1)
  }
function orderCreateds(e) {
  e.preventDefault();
 dispatch(orderCreated(e.target.value));
 // setCurrentPage(1);
}
  function resetCharacters(e){
    e.preventDefault()
    dispatch(fetchDog())
  }
  return (<div  className='containersx'>
  <div>
  <div className='contenedor-filtro'>
  <h2 className='titlex'>DOG API</h2>
  </div>
  <div>
    <SearchBar/>
    <button disabled={min <= 0} onClick={(e) => HandlePrev(e)}>
        anterior
      </button>

      <button
        disabled={max >= cont.length - 1}
        onClick={(e) => HandleNext(e)}
      >
        siguiente
      </button>

  </div>

  <div className='contenedor-filtro'>
    <div>
  <button onClick={e =>resetCharacters(e)} className="remove">Reseteo</button>
  </div>
  <div>
  <select onChange={(e) => handleOrderSort(e)} className="selectA_Z">
     <option hidden={true} value='none'>Alfabeticamente</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        </div>
  <div>
         <select onChange={(e) => handleFilterByGenre(e)} className="selectCont">
            <option value="Temps">Filter by temperament</option>
            {act.map((temp) => (
              <option key={temp.id} value={temp.name}>{temp.name}</option>
            ))}
          </select>
  </div>
    <div  >
                        <select onChange={e => orderCreateds(e)} className="selectActivities"  >
                            <option value='all'>Todas las razas</option>
                            <option value='api'>Razas Existentes</option>
                            <option value='created'>Razas Creadas</option>
                        </select>
                    </div>
   <div>
   <select onChange={(e) => handleOrderScore(e)} className="selectFilter">
   <option hidden={true} value='none'>Por peso</option>
          <option value="mayor_menor">mayor peso</option>
          <option value="menor_menor">menor peso</option>
        </select>
        </div>
          <Link to= "/add"  className="btns">
              <button className="btns">CREAR RAZA</button> 
         </Link>
     </div>
     <Paginado
        countryPerPage={countryPerPage}
        dogss={dogss.length}
        pagination={pagination}
        setMax={setMax}
        setMin={setMin}
      />
   <div>
     <div className="containerCards">
    {loading?(
      dogss.length?(
        dogss.slice(min, max).map((dogs)=>{
        return( <Dogs
            id={dogs.id} name={dogs.name} image={dogs.image} temperaments={dogs.temperaments} temperament={dogs.temperament} weight={dogs.weight} createdDb={dogs.createdDb}
          />)
        })) :(
          <img className='loading' src='https://reygif.com/media/1/perro-nadando-10799.gif' alt='client\src\fondo-create.jpg'/>
        )):
        <img className='loading' src='https://reygif.com/media/1/perro-nadando-10799.gif' alt='client\src\fondo-create.jpg'/>

      }
      </div>
    </div>
  </div>  
  <div className='contenedor-filtro'>
  
  </div>
</div>
)
}