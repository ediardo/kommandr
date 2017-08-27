const saveOption = (state, action) => {
  const {
    description,
    longOpt,
    id,
    name,
    programId,
    shortOpt,
    separator = undefined,
    takesArg = undefined,
    argType = undefined
  } = action.payload;
  return {
    ...state,
    [id]: {
      id,
      name,
      shortOpt,
      longOpt,
      description,
      programId,
      separator,
      takesArg,
      argType
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
    separator: '=',
    takesArg: true,
    argType: "string"
  },
  2: {
    id: 2,
    name: "Password",
    longOpt: "--password",
    shortOpt: "-p",
    description: "Sets the user password",
    programId: 1,
    separator: '=',
    takesArg: true,
    argType: "string"
  },
  3: {
    id: 3,
    name: "Host",
    longOpt: "--host",
    shortOpt: "-h",
    description: "Sets the host name or ip address",
    programId: 1,
    separator: '=',
    takesArg: true,
    argType: "string"
  },
  4: {
    id: 4,
    name: "Port",
    longOpt: "--port",
    shortOpt: "-P",
    description: "Sets the host port",
    programId: 1,
    separator: '=',
    takesArg: true,
    argType: "integer"
  },
  5: {
    id: 5,
    name: "Version",
    longOpt: "--version",
    shortOpt: "-v",
    description: "Shows the current version of mysqldump",
    programId: 1,
    takesArg: false
  },
  8: {
    id: 8,
    name: "Help",
    longOpt: "--help",
    shortOpt: "-h",
    description: "Display help message and exit	",
    programId: 1,
    takesArg: false
  },
  6: {
    id: 6,
    name: "Help",
    longOpt: "--help",
    shortOpt: "-h",
    description: "Prints the synopsis and a list of the most commonly used commands.",
    programId: 2,
    takesArg: false
  },
  7: {
    id: 7,
    name: "Version",
    longOpt: "--version",
    shortOpt: "-v",
    description: "Shows the current version of git",
    programId: 2,
    takesArg: false
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
