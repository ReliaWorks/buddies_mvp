import {
  FIND_COMMONALITY,
  FIND_EVENT,
} from '../actions/types';

const INITIAL_STATE = {
  commonInterests: [],
  eventData: {
    name: "Run & Chug 4 mile run",
    affiliationName: "Run & Chug",
    logo: "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2Faffiliation_runandchung%402x.png?alt=media&token=6c22b56b-0af3-4323-b468-bb71ac11279c",
    eventDate: 1501403345928,
    longDescription: "Come join us for a night of food, fun, and running! Professional marathoner, filmmaker, and The North Face athlete Dean Karnazes will be at Run & Chug San Francisco on Thursday to talk about his adventures, his passions, and his support of adaptive climbing initiatives. With him, adaptive climber, skier, and Paradox Sports Ambassador Enock Glidden, will be talking about climbing El Capitan in Yosemite this past spring. Come hang out, ask questions, eat some pizza, and then climb with Cedar and Enock! Cedar and Enock’s presentation is free entry! Climbing with the guys after the presentation requires a day pass (we are offering half off during the event!).",
  },
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FIND_EVENT: {
      return { ...state };
    }
    case FIND_COMMONALITY: {
      return { ...state, commonInterests: action.payload };
    }
    default:
      return state;
  }
};
