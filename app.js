import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import MyTab from './MainScreenNavigator';
import Detail from './Detail';
import CameraDetail from './CameraDetail';

import {Button} from 'teaset';
import MobxTestFirstPage from "./MobxTestFirstPage";

const StackOptions = ({navigation}) => {
  console.log(navigation);
  let {state,goBack} = navigation;

  // 用来判断是否隐藏或显示header
  const visible= state.params.isVisible;
  let header;
  if (visible === true){
    header = null;
  }
  const gesturesEnabled = false;
  const headerStyle = {backgroundColor:'#4ECBFC'};
  const headerTitle = state.params.title;
  const headerTitleStyle = {fontSize:20 ,color:'white',fontWeight:'500'}
  const headerBackTitle = false;
  const headerLeft = (
    <Button
      title='返回'
      onPress={()=>{goBack()}}
    />
  );
  return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header, gesturesEnabled}
};

export default App = StackNavigator({
  Main: {
    screen: MyTab, // stack 嵌套 tab
    navigationOptions: {
      header:null,
      headerTitle:'首页',
      headerBackTitle: null,
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({navigation}) => {
      const defaultOptions = StackOptions({navigation});
      return {
        ...defaultOptions,
      }
    }
  },
  CameraDetail: {
    screen: CameraDetail,
    navigationOptions: ({navigation}) => {
      const defaultOptions = StackOptions({navigation});
      return {
        ...defaultOptions,
        header: null
      }
    }
  },
  MobxTestFirstPage: {
    screen: MobxTestFirstPage
  }
},{
  headerMode: 'screen',
  transitionConfig:()=>({
    screenInterpolator:CardStackStyleInterpolator.forHorizontal,
  })
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
