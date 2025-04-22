import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { formatDistance } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'
import style from './styles'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import socket from 'socket.io-client'

export default class Box extends Component {
    state = {
        box: {},
    };

    async componentDidMount() {

        const box = await AsyncStorage.getItem('@RocketBox:box')
        this.subscribeToNewFiles(box)
        console.log('Box ID:', box)
        const response = await api.get(`/box/${box}`)
        this.setState({ box: response.data })
    }

    subscribeToNewFiles = (box) => {
        const io = socket("http://192.168.1.139:3333")

        io.on("connect", () => {
            console.log("Connected to socket server")
        }
        )
        io.on("disconnect", () => {
            console.log("Disconnected from socket server")
        }
        )
        io.on("error", (error) => {
            console.error("Socket error:", error)
        }
        )
        io.on("connect_error", (error) => {
            console.error("Connection error:", error)
        }
        )

        io.emit("connectRoom", box)

        io.on("file", data => {
            this.setState({
                box: { ...this.state.box, files: [data, ...this.state.box.files] }
            })

        })
    };


    openFile = async (file) => {
        try {
            const fileUri = `${FileSystem.documentDirectory}${file.title}`
            const downloadResult = await FileSystem.downloadAsync(file.url, fileUri)

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(downloadResult.uri)
            } else {
                console.log('Sharing is not available on this device')
            }
        } catch (error) {
            console.error('Error downloading or opening file:', error)
        }
    };

    handleUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!')
            return
        }

        const upload = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        })

        if (!upload.canceled) {
            console.log('Image selected:', upload.assets[0].uri)
            const data = new FormData()
            data.append('file', {
                uri: upload.assets[0].uri,
                type: 'image/jpeg',
                name: `image-${Date.now()}.jpg`,
            })
            api.post(`/box/${this.state.box._id}/files`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log('File uploaded successfully:', response.data)
                    this.setState(prevState => ({
                        box: {
                            ...prevState.box,
                            files: [...prevState.box.files, response.data],
                        },
                    }))
                })
                .catch(error => {
                    console.error('Error uploading file:', error)
                })
        } else {
            console.log('User canceled image picker')
        }
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.openFile(item)} style={style.file}>
                <View style={style.fileInfo}>
                    <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
                    <Text style={style.fileTitle}>{item.title}</Text>
                </View>
                <Text style={style.fileDate}>
                    {formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}
                </Text>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={style.container}>
                <Text style={style.boxTitle}>{this.state.box.title}</Text>
                <FlatList
                    style={style.list}
                    data={this.state.box.files}
                    keyExtractor={file => file._id}
                    ItemSeparatorComponent={() => <View style={style.separator} />}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.2}
                />
                <TouchableOpacity style={style.fab} onPress={this.handleUpload}>
                    <Icon name="cloud-upload" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        )
    }
}