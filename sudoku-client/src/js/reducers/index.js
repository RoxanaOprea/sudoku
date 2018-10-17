import { ADD_NUMBER } from "../constants/action-types";

const initialState = {
  sudokuTable: [
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: 5,
          disable: true
        },
        {
          value: 3,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 7,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: 6,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 1,
          disable: true
        },
        {
          value: 9,
          disable: true
        },
        {
          value: 5,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: null,
          disable: false
        },
        {
          value: 9,
          disable: true
        },
        {
          value: 8,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 6,
          disable: true
        },
        {
          value: null,
          disable: false
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: 8,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 6,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 3,
          disable: true
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: 4,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 8,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: 3,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 1,
          disable: true
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: 7,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 2,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 6,
          disable: true
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: null,
          disable: false
        },
        {
          value: 6,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 2,
          disable: true
        },
        {
          value: 8,
          disable: true
        },
        {
          value: null,
          disable: false
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 4,
          disable: true
        },
        {
          value: 1,
          disable: true
        },
        {
          value: 9,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 5,
          disable: true
        }
      ]
    },
    {
      number: 1,
      digit: "3",
      cols: [
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 8,
          disable: true
        },
        {
          value: null,
          disable: false
        },
        {
          value: null,
          disable: false
        },
        {
          value: 7,
          disable: true
        },
        {
          value: 9,
          disable: true
        }
      ]
    }
  ]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return {
        ...state,
        sudokuTable: state.sudokuTable.concat(action.payload)
      };
    default:
      return state;
  }
};

export default rootReducer;
