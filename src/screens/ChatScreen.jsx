import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import messageService from '../api/messageService';
import { getUserByEmail } from '../api/userService';

const ChatScreen = () => {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef();

  const [contactedUsers, setContactedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [senderDetailsMap, setSenderDetailsMap] = useState({});
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await messageService.getContacts(user.email);
      setContactedUsers(contacts);
    };
    fetchContacts();
  }, [user.email]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      const chat = await messageService.getChatMessages(user.email, selectedUser.email);
      setMessages(chat);
    };
    fetchMessages();
  }, [selectedUser, user.email]);

  useEffect(() => {
    const loadSenderInfo = async () => {
      const emails = [...new Set(messages.map((m) => m.sender))];
      const map = {};
      for (const email of emails) {
        const profile = await getUserByEmail(email);
        map[email] = profile;
      }
      setSenderDetailsMap(map);
    };
    if (messages.length) loadSenderInfo();
  }, [messages]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardOffset(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = async () => {
    if (!messageInput.trim()) return;
    const newMessage = await messageService.sendMessage({
      sender: user.email,
      receiver: selectedUser.email,
      content: messageInput,
    });
    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
  };

  const handleImageUpload = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (res) => {
      if (res.didCancel || !res.assets?.[0]) return;
      const file = res.assets[0];
      const formData = new FormData();
      formData.append('image', {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });

      const upload = await fetch('http://localhost:3000/messages/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await upload.json();
      const newMessage = await messageService.sendMessage({
        sender: user.email,
        receiver: selectedUser.email,
        content: data.url,
      });
      setMessages(prev => [...prev, newMessage]);
    });
  };

  const renderMessage = ({ item }) => {
    const isSelf = item.sender === user.email;
    const sender = senderDetailsMap[item.sender];
    return (
      <View style={[styles.message, isSelf && styles.selfMessage]}>
        <Text style={styles.senderName}>{sender?.name || item.sender}</Text>
        {item.content.includes('cloudinary') ? (
          <Image source={{ uri: item.content }} style={styles.messageImage} />
        ) : (
          <Text style={styles.messageText}>{item.content}</Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.chatContainer}>
          {/* Top horizontal contacts bar */}
          <View style={styles.contactsBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contactsScroll}
            >
              {contactedUsers.map((cu) => (
                <TouchableOpacity
                  key={cu.email}
                  onPress={() => setSelectedUser(cu)}
                  style={[
                    styles.contactItemHorizontal,
                    selectedUser?.email === cu.email && styles.contactSelectedHorizontal,
                  ]}
                >
                  <Image
                    source={{ uri: cu.avatarUrl || 'https://placehold.co/50x50' }}
                    style={styles.avatar}
                  />
                  <Text style={styles.contactName}>{cu.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Chat Messages */}
          <View style={styles.chatArea}>
            {selectedUser ? (
              <>
                <FlatList
                  ref={scrollRef}
                  data={messages}
                  keyExtractor={(item) => item._id || Math.random().toString()}
                  renderItem={renderMessage}
                  contentContainerStyle={{ padding: 10, paddingBottom: insets.bottom + 180 }}


                  onContentSizeChange={() =>
                    scrollRef.current?.scrollToEnd({ animated: true })
                  }
                />
              </>
            ) : (
              <Text style={styles.placeholder}>Select a user to start chatting</Text>
            )}
          </View>

          {/* Absolute Positioned Input Bar */}
          {selectedUser && (
            <View
              style={[
                styles.inputWrapper,
                { bottom: insets.bottom + 70 }, // flush above tab bar
              ]}
            >
              <View style={styles.inputInner}>
                <TextInput
                  placeholder="Type a message"
                  placeholderTextColor="#999"
                  value={messageInput}
                  onChangeText={setMessageInput}
                  style={styles.inputModern}
                />
                <TouchableOpacity onPress={handleImageUpload} style={styles.iconButton}>
                  <Ionicons name="image-outline" size={22} color="#6a380f" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
                  <Ionicons name="send" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },

  chatContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  contactsBar: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },

  contactsScroll: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  contactItemHorizontal: {
    alignItems: 'center',
    marginRight: 14,
  },

  contactSelectedHorizontal: {
    borderBottomWidth: 3,
    borderBottomColor: '#6a380f',
  },

  contactName: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  chatArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  message: {
    marginBottom: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    alignSelf: 'flex-start',
  },

  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d9c4b0',
  },

  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  messageText: {
    fontSize: 16,
  },

  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },

  inputWrapper: {
    position: 'absolute',
    left: 10,
    right: 10,
  },

  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  inputModern: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },

  iconButton: {
    marginLeft: 6,
    backgroundColor: '#6a380f',
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholder: {
    padding: 20,
    textAlign: 'center',
    color: '#888',
  },
});

export default ChatScreen;
