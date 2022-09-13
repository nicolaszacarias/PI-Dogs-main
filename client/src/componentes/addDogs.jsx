
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./addDogs.modules.css"

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Tu raza debe tener un nombre.';
    }
    else if (input.name.length > 30) {
        errors.name = 'Ese es un nombre demasiado largo.';
    }
    else if(!isNaN(Number(input.name))) {
        errors.name = 'El nombre del perro no pueden ser numeros';
    }
    else if (!input.heightMin) {
        errors.heightMin = 'Se requiere altura mínima!';
    }
    else if (isNaN(parseInt(input.heightMin))) {
        errors.heightMin = 'La altura debe ser un número';
    }
    else if (input.heightMin <= 0) {
        errors.heightMin = 'La altura no puede ser menor a 0';
    }
    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'La altura mínima debe ser inferior a la altura máxima';
    }
    else if (!input.heightMax) {
        errors.heightMax = 'Falta completar Altura Maxima';
    }
    else if (isNaN(parseInt(input.heightMax))) {
        errors.heightMax = 'La altura debe ser un número';
    }
    else if (input.heightMax > 150) {
        errors.heightMax = 'el maximo de altura es de 150';
    }
    else if (!input.weightMin) {
        errors.weightMin = 'Se requiere peso mínimo!';
    }
    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'El peso debe ser un número.';
    }
    else if (input.weightMin <= 0) {
        errors.weightMin = 'No se admiten numeros menores a 0';
    }
    else if (!input.weightMax) {
        errors.weightMax = 'Se requiere peso máximo!';
    }
    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'El peso debe ser un número.';
    }
    else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
        errors.weightMax = 'El peso máximo debe ser mayor que el peso mínimo';
    }
    else if (input.weightMax > 200) {
        errors.weightMax = 'El maximo de peso es 200, ponga un numero menor';
    }
    else if (!input.life_span) {
        errors.life_span = 'Falta completar el campo de vida';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'La vida útil debe ser un número';
    }
    else if (input.life_span > 50) {
        errors.life_span = 'Los años maximos son 50';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'No puede ser menor que 0 la vida de un perro';
    } else if (!input.image) {
        errors.image = "Please insert internet image URL";
    } else if (
        !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|)/.test(input.image)
      ) {
        errors.image = "Please insert a valid image URL";
      }

    return errors;
}

export default function AddDogs() {

    const dispatch = useDispatch();
 
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperament: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        // Esta función hace lo siguiente:
        // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
        // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
        // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSelect(e) {
        if (!input.temperament.includes(e.target.value)) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            });
            // console.log(input);
        }
    }




    function handleSubmit(e) {
        e.preventDefault();
        // console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span && input.temperament.length && input.image) {
            const formCompleto = {
                name: input.name,
                weight: input.weightMin + " - " + input.weightMax,
                height: input.heightMin + " - " + input.heightMax,
                life_span: input.life_span,
                image: input.image,
                temperament: input.temperament,
              };
            dispatch(postDog(formCompleto));
            alert('Breed creado con Exito');
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperament: [],
            });
           
        } else {
            alert('Faltan datos para crear')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp=> temp !== el)
        });
    }
 

    return (
        <div className='fondo'>
           
            <h1 className='title-create'> Create A New Breed </h1>
            <br/>
            <div className="containerCv">
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong className="nombre">Nombre: </strong></label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Altura mínima: </strong></label>
                    <input type='text' value={input.heightMin} name='heightMin' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMin && (
                        <p className='error'><strong>{errors.heightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Altura máxima: </strong></label>
                    <input type='text' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMax && (
                        <p className='error'><strong>{errors.heightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong >Peso mínimo: </strong></label>
                    <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMin && (
                        <p className='error'><strong>{errors.weightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong >Peso máximo: </strong></label>
                    <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMax && (
                        <p className='error'><strong>{errors.weightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Esperanza de vida: </strong></label>
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong> Años</strong></label>
                    {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Imagen: </strong></label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                    {errors.image && (
                        <p className='error'><strong>{errors.image}</strong></p>
                    )}
                </div>
                <div>
                    <select onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperamentos</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperament.map(el => {
                        return (
                            
                                <ul key={el}>
                                    <li>
                                        <p className='temp1'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} >X</button>
                                    </li>
                                </ul>
                            
                        )
                    })}

                </div>
                {/* crear el botton de dog y enviar al home */}
                {/* <button type='submit' className='boop' ><strong>Crear<IoPaw/></strong></button> */}
               <button type='submit' ><strong>Crear</strong></button>
               {/* button de salida */}
                 <Link to='/home'><button ><strong>Volver</strong></button></Link>
               {/* <Link to='/home'><button className='buttonHome'>Home <GiDogHouse /></button></Link> */}
            </form>
            </div>
        </div>
    )
}
