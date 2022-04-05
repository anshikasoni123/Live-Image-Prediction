import * as React from 'react'
import {Button,Text,Platform,View} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class Camera extends React.Component{
    state={
        image:null
    }
    render(){
        const {image} = this.state
        
        return(
            <View>
                <Button style = {{color:'red'}}>
                    <Text>
                        Click here for photo
                    </Text>
                </Button>
            </View>
        )
    }
    componentDidMount(){
        this._pickPhoto()
    }
    getPermissions = async()=> {
        if(Platform.Os !== 'web'){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status !== 'granted'){
                console.log('Need to access Permissions')
            }
        }
    }

    uploadImage = async(uri)=> {
        data = new FormData()
        let filename = uri.split('/')[uri.split('/').length - 1]
        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`
        const FileToUpload = {
            uri : uri,
            name:filename,
            type:type
        }
        data.append('Alphabet',FileToUpload)
        fetch('',{
            method:'POST',
            body:data,
            headers:{
                "content":"multipart/form-data"
            }
        })
        .then((response) => response.json)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    _pickPhoto = async()=> {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypes.All,
                allowsEditing:true,
                axist:[4,3],
                quality:1
            })
            if(!result.cancelled){
                this.setState({image:result.data});
                console.log(result.uri)
                this.uploadImage(result.uri)
            }
        }
        catch(E){
            console.log(E)
        }
    }
}