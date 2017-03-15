//Container component responsible for calling to Firebase and loading the 10 most recent messages in a conversation between the currentUser and a given user.

import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class Conversation extends Component {
  constructor(props) {
      super(props);
      this.state = { messages: [] };
      this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Great to meet you',
            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://randomuser.me/api/portraits/med/men/4.jpg',
            },
          },
        ],
      });
    }
    onSend(messages = []) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      });
    }
    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        />
      );
    }
}
export { Conversation };
