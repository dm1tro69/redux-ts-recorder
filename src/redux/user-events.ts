import {Action, AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";



interface UserEvent {
    id: number;
    title: string;
    dateStart:string;
    dateEnd:string;
}
interface UserEventState {
    byIds: Record<UserEvent['id'], UserEvent>;
    allIds: UserEvent['id'][];
}
const LOAD_REQUEST = 'userEvents/load_request'

interface LoadRequestAction extends Action<typeof LOAD_REQUEST>{
    
}
const LOAD_SUCCESS = 'userEvents/load_success'

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS>{
    payload: {
        events: UserEvent[]
    }
}
const LOAD_FAILURE = 'userEvents/load_failure'

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
   payload: string
}

export const loadUserEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoadRequestAction | LoadSuccessAction |LoadFailureAction
    > => async (dispatch, getState) => {
    dispatch({
        type: LOAD_REQUEST
    })
    try {
        const response = await fetch('http://localhost:3001/events')
        const events: UserEvent[] = await response.json()
        dispatch({
            type: LOAD_SUCCESS,
            payload: {events}
        })
    }catch (e) {
        dispatch({
            type: LOAD_FAILURE,
            payload: 'Failed to load events'
        })
    }
}

const initialState: UserEventState = {
    byIds: {},
    allIds: []
}

const userEventsReducer = (state:UserEventState = initialState, action: LoadSuccessAction) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            return {...state, allIds: action.payload.events.map(({id}) => id), byIds: action.payload.events.reduce<UserEventState['byIds']>((byIds, event) => {
                byIds[event.id] = event
                    return byIds
                },{})}
        default:
            return state
    }
}
export default userEventsReducer