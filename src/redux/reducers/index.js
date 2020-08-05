import { combineReducers } from 'redux';
import LocationReducer from './locationReducer';
import VideoReducer from './videoReducer';
import HotelReducer from './hotelReducer';
// import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  // reduxTokenAuth: reduxTokenAuthReducer,
  Location: LocationReducer,
  Videos: VideoReducer,
  Hotels: HotelReducer,
  form: formReducer,

})

export default rootReducer;
