import * as actionTypes from "./actionTypes";
import {selectedAsteroids} from "../helpers/utils";

let defaultState = {
    asteroids: null,
    singleAsteroid: null,
    distance: true,
    loader: false,
    forDestruct: new Set(),
    video: ''
}

export function reducer(state = defaultState, action) {
    switch (action.type) {

        case actionTypes.PENDING : {
            return {
                ...state,
                loader: true,
                singleAsteroid: null,
            }
        }

        case actionTypes.LOAD_ASTEROIDS : {
            return {
                ...state,
                loader: false,
                asteroids: {...action.resource.near_earth_objects}
            }
        }

        case actionTypes.LOAD_SINGLE_ASTEROID : {
            return {
                ...state,
                loader: false,
                singleAsteroid: action.resource
            }
        }

        case actionTypes.CHANGE_DISTANCE_TYPE : {
            return {
                ...state,
                distance: action.bool
            }
        }

        case actionTypes.ADD_TO_DESTRUCT : {

            return {
                ...state,
                forDestruct: new Set([...action.selectedAsteroids])
            }
        }

        case actionTypes.DESTRUCT_ASTEROIDS : {

            return {
                ...state,
                forDestruct: new Set([...selectedAsteroids]),
            }
        }

        default :
            return state
    }


}

