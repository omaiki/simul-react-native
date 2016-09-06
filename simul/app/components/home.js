import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native';

import Search from './search';
import Login from './login';
import Register from './register';
import Story from './story';
import UserStories from './userStories';
import api from '../Utils/api.js';

import I18n from 'react-native-i18n'

class Home extends Component{
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(api.getStories())
    };
  }
  _onPressLogin() {
    this.props.navigator.push({
      title: I18n.t('login'),
      component: Login
    })
  }

  handleSubmit(){
    var note = this.state.note;
    this.setState({
      note: ''
    });
    api.addNote(this.props.userInfo.login, note)
      .then((data) => {
        api.getNotes(this.props.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error})
      });
  }


  _onPressRegister() {
    this.props.navigator.push({
      title: I18n.t('register'),
      component: Register
    })
  }

  _onPressStory() {
    this.props.navigator.push({
      title: I18n.t('story'),
      component: Story
    })
  }

  _onPressUserStories() {
    this.props.navigator.push({
      title: I18n.t('stories'),
      component: UserStories
    })
  }
  featuredStory() {
      return(
        <View style={{backgroundColor: 'lightgrey'}}>
        <Text>"My day today was very interesting. First I woke up late and I couldn't find my clean clothes and my mom......"</Text>
        <Text>كان يوم لي اليوم مثيرة جدا للاهتمام. أولا استيقظت في وقت متأخر، وأنا لا يمكن أن تجد لي ملابس نظيفة وأمي</Text>
        <Text style={{color: 'purple', textAlign: 'right'}}>-Ahmed</Text>
        </View>
      )
  }

  fetchUserData() {
    fetch('http:///simulnos.herokuapp.com/api/users').then(function(response){
      return response.json()
    })
  }

  render() {
    console.log(api.getStories())
    console.log(this.state.dataSource)
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableHighlight onPress={ () => this._onPressLogin()}><Text style={styles.navLeft}>{I18n.t('login')}</Text></TouchableHighlight>
          <TouchableHighlight onPress={ () => this._onPressRegister()}><Text style={styles.navRight}>{I18n.t('register')}</Text></TouchableHighlight>
        </View>
        <Text style={styles.title}>{I18n.t('home')}</Text>
        <Search />
        <TouchableHighlight onPress={ () => this._onPressUserStories()}><Text style={styles.nav}>Ahmeds Stories</Text></TouchableHighlight>
        <ListView
          style={styles.listItems}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <TouchableHighlight onPress={ () => this._onPressStory()}><Text style={
             styles.listText}>{rowData}</Text></TouchableHighlight>}
          renderHeader={ () => this.featuredStory() } />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#27c2dc',
    paddingTop: 80,
  },
  title: {
    flex: .5,
    backgroundColor: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  listItems: {
    flex: 9,
    backgroundColor: 'powderblue',
  },
  listText: {
    color: '#32161F',
    textAlign: 'center',
  },
  navLeft: {
    flex: .25,
    color: 'white',
    fontFamily: 'Farah',
    backgroundColor: '#FFB30F',
    textAlign: 'center',
    marginRight: 110,
    padding: 10,
  },
  navRight: {
    flex: .25,
    color: 'white',
    fontFamily: 'Farah',
    backgroundColor: '#FFB30F',
    textAlign: 'center',
    marginLeft: 110,
    padding: 10,
  },
});

module.exports = Home;
