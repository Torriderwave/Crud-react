import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Esto asegura que el padding y el border no afecten al tamaño de los elementos */
    font-family: 'Poppins', sans-serif; /* Corregí el error tipográfico */
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center; /* Esto asegura que todo el contenido esté centrado vertical y horizontalmente */
        background-color: #f2f2f2;
        color: #333; /* Color de texto para mejor visibilidad */
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Poppins', sans-serif; /* Asegura que los encabezados usen la misma fuente */
    }

    a {
        text-decoration: none; /* Elimina subrayados en los enlaces */
        color: inherit; /* Hace que los enlaces hereden el color del texto */
    }
`;

export default Global;
