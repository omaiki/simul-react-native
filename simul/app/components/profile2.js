import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import I18n from 'react-native-i18n'
import NewStory from './newStory';
import UserMessages from './userMessages';
import Contact from './contact';
import userStories from './userStories';
import api from '../Utils/api.js';


// <Text> {JSON.stringify(this.props.user)}</Text>
class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.userId,
      name: this.props.name,
      username: '',
      user: '',

    }
  }

  componentDidMount() {
      this.fetchData().done()
  }

  async fetchData() {
      var url = `https://simulnos.herokuapp.com/api/users/${this.state.userId}`;
      const response = await fetch(url);
      const json = await response.json();
      const user = json.user;
      console.log(user);
      this.setState({user: user,
      username: user.username});
  }


  _onPressAddStory(){
      this.props.navigator.push({
        title: I18n.t('newStory'),
        component: NewStory,
        tintColor: "#29c5da",
        passProps: {
          userId: this.state.userId,
          name: this.state.name,
          username: this.state.username,
        },
      })
    }

  _onPressViewMessages(){
    this.props.navigator.push({
      title: I18n.t('messages'),
      tintColor: "#29c5da",
      component: UserMessages,
      passProps: { userId: this.state.userId, name: this.state.name, messages: this.state.messages },
    })
  }

  latestStory() {
  }

  _onPressUserStories() {
    this.props.navigator.push({
      title: this.state.username,
      tintColor: "#29c5da",
      component: userStories,
      passProps: { userId: this.state.userId, username: this.state.username, name: this.state.name },
    })
  }
  _onPressContact(){
    this.props.navigator.push({
      title: I18n.t('contact'),
      tintColor: "#29c5da",
      component: Contact,
      passProps: { userId: this.state.userId, name: this.state.name },
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.name + "'s " + I18n.t('profile')}</Text>

        <Text style={styles.newestStory}>"My day today was very interesting First I woke up late and I couldn't find my clean clothes and my mom......"</Text>
        <Text style={styles.newestStoryArabic}>كان يوم لي اليوم مثيرة جدا للاهتمام. أولا استيقظت في وقت متأخر، وأنا لا يمكن أن تجد لي ملابس نظيفة وأمي</Text>

        <TouchableHighlight onPress={() => this._onPressAddStory()} style={styles.button}>
          <Text style={styles.buttonText}>
          {I18n.t('addStory')}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._onPressViewMessages()} style={styles.button}>
          <Text style={styles.buttonText}>
          {I18n.t('messages')}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._onPressUserStories()} style={styles.button}>
          <Text style={styles.buttonText}> {this.state.name + "'s " + I18n.t('stories')} </Text>
        </TouchableHighlight>


        <View style={styles.personalInfo}>
        <Text style={styles.personalInfoHeading}> {I18n.t('about')} {this.state.name}: </Text>
        <Text style={styles.personalInfoLocation}> Location: {this.state.user.location}  </Text>
        <Text style={styles.personalInfoResources}> Resources: {this.state.user.resource_request} </Text>
        <Text style={styles.personalInfoSeeking}> Seeking: {this.state.user.seeking} </Text>
        <Text style={styles.personalInfoSkills}> Skills: {this.state.user.skills} </Text>
        <Text style={styles.personalInfoBio}> Bio: {this.state.user.bio} </Text>
        </View>




        <TouchableHighlight onPress={() => this._onPressContact()} style={styles.button}>
          <Text style={styles.buttonText}>
            {I18n.t('contact')}
          </Text>
        </TouchableHighlight>

      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
   marginTop: 25,
   fontSize: 20,
   alignSelf: 'center',
   margin: 40
  },
  body: {
   flex: 0.1,
   borderColor: 'black',
   borderWidth: 1,
 },
  button: {
    height: 50,
    backgroundColor: '#27c2dc',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
  },
  newestStory: {
  backgroundColor: 'lightgrey',
  },
  newestStoryArabic: {
    backgroundColor: 'lightgrey',
  },
  personalInfoHeading: {
    textAlign: 'left',
    marginBottom: 20
  },
  personalInfoLocation: {
    fontSize: 10,
  },
  personalInfoResources: {
    fontSize: 10,
  },
  personalInfoSeeking: {
    fontSize: 10,
  },
  personalInfoSkills: {
    fontSize: 10,
  },
  personalInfoBio: {
    fontSize: 10,
  },

  });

module.exports = Profile;
