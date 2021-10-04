import * as Constants from '../../constants';
import Layout from "../../components/Layout";

let cadenas = Constants; 

export default function index() {
  return (
    <Layout 
      title={cadenas.TITULO + " | " + cadenas.ABOUT} 
      descripcion= {cadenas.ABOUTDESC} 
    >
      <h1>{cadenas.ABOUT}</h1>
    </Layout>
  )
}


