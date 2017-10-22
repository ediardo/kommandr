const setCli = (state, action) => {
  const { cli } = action;
  return {
    ...state,
    cli
  }
};

const setTitle = (state, action) => {
  const { title } = action;
  return {
    ...state,
    title
  }
};

const setDescription = (state, action) => {
  const { description } = action;
  return {
    ...state,
    description
  }
};

const commandLineReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_CLI': return setCli(state, action.payload);
    case 'SET_TITLE': return setTitle(state, action.payload);
    case 'SET_DESCRIPTION': return setDescription(state, action.payload);
    default:
      return state;
  }
};

export default commandLineReducer;
