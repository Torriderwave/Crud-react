import GlobalStyle from "./style/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import {toast, ToastContainer, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto; /* Centra horizontalmente y ajusta el espaciado superior */
  display: flex;
  flex-direction: column; /* Corrige el error tipográfico */
  align-items: center; /* Centra los elementos horizontalmente */
  gap: 20px; /* Mayor espacio entre los elementos */
  padding: 20px; /* Añade un padding interno para que el contenido no esté pegado a los bordes */
  background-color: #f9f9f9; /* Color de fondo suave */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para destacar el contenedor */
  border-radius: 10px; /* Bordes redondeados */
`;

const Title = styled.h2`
  font-size: 24px; /* Ajusta el tamaño de la fuente para resaltar el título */
  color: #333; /* Un color más fuerte para el texto */
  margin-bottom: 50px; /* Añade un pequeño espacio inferior */
  text-align: center; /* Centra el texto */
`;


function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUser = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a,b)=>(a.Nombre>b.Nombre ? 1: -1)))
    }catch (error){
      toast.error(error);
    }
  };

  useEffect(()=>{
    getUser();
  },[setUsers]);


  return (
    <>
    <Container>
      <Title>Usuarios</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUser={getUser}/>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
    </Container>
    <ToastContainer         
        autoClose={3000} 
        position="bottom-left" 
        transition={Slide}/>
    <GlobalStyle/>
    </>
  );
}

export default App;
