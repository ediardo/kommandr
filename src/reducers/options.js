const saveOption = (state, action) => {
  const {id, name, shortOpt, longOpt, description, programId} = action.payload;
  return {
    ...state,
    [id]: {
      id,
      name,
      shortOpt,
      longOpt,
      description,
      programId
    }
  }
}
const fetchOptions = (state, action) => {
  return saveOption(state, action);
};

const initialState = {
  1: {
    id: 1,
    name: "User",
    longOpt: "--user",
    shortOpt: "-u",
    description: "Sets the user name",
    programId: 1,
    separator: '='
  },
  2: {
    id: 2,
    name: "Password",
    longOpt: "--password",
    shortOpt: "-p",
    description: "Sets the user password",
    programId: 1,
    separator: '='
  },
  3: {
    id: 3,
    name: "Host",
    longOpt: "--host",
    shortOpt: "-h",
    description: "Sets the host name or ip address",
    programId: 1,
    separator: '='
  },
  4: {
    id: 4,
    name: "Port",
    longOpt: "--port",
    shortOpt: "-P",
    description: "Sets the host port",
    programId: 1,
    separator: '='
  }
};

const optionReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_OPTIONS': return fetchOptions(state, action);
    case 'SAVE_OPTION': return saveOption(state, action);
    /*
    case 'ADD_OPTION':
      return {
        ...state
      }
      */
    default:
      return state;
  }
};

export default optionReducer;
