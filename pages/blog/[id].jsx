import * as Constants from '../../constants';
import Layout from "../../components/Layout";

let cadenas = Constants

export default function primerPost({data}) {
  return (
    <Layout 
      title={cadenas.TITULO + " | " + cadenas.PRIMERPOST} 
      descripcion= {cadenas.PRIMERPOST} 
    >
      <h1>{data.id} - {data.title}</h1>
      <p>{data.body}</p>
    </Layout>
  )
}

export async function getStaticPaths(){
  try {
    const rest = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await rest.json();
    const paths = data.map(({id}) => ({params:{id: `${id}`}}))
    return { paths, fallback: false }
  } catch (error) {
    console.log(error)
  }
}

export async function getStaticProps({params}) {
  try {
    const rest = await fetch('https://jsonplaceholder.typicode.com/posts/' + params.id);
    const data = await rest.json();
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
  }
}