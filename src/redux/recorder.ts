import {Action} from "redux";
import {RootState} from "./store";

interface RecorderState {
    dateStart: string;
}

const initialState:RecorderState = {
    dateStart: ''
}

const START = 'recorder/start'
const STOP = 'recorder/stop'

type StartAction = Action<typeof START>
type StopAction = Action<typeof STOP>

export const start = ():StartAction => {
    return {
        type: START
    }
}
export const stop = ():StopAction => {
    return {
        type: STOP
    }
}

export const recorderState = (rootState: RootState) => {
    return rootState.recorder
}

export const selectDateStart = (rootState: RootState) => {
    return recorderState(rootState).dateStart
}

const recorderReducer = (state = initialState, action: StopAction | StartAction) => {
    switch (action.type) {
        case START:
            return {...state, dateStart: new Date().toISOString()};
        case STOP:
            return {...state, dateStart: ''};
        default:
            return state
    }
}
export default recorderReducer