import React, { useState } from 'react';
import axios from 'axios';

const CadastroProduto = () => {
  // Estados para armazenar os dados do formulário
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState(''); // Mensagem de feedback

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Dados a serem enviados
    const produto = {
      nome: name,
      preco: parseFloat(price), // Converte para número
      descricao: description,
      imagem: imageUrl,
    };

    try {
      // Envia requisição POST para a API
      const response = await axios.post('http://localhost:3001/produtos', produto);
      console.log('Produto cadastrado com sucesso:', response.data);

      // Exibe mensagem de sucesso
      setMessage('Produto cadastrado com sucesso!');
      
      // Limpa os campos após o cadastro
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error.response?.data || error.message);
      setMessage('Erro ao cadastrar produto. Verifique os dados.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>Cadastro de produto</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="name">Nome do produto</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="price">Preço do produto</label>
            <input
              type="number"
              step="0.01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="imageUrl">URL da imagem</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#4a00e0',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            float: 'right'
          }}
        >
          Cadastrar
        </button>
      </form>

      {/* Mensagem de feedback */}
      {message && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            color: message.includes('sucesso') ? 'green' : 'red',
            textAlign: 'center'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default CadastroProduto;