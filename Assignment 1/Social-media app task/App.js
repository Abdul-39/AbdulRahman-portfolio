import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome</Text>
    <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#ccc" />
    <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
    <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  </View>
);

const posts = [
  { id: '1', user: 'JohnDoe', image: 'https://via.placeholder.com/150', likes: 10, comments: 2 },
  { id: '2', user: 'JaneDoe', image: 'https://via.placeholder.com/150', likes: 25, comments: 5 },
];

const FeedScreen = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const handleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.username}>{item.user}</Text>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <Ionicons name={likedPosts[item.id] ? "heart" : "heart-outline"} size={24} color={likedPosts[item.id] ? "red" : "white"} />
            </TouchableOpacity>
            <Text>{item.likes + (likedPosts[item.id] ? 1 : 0)} Likes</Text>
            <TouchableOpacity>
              <Ionicons name="chatbubble" size={24} color="#007BFF" />
            </TouchableOpacity>
            <Text>{item.comments} Comments</Text>
          </View>
        </View>
      )}
    />
  );
};

const ProfileScreen = () => (
  <View style={styles.profileContainer}>
    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
    <Text style={styles.title}>John Doe</Text>
    <Text style={styles.bio}>Passionate Developer</Text>
    <Text style={styles.followers}>Followers: 120</Text>
  </View>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Feed') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#f8f9fa', paddingBottom: 5 },
    })}
  >
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#282c34', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  input: { width: '90%', padding: 12, borderWidth: 1, borderColor: '#555', marginBottom: 10, borderRadius: 10, backgroundColor: '#444', color: '#fff' },
  button: { backgroundColor: '#007BFF', padding: 12, borderRadius: 10, width: '90%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  post: { marginBottom: 20, padding: 15, borderRadius: 10, backgroundColor: '#1e1e1e' },
  username: { fontWeight: 'bold', color: '#fff' },
  postImage: { width: '100%', height: 200, borderRadius: 10 },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  bio: { color: '#ccc', marginBottom: 10 },
  followers: { color: '#007BFF', fontWeight: 'bold' },
});
