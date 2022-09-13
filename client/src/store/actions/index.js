import axios from "axios"
export const FETCH_DOG = "FETCH_DOG"
export const SEARCH_DOG = "SEARCH_DOG"
export const GET_BREED = "GET_BREED"
export const SORT = "SORT"
export const ORDER_WEIGHT = "ORDER_WEIGHT"
export const ORDER_CREATED = "ORDER_CREATED"
export const FILTER_BY_TEMP = "FILTER_BY_TEMP"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const POST_DOGS = "POST_DOGS"
export const GET_DETAIL = "GET_DETAIL"
export function fetchDog(){
    return function(dispatch) {
        axios.get("http://localhost:3001/api/dog/")
        .then ((dog) => {
            dispatch({
                type: FETCH_DOG,
                payload: dog.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export function searchDog(search) {
    return function(dispatch) {
        axios.get("http://localhost:3001/api/dog?name=" + search)
        .then ((dog) => {
            dispatch({
                type: SEARCH_DOG,
                payload: dog.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

}
export function sort(order){
    return {
        type: SORT,
        payload: order
    }
}
export function orderweight(orders) {
    return {
    type: ORDER_WEIGHT,
    payload: orders
    }
}
export function orderCreated(payload) {
    return {
        type: ORDER_CREATED,
        payload, 
    }
};
export function filterByTemp(payload) {
    return {
      type: FILTER_BY_TEMP,
      payload,
    };
  }
  export function getTemperaments() {
    return async function (dispatch) {
      var info = await axios.get("http://localhost:3001/api/temperament", {});
      return dispatch({ type: GET_TEMPERAMENTS, payload: info.data });
    };
  }
export function postDog(payload){
    return async function (dispatch){
        const json= await axios.post('http://localhost:3001/api/dog/',payload)
         console.log(json.data) 
        return dispatch({
            type: POST_DOGS,
            json
        });
    }
}
export const getDetail = (id) => (dispatch) => {
    return fetch(`http://localhost:3001/api/dog/${id}`)
    .then ((response) => response.json())
    .then ((json) => {
        dispatch ({
            type: GET_DETAIL,
            payload: json
        })
    })
}
