import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  const RootStack = createStackNavigator();
  const DrawerL = createDrawerNavigator();
  const DrawerR = createDrawerNavigator();

  function HomeComponent(props: any) {
    return (
      <SafeAreaView>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <View>
            <Text>Open left drawer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.getParent().openDrawer()}>
          <View>
            <Text>Open right drawer</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function MainDrawerStack() {
    return (
      <DrawerL.Navigator
        initialRouteName={'HOME'}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          drawerPosition: 'left',
          drawerStyle: styles.drawerLStyle,
        }}>
        <DrawerL.Screen key={'HOME'} name={'HOME'} component={HomeComponent} />
      </DrawerL.Navigator>
    );
  }

  function FilterDrawer() {
    return (
      <DrawerR.Navigator
        initialRouteName={'drawerR'}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          swipeEnabled: false,
          drawerPosition: 'right',
          drawerStyle: [styles.drawerRStyle],
        }}>
        <DrawerR.Screen name={'drawerR'} component={MainDrawerStack} />
      </DrawerR.Navigator>
    );
  }

  const rootScreens = [
    {
      options: {headerShown: false},
      name: 'DRAWER',
      component: FilterDrawer,
    },
  ];

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{presentation: 'modal'}}>
        {rootScreens.map(screen => (
          <RootStack.Screen
            key={screen.name}
            options={screen.options}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  drawerLStyle: {
    backgroundColor: 'blue',
    width: 200,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
  },
  drawerRStyle: {
    backgroundColor: 'green',
    width: 200,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
  },
});
