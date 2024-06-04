import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif;
    height: 100%;
    width: 100%;
  }

 

   
`;
