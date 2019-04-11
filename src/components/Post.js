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
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';

import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Post extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        }
    }



    exibeLegenda(foto) {
        if(foto.comentario === '')
            return ;

        return(
            <View style={styles.legenda}>
                <Text style={styles.userLegenda}>{foto.loginUsuario}</Text>
                <Text style={styles.textoLegenda}>{foto.comentario}</Text>
            </View>
        )
    }

    like() {
        const { foto } = this.state;

        let novaLista = [];
        {/*if the photo is not like*/}
        if(!foto.likeada){
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ]
        }
        else{
            {/*has the whole list except my user*/}
            novaLista = foto.likers.filter( liker => {
                return liker.login !== 'meuUsuario'
            })
        }

        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: novaLista
        }
        this.setState({foto: fotoAtualizada})
    }

    addComents(valorComentario, inputComentario){
        {/*apresentando no warning o valor do comentario
        console.warn(this.state.valorComentario);*/}

        {/*pegar o comentario e adicionar como novo*/}
        if(valorComentario === '')
            return;

        const novaLista = [...this.state.foto.comentarios,{
            id: valorComentario,
            login: 'meuUsuario',
            texto: valorComentario
        }];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        }

        /*adiciona comentario, depois volta ele para o estado inicial*/
        this.setState({foto: fotoAtualizada});
        inputComentario.clear();
    }

    render() {

        const { foto } = this.state;
        return (

            <View>
                <View style={styles.header}>
                    <Image source={{uri: foto.urlPerfil}}
                           style={styles.profilePicture}/>
                    <Text>{foto.loginUsuario}</Text>
                </View>

                <Image source={{uri: foto.urlFoto}}
                       style={styles.post}/>


                <View style={styles.footer}>

                    {/*reacting to the touch*/}
                    <Likes
                        foto={foto} likeCallback={this.like.bind(this)}
                    />

                    {/*legends*/}
                    {this.exibeLegenda(foto)}

                    {/*comments*/}
                    {foto.comentarios.map(comentario =>
                        <View style={styles.legenda} key={comentario.id}>
                            <Text style={styles.userLegenda}>{comentario.login}</Text>
                            <Text style={styles.textoLegenda}>{comentario.texto}</Text>
                        </View>
                    )}

                    {/*comments field*/}
                    <InputComentario
                        comentarioCallback={this.addComents.bind(this)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        margin:10,
        flexDirection: 'row',
        alignItems:'center'
    },

    profilePicture: {
        marginRight:10,
        borderRadius:20,
        width:30,
        height:30
    },

    post: {
        width:width,
        height:width
    },

    footer: {
        margin: 10
    },


    legenda: {
      flexDirection: 'row'
    },

    userLegenda: {
        color: "#000000",
        fontWeight: 'bold',
        marginRight: 5
    },

    textoLegenda: {
        color: "#000000"
    }


});