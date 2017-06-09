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

export const tileDescription = (name, attribute) => {
  switch (name) {
    case 'Running':
      return attribute + ' min/mile';
    case 'Tennis':
      return 'Rating: ' + attribute;
    case 'Walking':
      return attribute + ' min/mile';
    default:
      return attribute;
  }
};
export const listDescription = (activityName, attribute) => {
  if (attribute && attribute !== 'none') {
    switch (activityName) {
      case 'Running':
        return attribute + ' min / mile pace';
      case 'Tennis':
        return 'Rating: ' + attribute;
      case 'Walking':
        return attribute + ' min / mile pace';
      default:
        return attribute;
    }
  } else {
    return 'Add Level';
  }
};

export const scrollPosition = (activityName) => {
  switch (activityName) {
    case 'Running':
      return {x: 0, y: 260};
    case 'Tennis':
      return {x: 0, y: 210};
    case 'Walking':
      return {x: 0, y: 250};
    default:
      return {x: 0, y: 45};
  }
};


export const getAttribute = (activityName, attribute) => {
  if (attribute) {
    return attribute;
  } else {
    return 'none';
  }
};
