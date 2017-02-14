import React from 'react';
import { Text, View } from 'react-native';
import { Card, CardItem } from './common';
import { textStyle } from './common/styles';

const ActivityCard = (props) => {
  console.log(props);
  return (
    <Card>
      <CardItem>
        <Text style={textStyle}>{props.activityName}</Text>
      </CardItem>
    </Card>
  );
};

export default ActivityCard;
