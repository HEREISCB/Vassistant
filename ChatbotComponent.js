// ChatbotComponent.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const ChatbotComponent = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://your-python-server.com/endpoint',
        { user_message: inputText }
      );

      const assistantMessage = response.data.assistant_message;
      setChatHistory([...chatHistory, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <View>
      {/* Display Chat History */}
      {chatHistory.map((message, index) => (
        <Text key={index}>{`${message.role}: ${message.content}`}</Text>
      ))}

      {/* Input Field */}
      <TextInput
        placeholder="Type your message..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />

      {/* Send Button */}
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatbotComponent;
