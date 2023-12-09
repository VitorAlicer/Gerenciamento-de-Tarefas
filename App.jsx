import { useState } from 'react';
import './App.css';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa('');
    }
  };

  const deleteTarefa = (index) => {
    const atualizarTarefas = tarefas.slice(0, index).concat(tarefas.slice(index + 1));
    setTarefas(atualizarTarefas);
  };

  const iniciarEdicao = (index) => {
    setEditIndex(index);
    setEditText(tarefas[index]);
  };

  const salvarEdicao = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index] = editText;
    setTarefas(novasTarefas);
    setEditIndex(-1);
    setEditText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarTarefa();
  };

  return (
    <>
      <h1>Tarefas Pendentes</h1>
      <div className='lista-tarefas'>
        <form onSubmit={handleSubmit}>
          <li>
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
            />
            <button type="submit">Adicionar</button>
          </li>
        </form>
        <form onSubmit={handleSubmit}>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => salvarEdicao(index)}>Salvar</button>
              </>
            ) : (
              <>
                {tarefa}
                <button onClick={() => iniciarEdicao(index)}>Editar</button>
                <button onClick={() => deleteTarefa(index)}>Excluir</button>
              </>
            )}
          </li>
        ))}
        </form>

      </div>

    </>
  );
};

export default App;
