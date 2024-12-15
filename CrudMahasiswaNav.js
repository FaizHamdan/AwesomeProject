import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle, faUserPen, faMap, faUser, faTicket, faBus, faEdit} from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import Createdata from './Creatdata';
import Datamahasiswa from './Listdata';
import Editdata from './Editdata';
import Homedata from './Homedata';
import Profiledata from './Profiledata';
import Pesandata from './Pesandata';


const webmap = require('./map.html')



function HomeScreen() {
  return (
    <Homedata/>
  );
}

function DataMahasiswaScreen() {
  return (
    <Datamahasiswa />
  );
}

function EditScreen() {
  return (
    <Editdata />
  );
}

function PesanScreen() {
  return (
    <Pesandata />
  );
}

function MapScreen() {
  return (
    <WebView
            source={webmap}
            />
  );
}

function ProfileScreen() {
  return (
    <Profiledata />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
      options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faHome} color={color} size={20} />
        ),}}/>
        <Tab.Screen name="Halte" component={DataMahasiswaScreen}  options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faBus} color={color} size={20} />
        ),}}/>

      <Tab.Screen name="Edit" component={EditScreen}  options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faEdit} color={color} size={20} />
        ),}}/>

      <Tab.Screen name="Tiket" component={PesanScreen}  options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faTicket} color={color} size={20} />
        ),}}/>
        
      <Tab.Screen name="Map" component={MapScreen}  options={{ 
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faMap} color={color} size={20} />
        ),}}/>

      <Tab.Screen name="Profile" component={ProfileScreen}  options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faUser} color={color} size={20} />
        ),}}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}