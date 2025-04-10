import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// Mock weather data
const mockWeatherData = {
  London: {
    temp: 15,
    description: "light rain",
  },
  Paris: {
    temp: 18,
    description: "clear sky",
  },
  Tokyo: {
    temp: 22,
    description: "partly cloudy",
  },
};

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getMockWeather = () => {
    const normalizedCity = city.trim().toLowerCase();
    const entry = Object.entries(mockWeatherData).find(
      ([key]) => key.toLowerCase() === normalizedCity
    );

    if (entry) {
      setWeather({ name: entry[0], ...entry[1] });
      setError("");
    } else {
      setWeather(null);
      setError("City not found in mock data.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌦 Offline Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city (e.g. London)"
        value={city}
        onChangeText={(text) => {
          setCity(text);
          if (error) setError("");
        }}
      />
      <Button title="Get Weather" onPress={getMockWeather} />

      {error !== "" && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.temp}°C</Text>
          <Text style={styles.desc}>{weather.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  result: {
    marginTop: 30,
    alignItems: "center",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 18,
    textTransform: "capitalize",
    marginTop: 5,
  },
});
