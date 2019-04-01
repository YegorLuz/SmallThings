const defaultState = {
  test: '',
  products: [],
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch(type) {
    case 'INIT': {
       return { ...state, test: 'kuku' };
    }

    case 'SAVE': {
      return { ...state, products: payload.data };
    }

    default: {
      return state;
    }
  }
};
