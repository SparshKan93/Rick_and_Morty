import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '@/components/OnBoarding'; 
import Card from '@/components/Card'; 
import Detail from '@/components/Detail'; 
import SearchPage from '@/components/SearchPage'; 
import Home from '@/components/Home'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnBoarding}  />
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Card" component={Card}  />
        <Stack.Screen name="Detail" component={Detail}  />
        <Stack.Screen name="SearchPage" component={SearchPage}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
