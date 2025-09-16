import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Simulando uma API (substitua pela URL real da sua API)
  const API_URL = 'http://localhost:3001/produtos'; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
        console.error("Erro detalhado:",err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Função para deletar um produto
  const handleDelete = async (id, nome) => {
    // Mostra confirmação
    if (!window.confirm("Tem certeza que deseja excluir?")) {
      return; // Cancela se o usuário clicar em "Cancelar"
    }

    try {
      // Envia requisição DELETE
      await axios.delete(`${API_URL}/${id}`);
      
      // Atualiza a lista localmente (remove o produto excluído)
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      
      // Opcional: você pode mostrar uma mensagem de sucesso
      console.log(`Produto "${nome}" excluído com sucesso!`);
    } catch (err) {
      setError('Erro ao excluir produto. Tente novamente.');
      console.error("Erro ao excluir:", err);
      // Opcional: recarregar a lista em caso de erro
      // fetchProducts();
    }
  };

  // Função para editar um produto
  const handleEdit = (product) => {
    setEditingProduct({ ...product}); // Cria uma cópia para evitar mutações diretas
  };

  // Função para salvar as alterações do produto editado
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${editingProduct.id}`, editingProduct);

      // Atualiza a lista localmente (substitui o produto editado)
      setProducts(prev =>
        prev.map(p => p.id === editingProduct.id ? response.data : p)
      );

      setEditingProduct(null); // Sai do modo de edição

      alert('Produto atualizado com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar produto. Tente novamente.');
      console.error("Erro ao atualizar:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null); // Cancela a edição e sai do modo de edição
  };

  if (editingProduct) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Editando Produto</h2>
        <button
         onClick={handleCancelEdit}
          style={{
             marginBottom: '20px',
             backgroundColor: '#6c757d',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
          }}
        >
          Voltar
        </button>

        <form onSubmit={handleSaveEdit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Nome:</label>
            <input
              type="text"
              value={editingProduct.nome}
              onChange={(e) => setEditingProduct({ ...editingProduct, nome: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
              }}
            />

          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Preço:</label>
            <input
              type="number"
              value={editingProduct.preco}
              onChange={(e) => setEditingProduct({ ...editingProduct, preco: parseFloat(e.target.value) })}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Descrição:</label>
            <textarea
              value={editingProduct.descricao}
              onChange={(e) => setEditingProduct({ ...editingProduct, descricao: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '8px',
                height: '100px',
                marginTop: '5px',
              }}
            />
              
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>URL da Imagem:</label>
            <input
              type="text"
              value={editingProduct.imagem || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, imagem: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
              }}
            />
          </div>

           <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }
  
// Renderiza a lista de produtos
  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <header>
        <h1>Produtos cadastrados</h1>
        <button style={{
          backgroundColor: '#4285f5',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          float: 'right'
        }}>
          Novo
        </button>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px',
        padding: '0 20px'
      }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={
                product.imagem?.trim() || 
                `https://picsum.photos/seed/${product.id}/60/60`
              }
              alt={product.nome}
              onError={(e) => {
                e.target.src = `https://placehold.co/60x60?text=${product.nome.split(' ').slice(0, 2).join(' ')}`;
              }}
              style={{ width: '60px', height: '60px', marginBottom: '10px' }}
            />
            <h3>{product.nome} - R$ {(product.preco ?? 0).toFixed(2)}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>
              {product.descricao}
            </p>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1,
                }}
                onClick={() => handleDelete(product.id, product.nome)}
              >
                Deletar
              </button>
              <button
                style={{
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1,
                }}
                onClick={() => handleEdit(product)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;