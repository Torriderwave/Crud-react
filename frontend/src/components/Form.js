import React, {useEffect,useRef} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    felx-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flexdirection: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;


const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color:white;
    height: 42;
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