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
  margin-top: 20px;
  display: flex;
  felx-direction: column;
  align-items: center;
  gap: 10px;
  `;

  const Title = styled.h2``;

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
