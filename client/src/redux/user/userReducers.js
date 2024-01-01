import { GET_ALL_SECTORS_FAIL, GET_ALL_SECTORS_REQUEST, GET_ALL_SECTORS_SUCCESS, SECTOR_CREATE_FAIL, SECTOR_CREATE_REQUEST, SECTOR_CREATE_RESET, SECTOR_CREATE_SUCCESS, SECTOR_DELETE_FAIL, SECTOR_DELETE_REQUEST, SECTOR_DELETE_SUCCESS, SECTOR_DETAILS_FAIL, SECTOR_DETAILS_REQUEST, SECTOR_DETAILS_SUCCESS, SECTOR_LIST_DATA_FAIL, SECTOR_LIST_DATA_REQUEST, SECTOR_LIST_DATA_SUCCESS, SECTOR_UPDATE_FAIL, SECTOR_UPDATE_REQUEST, SECTOR_UPDATE_RESET, SECTOR_UPDATE_SUCCESS } from "./userConstants";


export const sectorsListReducer = (state = { sectors: [] }, action) => {

    switch(action.type) {
        case GET_ALL_SECTORS_REQUEST:
            return { loading: true, sectors: [] }
        case GET_ALL_SECTORS_SUCCESS:
            return { loading: false, sectors: action.payload }
        case GET_ALL_SECTORS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }

}

export const sectorListDataReducer = (state = { usersData: [] }, action) => {

    switch(action.type) {
        case SECTOR_LIST_DATA_REQUEST:
            return { loading: true, usersData: [] }
        case SECTOR_LIST_DATA_SUCCESS:
            return { loading: false, usersData: action.payload }
        case SECTOR_LIST_DATA_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }

}

export const sectorDetailsReducer = (state = { sector: {} }, action) => {

    switch(action.type) {
        case SECTOR_DETAILS_REQUEST:
            return { loading: true, ...state }
        case SECTOR_DETAILS_SUCCESS:
            return { loading: false, sector: action.payload }
        case SECTOR_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }

}

export const sectorDeleteReducer = (state = {}, action) => {

    switch(action.type) {
        case SECTOR_DELETE_REQUEST:
            return { loading: true, ...state }
        case SECTOR_DELETE_SUCCESS:
            return { loading: false, success: true }
        case SECTOR_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }

}

export const sectorCreateReducer = (state = {}, action) => {

    switch(action.type) {
        case SECTOR_CREATE_REQUEST:
            return { loading: true }
        case SECTOR_CREATE_SUCCESS:
            return { loading: false, success: true, sector: action.payload }
        case SECTOR_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SECTOR_CREATE_RESET:
            return {};
        default: 
            return state;
    }

}

export const sectorUpdateReducer = (state = {sector: {} }, action) => {

    switch(action.type) {
        case SECTOR_UPDATE_REQUEST:
            return { loading: true }
        case SECTOR_UPDATE_SUCCESS:
            return { loading: false, success: true, sector: action.payload }
        case SECTOR_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case SECTOR_UPDATE_RESET:
            return {};
        default: 
            return state;
    }

}