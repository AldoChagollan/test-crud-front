import React, { useState, useEffect } from 'react';
import axios from 'axios';

const route = process.env.REACT_APP_API

const CrudTest = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [editando, setEditando] = useState(false);
  const [usuarioEditadoId, setUsuarioEditadoId] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(route+'/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(route+`/api/usuarios/${usuarioEditadoId}`, { nombre, email, edad });
      } else {
        await axios.post(route+'/api/usuarios', { nombre, email, edad });
      }
      limpiarCampos();
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleEditar = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setEdad(usuario.edad);
    setEditando(true);
    setUsuarioEditadoId(usuario._id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(route+`/api/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const limpiarCampos = () => {
    setNombre('');
    setEmail('');
    setEdad('');
    setEditando(false);
    setUsuarioEditadoId(null);
  };

  return (
    <div>
      <h2>Formulario de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
        <button type="submit">{editando ? 'Editar' : 'Crear'}</button>
      </form>
      <h2>Listado de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>
            {usuario.nombre} - {usuario.email} - {usuario.edad}
            <button onClick={() => handleEditar(usuario)}>Editar</button>
            <button onClick={() => handleEliminar(usuario._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudTest;
