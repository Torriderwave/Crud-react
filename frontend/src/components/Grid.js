import React from "react";
import styled from "styled-components";
import axios from "axios";
import {FaTrash, FaEdit} from "react-icons/fa";
import {toast} from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
    border-radius: 8px;
    border-collapse: collapse;
    word-break: break-word;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr`
    &:hover {
        background-color: #f5f5f5;
    }
`;

export const Tbody = styled.tbody``;

export const Th = styled.th.withConfig({
    shouldForwardProp: (prop) => prop !== "onlyWeb",
})`
    text-align: start;
    border-bottom: 2px solid #ddd;
    padding: 10px 15px;
    font-weight: bold;
    color: #555;

    min-width: 150px;
    max-width: 400px;
    overflow-wrap: break-word;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"};
    }
`;

export const Td = styled.td.withConfig({
    shouldForwardProp: (prop) => prop !== "onlyWeb",
})`
    padding: 10px 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    border-bottom: 1px solid #ddd;

    min-width: 150px;
    max-width: 400px;
    overflow-wrap: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"};
        min-width: 100px;
    }
`;



const IconButton = styled.div`
    cursor: pointer;
    padding: 5px;
    color: #777;
    transition: color 0.3s ease;

    &:hover {
        color: #2c73d2;
    }
`;



const Grid = ({users, setUsers, setOnEdit}) =>{

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    
    const handleDelete = async (id) => {
        await axios
        .delete("http://localhost:8800/"+id)
        .then(({data})=> {
            const newArray = users.filter((user) => user.id !== id);
            setUsers(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data));
        setOnEdit(null);
    };




    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Telefono</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i )=>(
                    <Tr key={i}>
                        <Td width="30%">{item.Nombre}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="20%" onlyWeb>{item.telefono}</Td>
                        <Td data-aligncenter="true" width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td data-aligncenter="true" width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};


export default Grid;