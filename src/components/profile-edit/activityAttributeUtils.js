export const attributeOptions = (activityName) => {
  switch (activityName) {
    case 'Running':
      return ['none', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4'];
    case 'Tennis':
      return ['none', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0',];
    case 'Walking':
      return ['none', '20', '18', '16', '14', '12', '10'];
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
export const listDescription = (activityName, value) => {
  switch (activityName) {
    case 'Running':
      return value + ' min / mile pace';
    case 'Tennis':
      return 'Rating: ' + value;
    case 'Walking':
      return value + ' min / mile pace';
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
