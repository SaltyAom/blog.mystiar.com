const reducers = (state, action) => {
    switch(action.type){
        case "UPDATE_THEME":
            return {
                ...state,
                view: {
                    theme: action.payload.view.theme
                }
            }
        default:
            return state
    }
}

export default reducers