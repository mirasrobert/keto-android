import React, {useState} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../features/auth/authSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({title}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    Alert.alert('Exit', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => dispatch(logoutUser())},
    ]);
  };

  return (
    <View style={styles.titleContainer}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <MaterialCommunityIcons
              onPress={openMenu}
              style={styles.icon}
              name="dots-vertical"
              size={30}
              color={colors.dark}
            />
          }>
          <Menu.Item
            icon={() => <MaterialIcons name="settings" size={20} />}
            onPress={() => {
              alert('Settings Pressed');
            }}
            title="Settings"
          />
          <Menu.Item
            icon={() => <MaterialCommunityIcons name="logout" size={20} />}
            onPress={handleLogout}
            title="Logout"
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: colors.dark,
  },
  icon: {
    margin: 0,
  },
});

export default Header;
