import axios from 'axios';
import { GET_ALL_SECTORS_FAIL, GET_ALL_SECTORS_REQUEST, GET_ALL_SECTORS_SUCCESS, SECTOR_CREATE_FAIL, SECTOR_CREATE_REQUEST, SECTOR_CREATE_SUCCESS, SECTOR_DELETE_FAIL, SECTOR_DELETE_REQUEST, SECTOR_DELETE_SUCCESS, SECTOR_DETAILS_FAIL, SECTOR_DETAILS_REQUEST, SECTOR_DETAILS_SUCCESS, SECTOR_LIST_DATA_FAIL, SECTOR_LIST_DATA_REQUEST, SECTOR_LIST_DATA_SUCCESS, SECTOR_UPDATE_FAIL, SECTOR_UPDATE_REQUEST, SECTOR_UPDATE_SUCCESS } from "./userConstants";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const listSectors = () => async (dispatch) => {
    try {

        dispatch({type: GET_ALL_SECTORS_REQUEST})

        const { data } = await axios.get(`${baseUrl}/sectors`);

        dispatch({
            type: GET_ALL_SECTORS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: GET_ALL_SECTORS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listUsersData = () => async (dispatch) => {
    try {

        dispatch({type: SECTOR_LIST_DATA_REQUEST})

        const { data } = await axios.get(`${baseUrl}/usersData`);

        dispatch({
            type: SECTOR_LIST_DATA_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: SECTOR_LIST_DATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUserDataDetails = (id) => async (dispatch) => {
    try {

        dispatch({type: SECTOR_DETAILS_REQUEST})

        const { data } = await axios.get(`${baseUrl}/usersData/${id}`);

        dispatch({
            type: SECTOR_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: SECTOR_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteUserData = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: SECTOR_DELETE_REQUEST
        })
    
        await axios.delete(`${baseUrl}/usersData/${id}`);
    
        dispatch({
            type: SECTOR_DELETE_SUCCESS
        });
    
    } catch(error) {
        dispatch({
            type: SECTOR_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createUserData = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: SECTOR_CREATE_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(`${baseUrl}/usersData/create`, formData, config);

        dispatch({
            type: SECTOR_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: SECTOR_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateUserData = (sector) => async (dispatch, getState) => {

    try {
        dispatch({
            type: SECTOR_UPDATE_REQUEST
        })
    
        const {data} = await axios.put(`${baseUrl}/`, sector);
    
        dispatch({
            type: SECTOR_UPDATE_SUCCESS,
            payload: data
        });
    
    } catch(error) {
        dispatch({
            type: SECTOR_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}