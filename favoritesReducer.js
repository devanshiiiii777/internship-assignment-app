export const initialState = JSON.parse(localStorage.getItem('favorites')) || []; // Requirement: localStorage persistence [cite: 41]

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const exists = state.find(item => item.id === action.payload.id);
      let newState;
      if (exists) {
        newState = state.filter(item => item.id !== action.payload.id);
      } else {
        newState = [...state, action.payload];
      }
      // Requirement: persist after refresh [cite: 41, 59]
      localStorage.setItem('favorites', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};