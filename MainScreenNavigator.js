import React, {PureComponent, Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  TabNavigator
} from 'react-navigation'

import Home from './Home';
import MyDraw from './MyDraw';

export default MyTab = TabNavigator(
  {
    Home: {
      screen: Home
    },
    MyDraw: {
      screen: MyDraw
    }
  },
  {
    tabBarPosition: 'bottom'
  })

// export default class MyTab extends PureComponent {
//
//   render() {
//     return (
//       <TabView style={styles.container}>
//         <TabView.Sheet
//           title='ImageCropPicker'
//         >
//           <ImageCropPicker
//           />
//         </TabView.Sheet>
//         <TabView.Sheet
//           title='Me'
//         >
//           <MyDraw
//           />
//         </TabView.Sheet>
//       </TabView>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
