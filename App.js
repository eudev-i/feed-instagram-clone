/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
          Platform,
          StyleSheet,
          Text,
          View,
          Image,
          Dimensions,
          ScrollView,
          FlatList
      } from 'react-native';
import Post from "./src/components/Post";

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      fotos : []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(resposta => resposta.json())
        .then(json => {
          this.setState({fotos: json});
        })
        .catch(e => {
          console.warn('Não foi possível carregar as fotos');
          this.setState({status: 'ERRO'});
        });
  }

  render() {

    return (

        <FlatList style={styles.container}
            keyExtractor={item => {item.id}}
            data={this.state.fotos}
            renderItem={ ({item}) =>
              <Post foto={item}/>
}
        />

    );
  }
}

const margem = Platform.OS == 'ios' ? 20 : 0;
const styles = StyleSheet.create({

  container: {
    marginTop:margem
  }

});