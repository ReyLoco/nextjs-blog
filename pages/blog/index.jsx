import moment from "moment";
import Link from "next/link";
import Layout from "../../components/Layout";
import { BLOG, TITULO } from "../../constants";
import conectarDB from "../../lib/dbConnect";
import Articulo from "../../models/Articulo";
import utilStyles from "../../styles/utils.module.css";

moment.locale("es");

export default function index({ articulos }) {
  return (
    <Layout title={TITULO + " | " + BLOG} descripcion={BLOG}>
      <h1 className={utilStyles.h1}>{BLOG}</h1>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-2">
        <Link href="../new">
          <a className="btn btn-secondary ">Añadir Post</a>
        </Link>
      </div>

      {articulos.map(({ _id, title, texto, date, author }, i) => (
        <div className="card mb-2" key={i + 1}>
          <div className="card-body">
            <h3>
              {i + 1}.- {title}
            </h3>
            <span>Posted by: {author}.</span> <span className={utilStyles.readmore}>{date}.</span>
            <p>
              {texto.slice(0, 100)}...{" "}
              <Link href={`/blog/${_id}`}>
                <a className={utilStyles.readmore}>leer más</a>
              </Link>
            </p>
          </div>
        </div>
      ))}
    </Layout>
  );
}

/**
 * Función para traer todos los posts de MongoDB en un objeto json
 * @returns artículos list
 */
export async function getServerSideProps() {
  try {
    await conectarDB();

    const res = await Articulo.find({});

    const articulos = res.map((doc) => {
      const articulo = doc.toObject();
      articulo._id = `${articulo._id}`;
      articulo.date = moment(articulo.date).format("LLL");
      return articulo;
    });

    return { props: { articulos } };
  } catch (error) {
    console.log(error);
  }
}

// *********************************************************************************************************
// Esta función la usaremos para pruebas
// export async function getStaticProps() {
//   try {
//     const rest = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await rest.json();
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
