// 图片选择视图

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text, NativeModules
} from 'react-native';
import {
  AlbumView,
  Button
} from 'teaset';
import CameraDetail from "./CameraDetail";

var ImagePicker = NativeModules.ImageCropPicker;

export default class Home extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      images:[]
    };
  }

  _selectCamera = (cropping) => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  _selectMultiPhotosPress = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  _nextPagePress = () => {
    this.props.navigation.navigate('CameraDetail', {
      title: 'camera',
      cameraCallBack: this._cameraCallBack
    });
  }

  _onImagePress = (index) => {
    this.props.navigation.navigate('Detail', {
      photoIndex: index,
      image: this.state.images[index]
    });
  }

  _cameraCallBack = (data) => {
    console.log(data);
    this.setState({
      images:[{
        uri:data.path
      }]
    })
  }

  _mobxTestPress = () => {
    this.props.navigation.navigate('MobxTestFirstPage');
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.imagesScroll}>
          <View style={{flex: 1, padding: 20, flexDirection:'row', flexWrap:'wrap', alignItems:'flex-start'}}>
            {this.state.images.map((item, index) => (
              <View style={{width: 100, height: 100, padding: 10}} key={index}>
                <TouchableOpacity style={{flex: 1}} ref={'it' + index} onPress={() => this._onImagePress(index)}>
                  <Image style={{width: null, height: null, flex: 1}} source={item} resizeMode='cover' />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button type='primary' size='md' title='ImageCropPicker拍照' onPress={() => this._selectCamera(true)} style={styles.button}/>
          <Button type='primary' size='md' title='ImageCropPicker多选图片' onPress={this._selectMultiPhotosPress} style={styles.button}/>
          <Button type='primary' size='md' title='基于react-native-camera拖拽选取拍照' onPress={this._nextPagePress} style={styles.button}/>
          <Button type='primary' size='md' title='mobx购物车例子' onPress={this._mobxTestPress} style={styles.button}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagesScroll: {
    flex: 1
  },
  buttonContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginVertical: 20
  },
  button: {
    marginTop:20,
  }
});