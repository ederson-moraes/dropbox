import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './pages/Main'
import Box from './pages/Box'

const Stack = createNativeStackNavigator()

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Box" component={Box} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Routes