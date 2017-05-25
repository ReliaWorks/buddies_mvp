export const attributeOptions = (activityName) => {
  switch (activityName) {
    case 'Running':
      return ['none', '15:00', '14:00', '13:00', '12:00', '11:00', '10:00', '9:00', '8:00', '7:00', '6:00', '5:00', '4:00'];
    case 'Tennis':
      return ['none', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0',];
    case 'Walking':
      return ['none', '20:00', '18:00', '16:00', '14:00', '12:00', '10:00'];
    default:
      return ['none', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  }
};

export const attributeShortDescription = (activityName) => {
  switch (activityName) {
    case 'Running':
      return 'Running Pace (min/mile)';
    case 'Tennis':
      return 'USTA NTRP rating';
    case 'Walking':
      return 'Walking Pace (min/mile)';
    default:
      return 'Level';
  }
};

export const tileDescription = (activityName, value) => {
  switch (activityName) {
    case 'Running':
      return value + ' min/mile';
    case 'Tennis':
      return 'Rating: ' + value;
    case 'Walking':
      return value + ' min/mile';
    default:
      return value;
  }
};

export const getValue = (activityName, value) => {
  if (value) {
    return value;
  } else {
    return 'none';
  }
  //
  // switch (activityName) {
  //   case 'Running':
  //     return 'None';
  //   case 'Tennis':
  //     return 'None';
  //   case 'Walking':
  //     return 'None';
  //   default:
  //     return 'None';
  // }
};
