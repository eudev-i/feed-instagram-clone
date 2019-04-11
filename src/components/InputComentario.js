import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';

type Props = {};
export default class InputComentario extends Component<Props> {

    constructor(){
        super();
        this.state = {
            valorComentario: ''
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           placeholder="Adicione um comentário..."
                           ref={input => this.inputComentario = input}
                            /*toda vez que o texto mudar eu quero pegar ele e mandar para o estado do meu componente*/
                           onChangeText={texto => this.setState({valorComentario: texto})}
                />

                <TouchableOpacity onPress={() => {
                    this.props.comentarioCallback(this.state.valorComentario, this.inputComentario)
                    this.setState({valorComentario: ''})
                }}>
                    <Image style={styles.icone}
                           source={require('../../resources/img/send.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },

    input:{
        flex:1,
        height:40
    },

    icone: {
        height:25,
        width:25
    }
});
