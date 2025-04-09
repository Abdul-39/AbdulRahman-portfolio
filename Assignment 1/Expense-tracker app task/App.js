// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, TextInput, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, PieChart } from 'react-native-chart-kit';

// Dummy Data
const expenses = [
  { id: '1', category: 'Food', amount: '$50', date: '2023-10-01' },
  { id: '2', category: 'Transport', amount: '$30', date: '2023-10-02' },
  { id: '3', category: 'Shopping', amount: '$100', date: '2023-10-03' },
];

const income = [
  { id: '1', source: 'Salary', amount: '$2000', date: '2023-10-01' },
  { id: '2', source: 'Freelance', amount: '$500', date: '2023-10-05' },
];

const balance = '$2420';

// Dashboard Screen
function DashboardScreen({ navigation }) {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expense Tracker</Text>
        <Card style={styles.balanceCard}>
          <Card.Content>
            <Text style={styles.balanceText}>Balance: {balance}</Text>
          </Card.Content>
        </Card>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <Card style={styles.expenseCard}>
              <Card.Content>
                <Text style={styles.expenseCategory}>{item.category}</Text>
                <Text style={styles.expenseAmount}>{item.amount}</Text>
                <Text style={styles.expenseDate}>{item.date}</Text>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item) => item.id}
        />
        <Button
          mode="contained"
          style={styles.addButton}
          onPress={() => navigation.navigate('AddExpense')}
        >
          Add Expense
        </Button>
        <Button
          mode="outlined"
          style={styles.reportButton}
          onPress={() => navigation.navigate('Reports')}
        >
          View Reports
        </Button>
      </ScrollView>
    </LinearGradient>
  );
}

// Add Expense Screen
function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [date, setDate] = React.useState('');

  const saveExpense = () => {
    alert('Expense saved!');
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Add Expense</Text>
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Category"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <TextInput
          label="Date"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <Button mode="contained" style={styles.saveButton} onPress={saveExpense}>
          Save Expense
        </Button>
      </ScrollView>
    </LinearGradient>
  );
}

// Reports & Analytics Screen
function ReportsScreen() {
  const chartConfig = {
    backgroundGradientFrom: '#6a11cb',
    backgroundGradientTo: '#2575fc',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const data = {
    labels: ['Food', 'Transport', 'Shopping'],
    datasets: [
      {
        data: [50, 30, 100],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    {
      name: 'Food',
      amount: 50,
      color: '#FF6384',
      legendFontColor: '#fff',
      legendFontSize: 15,
    },
    {
      name: 'Transport',
      amount: 30,
      color: '#36A2EB',
      legendFontColor: '#fff',
      legendFontSize: 15,
    },
    {
      name: 'Shopping',
      amount: 100,
      color: '#FFCE56',
      legendFontColor: '#fff',
      legendFontSize: 15,
    },
  ];

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Reports & Analytics</Text>
        <Text style={styles.sectionTitle}>Spending Trends</Text>
        <LineChart
          data={data}
          width={350}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Text style={styles.sectionTitle}>Expense Breakdown</Text>
        <PieChart
          data={pieData}
          width={350}
          height={200}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </ScrollView>
    </LinearGradient>
  );
}

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reports" component={ReportsScreen} options={{ headerShown: false }} />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  balanceCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  expenseCard: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseAmount: {
    fontSize: 14,
    color: '#666',
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#6a11cb',
  },
  reportButton: {
    marginTop: 8,
    borderColor: '#6a11cb',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: '#6a11cb',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});