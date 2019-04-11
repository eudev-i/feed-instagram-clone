import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';

type Props = {};
export default class Likes extends Component<Props> {

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/redHeart.png') :
            require('../../resources/img/emptyHeart.png')
    }

    exibeLikes(likers) {
        if(likers.length <= 0 )
            return;

        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
    }

    render(){

        const {foto, likeCallback} = this.props;

        return (
            <View>
                <TouchableOpacity onPress={likeCallback}>
                    <Image style={styles.botaoDeLike}
                           source={this.carregaIcone(foto.likeada)}/>
                </TouchableOpacity>

                {/*POST*/}
                {this.exibeLikes(foto.likers)}
            </View>
         );
    }
}

const styles = StyleSheet.create({

    botaoDeLike: {
        width: 30,
        height: 30
    },

    likes: {
        fontWeight:'bold',
        marginTop:10,
        color: '#000000'
    }
});
