import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort"
import { FETCH_DOG, SEARCH_DOG, GET_BREED, SORT, ORDER_WEIGHT, ORDER_CREATED, FILTER_BY_TEMP, GET_TEMPERAMENTS, POST_DOGS, GET_DETAIL } from "../actions/"


const initialState = {
    dog: [],
    filteredDog: [],
    temperaments: [],
    detail: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DOG:
            return {
                ...state,
                dog: action.payload,
                filteredDog: action.payload,
            }
        case SEARCH_DOG:
            return {
                ...state,
                dog: action.payload,
            }
        case GET_BREED:
            return {
                ...state,
                temperaments: action.payload
            }
            case SORT:
                let order =
            action.payload === "desc"
              ? state.dog?.sort(function (a, b) {
                  if (a.name < b.name) {
                    return 1;
                  }
                  if (a.name > b.name) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
              : state.dog?.sort(function (a, b) {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (a.name < b.name) {
                    return -1;
                  } else {
                    return 0;
                  }
                });
                return {
                    ...state,
                    dog: order,
                  };
        case ORDER_WEIGHT:
            let sorted_Arr =
              action.payload === "mayor_menor"
              ? state.dog.sort(function (a, b) {
                    let grande = parseInt(a.weight.replace('-','').substr(0,2))
                    let chico = parseInt(b.weight.replace('-','').substr(0,2))
                    if (grande > chico) {
                        return -1;
                    }
                    if (grande < chico) {
                        return 1;
                    }
                    return 0;
                })
                : state.dog.sort(function (a, b) {
                    return parseInt(a.weight.replace('-','').substr(0,2)) - parseInt(b.weight.replace('-','').substr(0,2))
                });
            return {
              ...state,
              dog: sorted_Arr,
            };
            case ORDER_CREATED:
            const all = state.filteredDog;
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(el => el.createdDb) : all.filter(el => !el.createdDb);
            return {
                ...state,
                dog: originFiltered
            }

              case FILTER_BY_TEMP:
                const allDogs3 = state.filteredDog
                const tempDogs = allDogs3.filter(dog => {
                    if(dog.temperaments){
                        const temperament = dog.temperaments.map( dog => dog.name)
                        return temperament.includes(action.payload)}
                    if (dog.temperament) { 
                        return dog.temperament.includes(action.payload)
                    }
                    return null
                })
    
                return {
                    ...state,
                    dog: action.payload === 'Temps' ? allDogs3 : tempDogs,
    
                }

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
          case POST_DOGS: 
          return {
              ...state,
          };
          case GET_DETAIL:
            return {
              ...state,
              detail: action.payload
            }

        default: return state
    };


}
