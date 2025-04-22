import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import api from '../../services/api'

import styles from './styles'

import logo from '../../assets/logo.png'

import AsyncStorage from '@react-native-async-storage/async-storage'
export default class Main extends Component {
    state = {
        newBox: '',
    }

    async componentDidMount() {
        const box = await AsyncStorage.getItem('@RocketBox:box')

        if (box) {
            this.props.navigation.navigate('Box', { id: box })
        }

    }

    handleSignIn = async () => {
        try {
            const response = await api.post('/box', {
                title: this.state.newBox,
            })

            if (response.data && response.data._id) {
                await AsyncStorage.setItem('@RocketBox:box', response.data._id)
                this.props.navigation.navigate('Box', { id: response.data._id })
            } else {
                console.error('Invalid response:', response)
            }
        } catch (error) {
            console.error('Error during sign-in:', error)
        }


    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Create a new box"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    value={this.state.newBox}
                    onChangeText={text => this.setState({ newBox: text })}>
                </TextInput>

                <TouchableOpacity style={styles.button} onPress={() => { this.handleSignIn() }}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>

            </View>
        )
    }
}