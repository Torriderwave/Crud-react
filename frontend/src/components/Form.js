import React, {useEffect,useRef} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 600px; /* Tamaño fijo del formulario */
    margin: 0 auto; /* Centrar el formulario horizontalmente */
    position: relative; /* Permite ajustar la posición en relación al grid */
    top: -50px; /* Mueve el formulario hacia arriba si es necesario */
    z-index: 1; /* Asegura que esté por encima del grid */
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 220px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #2c73d2;
        outline: none;
    }
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
`;

const Button = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #1b5bbf;
    }

    &:active {
        transform: scale(0.98);
    }
`;

// Ajusta el contenedor principal del grid
const GridContainer = styled.div`
    margin-top: 120px; /* Espacio para evitar que el formulario y el grid se solapen */
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const Form = ({getUser, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(()=>{
        if(onEdit){
            const user = ref.current;

            user.Nombre.value = onEdit.Nombre;
            user.email.value = onEdit.email;
            user.telefono.value = onEdit.telefono;
            user.nacimiento.value = onEdit.nacimiento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if(
            !user.Nombre.value||
            !user.email.value ||
            !user.telefono.value ||
            !user.nacimiento.value
        ){
            return toast.warn("llena todos los campos!")
        }

        if(onEdit){
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                Nombre: user.Nombre.value,
                email: user.email.value,
                telefono: user.telefono.value,
                nacimiento: user.nacimiento.value,
            })
            .then(({data})=>toast.success(data))
            .catch(({data})=>toast.error(data));
        } else {
            await axios
            .post("http://localhost:8800",{
                Nombre: user.Nombre.value,
                email: user.email.value,
                telefono: user.telefono.value,
                nacimiento: user.nacimiento.value,
            })
            .then(({data})=> toast.success(data))
            .catch(({data}) => toast.error(data));
        }
        user.Nombre.value="";
        user.email.value="";
        user.telefono.value="";
        user.nacimiento.value="";

        setOnEdit(null);
        getUser();

    };


    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nombre</Label>
                <Input name="Nombre"/>
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Telefono</Label>
                <Input name="telefono"/>
            </InputArea>
            <InputArea>
                <Label>Fecha de Nacimiento</Label>
                <Input name="nacimiento" type="date"/>
            </InputArea>

            <Button type="submit">Guardar</Button>
        </FormContainer>
    );
};

export default Form;