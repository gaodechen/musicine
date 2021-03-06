/**
 * @description store audio File object or Blob for subsequent use
 */
const action_types = {
    SET_AUDIO: 'audio/SET',         // set audio object uploaded or recorded
}

const initialState = {
    audio: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_AUDIO:
            return {
                ...state,
                audio: action.audio,
                source: action.source,
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    /**
     * @description set audio as File object or Blob object
     * @param {*} audio
     */
    setAudio: (audio, source) => {
        return {
            type: action_types.SET_AUDIO, audio, source
        }
    },
}

export default Reducer
export { action_types, actions }