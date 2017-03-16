import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    data: [],
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderNoMoreCards: () => {},
    renderCard: () => {}
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHHOLD) {
          this.forceSwipeRight();
        } else if (gesture.dx < -SWIPE_THRESHHOLD) {
          this.forceSwipeLeft();
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { position, panResponder, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'left' ? onSwipeLeft(item) : onSwipeRight(item);
    this.state.position.setValue({ x: 0, y: 0});
    this.setState({ index: this.state.index + 1 });
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  forceSwipeRight() {
    Animated.timing(
      this.state.position,
      { toValue: { x: SCREEN_WIDTH, y: 0 }, duration: SWIPE_OUT_DURATION }
    ).start(this.onSwipeComplete.bind(this, 'right'));
  }


  forceSwipeLeft() {
    Animated.timing(
      this.state.position,
      { toValue: { x: -SCREEN_WIDTH, y: 0 }, duration: SWIPE_OUT_DURATION }
    ).start(this.onSwipeComplete.bind(this, 'left'));
  }

  resetPosition() {
    Animated.spring(this.state.position, { toValue: { x: 0, y: 0 } }).start();
  }

  renderContent(index) {
    if (index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    } else {
      return this.props.renderCard(this.props.data[index]);
    }
  }

  renderCards() {
    const { index } = this.state;

    if (index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((data, i) => {
      if (i < index) { return null; }

      if (i === index) {
        return (
          <Animated.View
            key={data.id}
            {...this.state.panResponder.panHandlers}
            style={[styles.cardStyle, this.getCardStyle(), styles.primaryCardStyle]}
          >
            {this.props.renderCard(data)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={data.id}
          style={[styles.cardStyle, styles.primaryCardStyle]}
        >
          {this.props.renderCard(data)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row'
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export { Deck };
