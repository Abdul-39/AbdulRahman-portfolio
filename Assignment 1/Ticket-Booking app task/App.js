// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { Searchbar, Button, Card, RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Dummy Data
const events = [
  {
    id: '1',
    title: 'Avengers: Endgame',
    type: 'Movie',
    image: 'https://via.placeholder.com/300',
    price: '$15',
  },
  {
    id: '2',
    title: 'Coldplay Concert',
    type: 'Event',
    image: 'https://via.placeholder.com/300',
    price: '$50',
  },
  {
    id: '3',
    title: 'Flight to Paris',
    type: 'Travel',
    image: 'https://via.placeholder.com/300',
    price: '$300',
  },
];

const seats = [
  { id: '1', status: 'available' },
  { id: '2', status: 'available' },
  { id: '3', status: 'booked' },
  { id: '4', status: 'available' },
  { id: '5', status: 'available' },
  { id: '6', status: 'booked' },
];

// Home Screen
function HomeScreen({ navigation }) {
  const renderEvent = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookingDetails', { event: item })}>
      <Card style={styles.eventCard}>
        <Card.Cover source={{ uri: item.image }} style={styles.eventImage} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={styles.gradientOverlay}>
          <Card.Content style={styles.eventContent}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventType}>{item.type}</Text>
            <Text style={styles.eventPrice}>{item.price}</Text>
          </Card.Content>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search events, movies, or flights"
          style={styles.searchBar}
          placeholderTextColor="#999"
          iconColor="#6a11cb"
          inputStyle={{ color: '#333' }}
        />
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.eventList}
        />
      </View>
    </LinearGradient>
  );
}

// Booking Details Screen
function BookingDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const animatedValue = new Animated.Value(0);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: event.image }} style={styles.eventImageLarge} />
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventPrice}>{event.price}</Text>
        <Text style={styles.sectionTitle}>Select Seats</Text>
        <View style={styles.seatGrid}>
          {seats.map((seat) => (
            <TouchableOpacity
              key={seat.id}
              style={[
                styles.seat,
                seat.status === 'booked' && styles.bookedSeat,
                selectedSeats.includes(seat.id) && styles.selectedSeat,
              ]}
              onPress={() => seat.status === 'available' && toggleSeat(seat.id)}
              disabled={seat.status === 'booked'}
            >
              <Text style={styles.seatText}>{seat.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          mode="contained"
          style={styles.bookButton}
          onPress={() => navigation.navigate('Payment')}
          labelStyle={styles.buttonLabel}
        >
          Book Now
        </Button>
      </ScrollView>
    </LinearGradient>
  );
}

// Payment Screen
function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = React.useState('creditCard');

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <RadioButton.Group onValueChange={(value) => setPaymentMethod(value)} value={paymentMethod}>
          <RadioButton.Item label="Credit Card" value="creditCard" color="#fff" labelStyle={styles.radioLabel} />
          <RadioButton.Item label="PayPal" value="paypal" color="#fff" labelStyle={styles.radioLabel} />
          <RadioButton.Item label="Google Pay" value="googlePay" color="#fff" labelStyle={styles.radioLabel} />
        </RadioButton.Group>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.summaryText}>Event: Avengers: Endgame</Text>
            <Text style={styles.summaryText}>Seats: A1, A2</Text>
            <Text style={styles.summaryText}>Total: $30</Text>
          </Card.Content>
        </Card>
        <Button mode="contained" style={styles.payButton} onPress={() => alert('Payment Successful!')}>
          Pay Now
        </Button>
      </ScrollView>
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
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
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
  eventCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventType: {
    fontSize: 14,
    color: '#ddd',
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  eventList: {
    paddingBottom: 16,
  },
  eventImageLarge: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#fff',
  },
  seatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  seat: {
    width: '15%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    margin: 5,
    borderRadius: 5,
  },
  bookedSeat: {
    backgroundColor: '#ff4444',
  },
  selectedSeat: {
    backgroundColor: '#6a11cb',
  },
  seatText: {
    color: '#fff',
  },
  bookButton: {
    marginTop: 16,
    backgroundColor: '#6a11cb',
  },
  buttonLabel: {
    color: '#fff',
  },
  summaryCard: {
    marginTop: 16,
    backgroundColor: '#fff',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  payButton: {
    marginTop: 16,
    backgroundColor: '#6a11cb',
  },
  radioLabel: {
    color: '#fff',
  },
});