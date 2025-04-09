// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Searchbar, Button, Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';

// Dummy Data
const restaurants = [
  {
    id: '1',
    name: 'Burger King',
    image: 'https://via.placeholder.com/300',
    rating: 4.5,
    deliveryTime: '30 mins',
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://via.placeholder.com/300',
    rating: 4.2,
    deliveryTime: '25 mins',
  },
  {
    id: '3',
    name: 'Sushi Palace',
    image: 'https://via.placeholder.com/300',
    rating: 4.7,
    deliveryTime: '40 mins',
  },
];

const menuItems = [
  { id: '1', name: 'Cheeseburger', price: '$8', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Veggie Pizza', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Sushi Roll', price: '$12', image: 'https://via.placeholder.com/150' },
];

const orderStatus = {
  status: 'Preparing',
  progress: 0.3,
};

// Home Screen
function HomeScreen({ navigation }) {
  const renderRestaurant = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}>
      <Card style={styles.restaurantCard}>
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={styles.gradientOverlay}>
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <View style={styles.restaurantInfo}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.restaurantRating}>{item.rating}</Text>
              <Text style={styles.restaurantDeliveryTime}>{item.deliveryTime}</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search restaurants"
          style={styles.searchBar}
          placeholderTextColor="#999"
          iconColor="#6a11cb"
          inputStyle={{ color: '#333' }}
        />
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.restaurantList}
        />
      </View>
    </LinearGradient>
  );
}

// Restaurant Details Screen
function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;

  const renderMenuItem = ({ item }) => (
    <Card style={styles.menuItemCard}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <Card.Content>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </Card.Content>
      <IconButton icon="cart-plus" size={24} onPress={() => alert('Added to cart!')} />
    </Card>
  );

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImageLarge} />
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <View style={styles.restaurantInfo}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.restaurantRating}>{restaurant.rating}</Text>
          <Text style={styles.restaurantDeliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
        <Text style={styles.sectionTitle}>Menu</Text>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        <Button
          mode="contained"
          style={styles.orderButton}
          onPress={() => navigation.navigate('OrderTracking')}
        >
          Place Order
        </Button>
      </ScrollView>
    </LinearGradient>
  );
}

// Order Tracking Screen
function OrderTrackingScreen() {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Order Tracking</Text>
        <Text style={styles.orderStatus}>{orderStatus.status}</Text>
        <Progress.Bar
          progress={orderStatus.progress}
          width={300}
          color="#FFD700"
          style={styles.progressBar}
        />
        <View style={styles.trackingSteps}>
          <Text style={styles.trackingStep}>Order Placed</Text>
          <Text style={styles.trackingStep}>Preparing</Text>
          <Text style={styles.trackingStep}>On the Way</Text>
          <Text style={styles.trackingStep}>Delivered</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  restaurantCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  restaurantDetails: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  restaurantRating: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 4,
  },
  restaurantDeliveryTime: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  restaurantList: {
    paddingBottom: 16,
  },
  restaurantImageLarge: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  menuItemCard: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  menuItemImage: {
    width: '100%',
    height: 100,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  orderButton: {
    marginTop: 16,
    backgroundColor: '#6a11cb',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  orderStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
  },
  progressBar: {
    marginBottom: 16,
  },
  trackingSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackingStep: {
    fontSize: 14,
    color: '#fff',
  },
});