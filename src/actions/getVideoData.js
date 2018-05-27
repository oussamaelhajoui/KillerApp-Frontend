import { GET_VIDEO_DATA, GET_VIDEO_DATA_LOADING } from './types';
import Restful from '../logic/Restful';

export const getVideoData = (data) => dispatch => {
    dispatch({
        type: GET_VIDEO_DATA_LOADING,
        payload: {
            loadingVideoData: true
        }
    });

    Restful.Get(`video/get/${data.mediaid}`, data.token)
        .then(response => response.json())
        .then(result => {
            dispatch({
                type: GET_VIDEO_DATA,
                payload: {
                    data: { ...result },
                    loadingVideoData: false
                }
            })
        })





};
