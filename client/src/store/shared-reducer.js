const reducer = (state = [], action = {}) => {
  const mutatedItem = action.payload;
  if (!mutatedItem) {
    return;
  }
  const mutatedIndex = state.findIndex(item => item.id === mutatedItem.id);
  switch (action.type) {
    case 'CREATED':
      if (mutatedIndex < 0) {
        state.push(mutatedItem);
      }
      break;
    case 'DELETED':
      if (mutatedIndex >= 0) {
        state.splice(mutatedIndex, 1);
      }
      break;
    case 'UPDATED':
      state[mutatedIndex] = mutatedItem;
      break;
    default:
  }
  return [...state];
};

export default reducer;
