import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import BuddyCard from '../../src/components/buddycard/BuddyCard';


test('renders correctly', () => {
  const tree = renderer.create(
    <BuddyCard />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
