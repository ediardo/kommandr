const toggleProgramCompleter = (state) => {
  return {
    ...state,
    isProgramCompleterVisible: !state.isProgramCompleterVisible
  }
};

const initialState = {
  isProgramCompleterVisible: false,
  isOptionCompleterVisible: false,
  isProgramSelected: false
}

const uiReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'TOGGLE_PROGRAM_COMPLETER': return toggleProgramCompleter(state);
    default:
      return state;
  }
};

export default uiReducer;
