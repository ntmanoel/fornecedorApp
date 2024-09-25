import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [imagem, setImagem] = useState(null);

  // seletor de imagens
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  // cadastrar fornecedor
  const adicionarFornecedor = () => {
    if (nome && endereco && contato && categoria) {
      setFornecedores([
        ...fornecedores,
        { nome, endereco, contato, categoria, imagem },
      ]);
      setNome('');
      setEndereco('');
      setContato('');
      setCategoria('');
      setImagem(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Fornecedores</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do fornecedor"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Button title="Escolher imagem" onPress={pickImage} />
      {imagem && (
        <Image source={{ uri: imagem }} style={styles.imagePreview} />
      )}

      <Button title="Cadastrar Fornecedor" onPress={adicionarFornecedor} />

      <Text style={styles.title}>Lista de Fornecedores</Text>
      <FlatList
        data={fornecedores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.fornecedorItem}>
            <Text style={styles.itemText}>Nome: {item.nome}</Text>
            <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
            <Text style={styles.itemText}>Contato: {item.contato}</Text>
            <Text style={styles.itemText}>Categoria: {item.categoria}</Text>
            {item.imagem && (
              <Image source={{ uri: item.imagem }} style={styles.itemImage} />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  fornecedorItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
});

export default App;
