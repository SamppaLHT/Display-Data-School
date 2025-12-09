# Weather App 

A beautiful, cross-platform mobile weather application built with React Native and Expo. Get current weather conditions and a 5-day forecast for your location or any city worldwide.

## Features 

- **GPS Location Support** - Automatically detect your current location
- **Manual City Search** - Search weather for any city by name
- **Current Weather** - Temperature, feels like, humidity, wind speed, and cloudiness
- **5-Day Forecast** - View upcoming weather conditions
- **Beautiful Dark UI** - Modern, user-friendly interface with weather icons
- **Cross-Platform** - Works on iOS, Android, and web

## Screenshots

![Weather App Preview](https://via.placeholder.com/400x800.png?text=Weather+App)

## Prerequisites 

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- **Expo Go** app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Installation 

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamppaLHT/Display-Data-School.git
   cd Display-Data-School/DataDisp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   
   a. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api):
      - Sign up for a free account
      - Navigate to API Keys section
      - Copy your API key
   
   b. Create a `.env` file in the `DataDisp` directory:
      ```bash
      cp .env.example .env
      ```
   
   c. Open `.env` and replace `your_api_key_here` with your actual API key:
      ```env
      EXPO_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
      ```

4. **Start the development server**
   ```bash
   npm start
   ```

## Running the App 

### On Your Phone

1. Make sure your phone and computer are on the **same WiFi network**
2. Install **Expo Go** app on your device
3. Scan the QR code shown in the terminal:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app's QR scanner

### On Emulator/Simulator

- **Android**: Press `a` in the terminal
- **iOS**: Press `i` in the terminal (macOS only)
- **Web**: Press `w` in the terminal

## Usage 

1. **Grant Location Permission** (optional)
   - On first launch, the app will request location access
   - Tap "Allow" to use GPS-based weather detection

2. **View Weather by Location**
   - If location is enabled, tap "Use My Location" to get weather for your current position

3. **Search by City Name**
   - Enter any city name in the search box
   - Tap the search icon or press Enter
   - View current weather and 5-day forecast

## Project Structure 

```
DataDisp/
├── App.tsx                 # Main application component
├── weatherService.ts       # OpenWeatherMap API integration
├── types.ts               # TypeScript type definitions
├── .env                   # Environment variables (not tracked by git)
├── .env.example          # Example environment file
├── package.json          # Dependencies and scripts
├── app.json             # Expo configuration
└── tsconfig.json        # TypeScript configuration
```

## Technologies Used 

- **[React Native](https://reactnative.dev/)** - Mobile app framework
- **[Expo](https://expo.dev/)** - Development platform
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)** - GPS/location services
- **[Axios](https://axios-http.com/)** - HTTP client for API calls
- **[OpenWeatherMap API](https://openweathermap.org/api)** - Weather data provider
- **[@expo/vector-icons](https://icons.expo.fyi/)** - Icon library

## API Configuration 

The app uses the OpenWeatherMap API with the following endpoints:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

Temperature is displayed in **Celsius** (metric units).

## Permissions 

### iOS
- **Location When In Use**: Required to fetch weather based on your current location

### Android
- **ACCESS_FINE_LOCATION**: Required for precise location
- **ACCESS_COARSE_LOCATION**: Required for approximate location

## Troubleshooting 

### App won't open on device
- Ensure both devices are on the same WiFi network
- Check that firewall isn't blocking port 8081
- Try restarting the Expo server

### "City not found" error
- Verify the city name spelling
- Try including country code (e.g., "London, UK")

### Weather data not loading
- Check your internet connection
- Verify your API key is correct in `.env`
- Ensure you haven't exceeded the free tier API limit (60 calls/minute)

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and reinstall if issues persist

## Contributing 

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)
- Built with [Expo](https://expo.dev/)

## Contact 📧

SamppaLHT - [@SamppaLHT](https://github.com/SamppaLHT)

Project Link: [https://github.com/SamppaLHT/Display-Data-School](https://github.com/SamppaLHT/Display-Data-School)

---

Made with ❤️ using React Native and Expo
