import { db } from "../db.js";

export const getUser = (_, res) => {
    const q  = "SELECT * FROM usuarios";
    
    db.query(q, (err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
const q = 
    "INSERT INTO usuarios(`Nombre`,`email`,`telefono`,`nacimiento`) VALUES(?)";

const values = [
    req.body.Nombre,
    req.body.email,
    req.body.telefono,
    req.body.nacimiento
];

db.query(q, [values], (err)=>{
    if(err) return res.json(err);
    return res.status(200).json("Usuario creado existosamente.");
    });
};


export const updateUser = (req, res) => {
    const q = 
    "UPDATE usuarios SET `Nombre` = ?,`email` = ?,`telefono` = ?,`nacimiento` = ?\
    WHERE `id` = ?";

    const values = [
        req.body.Nombre,
        req.body.email,
        req.body.telefono,
        req.body.nacimiento
    ];

    db.query(q, [...values, req.params.id],(err)=>{
        if(err) return res.json(err);
        return res.status(200).json("Usuario actualizado existosamente.");
    });
};


export const deleteUser = (req,res)=>{
    const q = "DELETE FROM usuarios WHERE `id` = ?";
    db.query(q, [req.params.id],(err)=>{
        if(err) return res.json(err);
        return res.status(200).json("Usuario eliminado existosamente.");
    });
}