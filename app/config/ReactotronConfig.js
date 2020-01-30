 
import Reactotron from "reactotron-react-native";
  

Reactotron
  .setAsyncStorageHandler() // AsyncStorage would eiter come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ name: "Ignite App", host: "192.168.1.13", port: 9090 }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!