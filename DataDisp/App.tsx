import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import {
  getCurrentWeather,
  getCurrentWeatherByCity,
  getForecast,
  getForecastByCity,
  getWeatherIconUrl,
} from './weatherService';
import { WeatherData, ForecastItem, LocationCoords } from './types';

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
        getUserLocation();
      } else {
        setLocationGranted(false);
        Alert.alert(
          'Location Permission',
          'Location permission denied. You can manually enter a city name to get weather information.'
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationGranted(false);
    }
  };

  const getUserLocation = async () => {
    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({});
      const coords: LocationCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      await fetchWeatherData(coords);
      
      // Get city name from coordinates
      const reverseGeocode = await Location.reverseGeocodeAsync(coords);
      if (reverseGeocode.length > 0) {
        const city = reverseGeocode[0].city || reverseGeocode[0].region || 'Unknown';
        setCurrentCity(city);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get your location. Please try again or enter a city name.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (coords: LocationCoords) => {
    try {
      const [weather, forecastData] = await Promise.all([
        getCurrentWeather(coords),
        getForecast(coords),
      ]);
      setCurrentWeather(weather);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Error', 'Failed to fetch weather data. Please check your API key.');
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    if (!city.trim()) {
      Alert.alert('Invalid Input', 'Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      const [weather, forecastData] = await Promise.all([
        getCurrentWeatherByCity(city),
        getForecastByCity(city),
      ]);
      setCurrentWeather(weather);
      setForecast(forecastData);
      setCurrentCity(city);
      setCityInput('');
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      Alert.alert('Error', 'City not found. Please check the spelling and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="partly-sunny" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Weather App</Text>
        </View>

        {/* Location Controls */}
        <View style={styles.locationControls}>
          {locationGranted && (
            <TouchableOpacity style={styles.gpsButton} onPress={getUserLocation}>
              <Ionicons name="location" size={20} color="#fff" />
              <Text style={styles.gpsButtonText}>Use My Location</Text>
            </TouchableOpacity>
          )}

          <View style={styles.cityInputContainer}>
            <TextInput
              style={styles.cityInput}
              placeholder="Enter city name"
              placeholderTextColor="#999"
              value={cityInput}
              onChangeText={setCityInput}
              onSubmitEditing={() => fetchWeatherByCity(cityInput)}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => fetchWeatherByCity(cityInput)}
            >
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6BA3E8" />
            <Text style={styles.loadingText}>Loading weather data...</Text>
          </View>
        )}

        {/* Current Weather */}
        {!loading && currentWeather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{currentCity}</Text>
            
            <View style={styles.currentWeatherCard}>
              <Image
                source={{ uri: getWeatherIconUrl(currentWeather.icon) }}
                style={styles.weatherIcon}
              />
              <Text style={styles.temperature}>{currentWeather.temp}°C</Text>
              <Text style={styles.description}>
                {currentWeather.description.charAt(0).toUpperCase() + 
                 currentWeather.description.slice(1)}
              </Text>
              
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Ionicons name="thermometer-outline" size={20} color="#666" />
                  <Text style={styles.detailLabel}>Feels Like</Text>
                  <Text style={styles.detailValue}>{currentWeather.feels_like}°C</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="water-outline" size={20} color="#666" />
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="speedometer-outline" size={20} color="#666" />
                  <Text style={styles.detailLabel}>Wind Speed</Text>
                  <Text style={styles.detailValue}>{currentWeather.wind_speed} m/s</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="cloud-outline" size={20} color="#666" />
                  <Text style={styles.detailLabel}>Cloudiness</Text>
                  <Text style={styles.detailValue}>{currentWeather.clouds}%</Text>
                </View>
              </View>
            </View>

            {/* Forecast */}
            {forecast.length > 0 && (
              <View style={styles.forecastContainer}>
                <Text style={styles.forecastTitle}>5-Day Forecast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {forecast.map((item, index) => (
                    <View key={index} style={styles.forecastCard}>
                      <Text style={styles.forecastDate}>{item.date}</Text>
                      <Image
                        source={{ uri: getWeatherIconUrl(item.icon) }}
                        style={styles.forecastIcon}
                      />
                      <Text style={styles.forecastTemp}>{item.temp}°C</Text>
                      <Text style={styles.forecastDesc}>
                        {item.description.split(' ')[0]}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {/* Empty State */}
        {!loading && !currentWeather && (
          <View style={styles.emptyState}>
            <Ionicons name="cloud-offline-outline" size={80} color="#ccc" />
            <Text style={styles.emptyStateText}>
              {locationGranted === false
                ? 'Enter a city name to see weather information'
                : 'Tap "Use My Location" or enter a city name'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#86e5b9ff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  locationControls: {
    padding: 15,
    gap: 10,
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#86e5b9ff',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  gpsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cityInputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  cityInput: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#86e5b9ff',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    color: '#999',
    marginTop: 10,
    fontSize: 16,
  },
  weatherContainer: {
    padding: 15,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  currentWeatherCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  temperature: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
    width: '45%',
    padding: 10,
  },
  detailLabel: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  forecastContainer: {
    marginTop: 20,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  forecastCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
  },
  forecastDate: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 5,
  },
  forecastIcon: {
    width: 60,
    height: 60,
  },
  forecastTemp: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastDesc: {
    color: '#999',
    fontSize: 11,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyStateText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
