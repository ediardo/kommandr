const saveProgram = (state, action) => {
  const {id, name} = action.payload;
  return {
    ...state,
    [id]: {
      id,
      name
    }
  }
};

const fetchPrograms = (state, action) => {
  return saveProgram(state, action);
  /*
  const {id, name} = action.payload;
  return {
    ...state,
    [id]: {
      id,
      name
    }
  }
  */
};

const initialState = {
    1: {
      id: 1,
      name: "xtrabackup"
    },
    2: {
      id: 2,
      name: "mysqldump"
    },
    3: {
      id: 3,
      name: "node"
    }
};

const programReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_PROGRAMS': return fetchPrograms(state, action);
    case 'SAVE_PROGRAM': return saveProgram(state, action);
    default:
      return state;
  }
};

export default programReducer;
