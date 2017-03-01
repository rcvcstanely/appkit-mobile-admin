import { combineReducers } from 'redux'

const localStore = true;

function payload(state={}, action){
  switch (action.type) {
    case 'REPLACE_PAYLOAD_ITEM':

      // Copy state
      var newState = {}
      Object.assign(newState, state)

      // Check is exist,
      // Loop for all payload key
      for(var key in action.content.data.payload){
        // Insert all if not downloaded
        // if(typeof newState[key] === "undefined"){
        newState[key] = action.content.data.payload[key];

      }

      // Store payload to localStorage
      if(localStore){localStorage.payload = JSON.stringify(newState)};

      return newState

    case 'ADD_PAYLOAD_ITEM':
      // Copy state
      var newState = {}
      Object.assign(newState, state)

      // Check is exist,
      // Loop for all payload key
      for(var key in action.content.data.payload){
        // Insert all if not downloaded
        if(typeof newState[key] === "undefined"){
          newState[key] = action.content.data.payload[key]
        }else{
          // Replace by key
          for(var thisId in action.content.data.payload[key]){
            if(typeof newState[key][thisId] === "undefined"){
              newState[key][thisId] = action.content.data.payload[key][thisId]
            }else{
              for(var thisIdItemKey in action.content.data.payload[key][thisId]){
                newState[key][thisId][thisIdItemKey] = action.content.data.payload[key][thisId][thisIdItemKey]
              }
            }
          }
        }
      }

      // Store payload to localStorage
      if(localStore){localStorage.payload = JSON.stringify(newState)};

      return newState;

    default:

      // Store payload to localStorage
      if(localStore && typeof(localStorage.payload)!='undefined'){
        state = JSON.parse(localStorage.payload);
      }

      return state;
  }
}

const appStore = combineReducers({
  payload
})

export default appStore
