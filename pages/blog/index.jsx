import * as Constants from "../../constants";
import Layout from "../../components/Layout";
import Link from "next/link";
import utilStyles from '../../styles/utils.module.css'

let cadenas = Constants;

export default function index({ data }) {
  return (
    <Layout title={cadenas.TITULO + " | " + cadenas.BLOG} descripcion={cadenas.BLOG}>
      <h1>{cadenas.BLOG}</h1>
      {data.map(({ id, title, body }) => (
        <div key={id}>
          <h3>{id} - {title}</h3>
          <p>{body.slice(0,100)}<Link href={`/blog/${id}`}><a className={utilStyles.readmore}>... leer más</a></Link></p>

          
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const rest = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await rest.json();
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
  }
}
