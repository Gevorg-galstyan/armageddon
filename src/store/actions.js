import {request} from '../helpers/request';
import {selectedAsteroids} from "../helpers/utils";
import * as actionTypes from "./actionTypes"


export function getAsteroids() {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        const result = request(new Date())
        result
            .then(async res => {
                const resource = await res;
                dispatch({type: actionTypes.LOAD_ASTEROIDS, resource})
                dispatch({type: actionTypes.ADD_TO_DESTRUCT, selectedAsteroids})
            })
            .catch(err => {
                alert(err)
            });
    }
}

export function getSingleAsteroid(id) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        const result = request(null, id)
        result
            .then(async res => {
                const resource = await res;
                dispatch({type: actionTypes.LOAD_SINGLE_ASTEROID, resource})
            })
            .catch(err => {
                alert(err)
            });
    }
}

export function setDistanceType(bool) {
    return (dispatch) => {
        dispatch({type: actionTypes.CHANGE_DISTANCE_TYPE, bool});
    }
}

export function addToDestruct(id) {
    return (dispatch) => {
        if (selectedAsteroids.size <= 0) {
            selectedAsteroids.add(id)
        } else {
            selectedAsteroids.has(id) ? selectedAsteroids.delete(id) : selectedAsteroids.add(id)
        }

        localStorage.setItem('forDestruction', JSON.stringify(Array.from(selectedAsteroids)))

        dispatch({type: actionTypes.ADD_TO_DESTRUCT, selectedAsteroids});
    }
}

export function destructAsteroids() {
    return (dispatch) => {
        selectedAsteroids.clear();
        localStorage.setItem('forDestruction', JSON.stringify(Array.from(selectedAsteroids)))
        dispatch({type: actionTypes.DESTRUCT_ASTEROIDS, selectedAsteroids});
    }
}
