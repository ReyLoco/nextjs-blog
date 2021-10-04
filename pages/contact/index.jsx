import * as Constants from '../../constants';
import Layout from "../../components/Layout";

let cadenas = Constants; 

export default function index() {
  return (
    <Layout 
      title={cadenas.TITULO + " | " + cadenas.CONTACT} 
      descripcion= {cadenas.CONTACTDESC} 
    >
      <h1>{cadenas.CONTACT}</h1>
    </Layout>
  )
}

