import React from 'react';
import {Image, StatusBar, StyleSheet, TouchableOpacity, View, PanResponder, Dimensions} from 'react-native';
import Camera from 'react-native-camera';

import {Button} from 'teaset';

const {width, height} = Dimensions.get('window');

const topMin = 80;
const bottomMin = 100;
const leftMin = 0;
const rightMin = 0;
const dragWidth = 40;

export default class CameraDetail extends React.Component {

  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      cameraTop:topMin,
      cameraLeft:leftMin,
      cameraRight:rightMin,
      cameraBottom:bottomMin
    };
  }

  componentWillMount() {
    // 坐上拖拽手势
    this._topLeftanResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
        this.tempfirstX = this.state.cameraLeft
        this.tempFirstY = this.state.cameraTop
      },
      onPanResponderMove: (evt, gestureState) => {
        let topChanged = (this.tempFirstY + gestureState.dy);
        let leftChanged = (this.tempfirstX + gestureState.dx);

        const topMax = height - dragWidth * 2 - this.state.cameraBottom;
        const leftMax = width - dragWidth * 2 - this.state.cameraRight;

        topChanged = topChanged < topMin ? topMin : (topChanged > topMax ? topMax : topChanged);
        leftChanged = leftChanged < leftMin ? leftMin : (leftChanged > leftMax ? leftMax : leftChanged);

        this.setState({
          cameraTop: topChanged,
          cameraLeft: leftChanged
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      }
    });

    // 右上拖拽手势
    this._topRightanResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
        this.tempfirstX = this.state.cameraRight
        this.tempFirstY = this.state.cameraTop
      },
      onPanResponderMove: (evt, gestureState) => {
        let topChanged = (this.tempFirstY + gestureState.dy);
        let rightChanged = (this.tempfirstX - gestureState.dx);

        const topMax = height - dragWidth * 2 - this.state.cameraBottom;
        const rightMax = width - dragWidth * 2 - this.state.cameraLeft;

        topChanged = topChanged < topMin ? topMin : (topChanged > topMax ? topMax : topChanged);
        rightChanged = rightChanged < rightMin ? rightMin : (rightChanged > rightMax ? rightMax : rightChanged);

        this.setState({
          cameraTop: topChanged,
          cameraRight: rightChanged
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      }
    });

    //
    this._bottomLeftanResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
        this.tempfirstX = this.state.cameraLeft
        this.tempFirstY = this.state.cameraBottom
      },
      onPanResponderMove: (evt, gestureState) => {
        let bottomChanged = (this.tempFirstY - gestureState.dy);
        let leftChanged = (this.tempfirstX + gestureState.dx);

        const bottomMax = height - dragWidth * 2 - this.state.cameraTop;
        const leftMax = width - dragWidth * 2 - this.state.cameraRight;

        bottomChanged = bottomChanged < bottomMin ? bottomMin : (bottomChanged > bottomMax ? bottomMax : bottomChanged);
        leftChanged = leftChanged < leftMin ? leftMin : (leftChanged > leftMax ? leftMax : leftChanged);

        this.setState({
          cameraBottom: bottomChanged,
          cameraLeft: leftChanged
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      }
    });

    this._bottomRightanResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
        this.tempfirstX = this.state.cameraRight
        this.tempFirstY = this.state.cameraBottom
      },
      onPanResponderMove: (evt, gestureState) => {
        let bottomChanged = (this.tempFirstY - gestureState.dy);
        let rightChanged = (this.tempfirstX - gestureState.dx);

        const bottomMax = height - dragWidth * 2 - this.state.cameraTop;
        const rightMax = width - dragWidth * 2 - this.state.cameraLeft;

        bottomChanged = bottomChanged < bottomMin ? bottomMin : (bottomChanged > bottomMax ? bottomMax : bottomChanged);
        rightChanged = rightChanged < rightMin ? rightMin : (rightChanged > rightMax ? rightMax : rightChanged);

        this.setState({
          cameraBottom: bottomChanged,
          cameraRight: rightChanged
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      }
    });
  }

  takePicture = () => {
    const {state, goBack, navigate} = this.props.navigation;
    if (this.camera) {
      this.camera
        .capture()
        .then(
          data => {
            state.params.cameraCallBack(data);
            goBack();
          }
        )
        .catch(err => console.error(err));
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  };

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./images/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./images/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('./images/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./images/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./images/ic_flash_off_white.png');
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.previewContainer, {top:this.state.cameraTop, left:this.state.cameraLeft, right:this.state.cameraRight, bottom: this.state.cameraBottom}]}>
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={this.state.camera.aspect}
            captureTarget={this.state.camera.captureTarget}
            type={this.state.camera.type}
            flashMode={this.state.camera.flashMode}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            defaultTouchToFocus
            mirrorImage={false}
            cropToPreview={true}
            permissionDialogTitle="Sample title"
            permissionDialogMessage="Sample dialog message"
          />
          <View style={[styles.dragView, {top:0, left:0}]} {...this._topLeftanResponder.panHandlers} />
          <View style={[styles.dragView, {top:0, right:0}]} {...this._topRightanResponder.panHandlers} />
          <View style={[styles.dragView, {bottom:0, left:0}]} {...this._bottomLeftanResponder.panHandlers} />
          <View style={[styles.dragView, {bottom:0, right:0}]} {...this._bottomRightanResponder.panHandlers} />
        </View>

        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity style={styles.typeButton} onPress={this.switchType}>
            <Image source={this.typeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton} onPress={this.switchFlash}>
            <Image source={this.flashIcon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button type='link' size='lg' titleStyle={{color:'white'}} style={styles.button} title='返回' onPress={() => {this.props.navigation.goBack()}}/>
          <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
            <Image source={require('./images/ic_photo_camera_36pt.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },
  previewContainer: {
    position: 'absolute',
  },
  preview: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  dragView: {
    backgroundColor:'red',
    width:dragWidth,
    height:dragWidth,
    position:'absolute'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  button: {
    position:'absolute',
    left:20
  }
});