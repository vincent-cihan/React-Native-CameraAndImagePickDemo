// 截屏生成图片

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ART
} from 'react-native';

var {
  Shape,
  Group,
  Transform,
  Surface,
  Rectangle
} = ART;

import { captureRef, captureScreen } from "react-native-view-shot";


export default class App extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      uri: ''
    };
  }

  takeToImage() {
    // captureScreen({
    //   format: "jpg",
    //   quality: 0.8
    // })
    //   .then(
    //     uri => this.setState({
    //             uri:uri
    //           }),
    //     error => console.error("Oops, snapshot failed", error)
    //   );

    captureRef(this.refs.location, {
      format: "jpg",
      quality: 1
    })
      .then(
        uri => this.setState({
          uri:uri
        }),
        error => console.error("Oops, snapshot failed", error)
      );
  }

  render() {
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(300,1); //连线到目标点(300,1)
    return (
      <View style={styles.container}>
        <View ref='location' style={styles.artContainer}>
          <Surface
            width={300}
            height={300}>
            <Group>
              <Shape d={"M160 160 A 45 45, 0, 0, 1, 115 205"} stroke="#000000" strokeWidth={3} />
              <Shape d={"M160 160 A 45 45, 0, 0, 1, 115 205"} stroke="#000000" strokeWidth={3} />
            </Group>
          </Surface>
        </View>
        <Text onPress={()=>this.takeToImage()}>生成图片</Text>
        <Image source={{uri: this.state.uri}} style={{borderWidth:1, borderColor:'black',height:300,width:300}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  artContainer: {
    height: 300,
    width: 300,
    backgroundColor: 'red',
    justifyContent: 'center'
  }
});