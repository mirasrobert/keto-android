import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

// Screens
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import VerifyScreen from './components/screens/VerifyScreen';
import TabScreen from './components/screens/Tabs/TabScreen';
import AddBloodSugarForm from './components/forms/AddBloodSugarForm';
import AddBloodPressureForm from './components/forms/AddBloodPressureForm';
import AddWeightForm from './components/forms/AddWeightForm';
import AddMedicationForm from './components/forms/AddMedicationForm';

// Components
import Loader from './components/elements/Loader';

// Get User
import {getUser} from './features/auth/authSlice';

const Stack = createNativeStackNavigator();

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
            {Boolean(user.is_verified) ? (
              <>
                <Stack.Screen
                  name="Tabs"
                  component={TabScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="AddBloodSugarForm"
                  component={AddBloodSugarForm}
                  options={{title: 'Blood Sugar'}}
                />
                <Stack.Screen
                  name="AddBloodPressureForm"
                  component={AddBloodPressureForm}
                  options={{title: 'Blood Pressure'}}
                />
                <Stack.Screen
                  name="AddWeightForm"
                  component={AddWeightForm}
                  options={{title: 'Weight'}}
                />
                <Stack.Screen
                  name="AddMedicationForm"
                  component={AddMedicationForm}
                  options={{title: 'Medication'}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Verify"
                  component={VerifyScreen}
                  options={{headerShown: false}}
                />
              </>
            )}
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
