const defaultState = {
  test: '',
};

export default (state = {}, action) => {
  const { type, payload } = action;

  switch(type) {
    case 'INIT': {
       return { ...state, test: 'kuku' };
    }

    default: {
      return state;
    }
  }
};
