import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

// Screens
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import TabScreen from './components/screens/Tabs/TabScreen';

// Components
import Loader from './components/elements/Loader';

// Get User
import {getUser} from './features/auth/authSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{title: 'Log In'}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{title: 'Create Account'}}
        name="Register"
        component={RegisterScreen}
      />
    </>
  );
};

const AuthenticatedStack = () => {
  return (
    <>
      <Stack.Screen
        name="Tabs"
        component={TabScreen}
        options={{headerShown: false}}
      />
    </>
  );
};

const RootNavigation = () => {
  const dispatch = useDispatch();
  const {isLoading, isAuthenticated, user} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(getUser());
    console.log('getUser Called');
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  } else {
    console.log('isAuthenticated: ', isAuthenticated);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated && user ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={TabScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{title: 'Log In'}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{title: 'Create Account'}}
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <RootNavigation />;
};

export default App;
