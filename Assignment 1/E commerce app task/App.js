// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Avatar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

// Dummy Data
const posts = [
  {
    id: '1',
    username: 'user1',
    profilePic: 'https://via.placeholder.com/150',
    image: 'https://via.placeholder.com/300',
    caption: 'This is a beautiful post!',
    likes: 120,
    comments: 15,
  },
  {
    id: '2',
    username: 'user2',
    profilePic: 'https://via.placeholder.com/150',
    image: 'https://via.placeholder.com/300',
    caption: 'Another amazing post!',
    likes: 90,
    comments: 10,
  },
];

const userPosts = [
  { id: '1', image: 'https://via.placeholder.com/150' },
  { id: '2', image: 'https://via.placeholder.com/150' },
  { id: '3', image: 'https://via.placeholder.com/150' },
  { id: '4', image: 'https://via.placeholder.com/150' },
];

// Login/Signup Screen
function AuthScreen({ navigation }) {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradient}>
      <View style={styles.authContainer}>
        <Text style={styles.appTitle}>SocialApp</Text>
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#fff', background: 'transparent' } }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#fff', background: 'transparent' } }}
        />
        <Button mode="contained" style={styles.authButton} onPress={() => navigation.navigate('Feed')}>
          Login
        </Button>
        <Button mode="outlined" style={styles.authButton} onPress={() => navigation.navigate('Feed')}>
          Sign Up
        </Button>
        <Text style={styles.socialText}>Or continue with</Text>
        <View style={styles.socialButtons}>
          <IconButton icon="google" size={30} color="#fff" onPress={() => {}} />
          <IconButton icon="facebook" size={30} color="#fff" onPress={() => {}} />
        </View>
      </View>
    </LinearGradient>
  );
}

// Feed Screen
function FeedScreen() {
  const renderPost = ({ item }) => (
    <Card style={styles.postCard}>
      <Card.Title
        title={item.username}
        subtitle="2 hours ago"
        left={() => <Avatar.Image size={40} source={{ uri: item.profilePic }} />}
      />
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text style={styles.caption}>{item.caption}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="heart-outline" size={24} onPress={() => {}} />
        <Text>{item.likes}</Text>
        <IconButton icon="comment-outline" size={24} onPress={() => {}} />
        <Text>{item.comments}</Text>
        <IconButton icon="share-outline" size={24} onPress={() => {}} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedList}
      />
    </View>
  );
}

// Profile Screen
function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/150' }} />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.bio}>Travel enthusiast | Photographer</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>150 Followers</Text>
          <Text style={styles.stat}>100 Following</Text>
        </View>
      </View>
      <View style={styles.postGrid}>
        {userPosts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postItem}>
            <Image source={{ uri: post.image }} style={styles.postImage} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  authButton: {
    width: '100%',
    marginTop: 10,
  },
  socialText: {
    color: '#fff',
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postCard: {
    margin: 10,
  },
  caption: {
    marginTop: 10,
  },
  feedList: {
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  stat: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  postItem: {
    width: '33.33%',
    padding: 5,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
});