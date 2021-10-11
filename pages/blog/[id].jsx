import moment from "moment";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import { TITULO, ER_NOTFOUND, PAGEARTICULO } from "../../constants";
import conectarDB from "../../lib/dbConnect";
import Articulo from "../../models/Articulo";
import utilStyles from "../../styles/utils.module.css";

moment.locale("es");

export default function PageArticulo({ success, error, articulo }) {
  const router = useRouter();

  if (!success) {
    return (
      <Layout title={TITULO + " | " + ER_NOTFOUND} descripcion={PAGEARTICULO}>
        <h1>Error en la búsqueda</h1>
        <h3 className={utilStyles.error}>{error} 🤦‍♂️</h3>
        <Link href="/blog">
          <a className="btn btn-success">Volver...</a>
        </Link>
      </Layout>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/articulo/${id}`, {
        method: "DELETE",
      });
      router.push("/blog");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title={TITULO + " | " + PAGEARTICULO} descripcion={PAGEARTICULO}>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h1 className={utilStyles.h1}>{articulo.title}</h1>
          </div>
          <p>
            <span>Posted by: {articulo.author}.</span> <span className={utilStyles.readmore}>{articulo.date}.</span>
          </p>
          <div>
            {articulo.parrafos.map((p, i) => {
              return <p key={i}>{p}</p>;
            })}
          </div>
        </div>
      </div>

      <div className="d-grid gap-1 d-md-flex justify-content-md-end pb-2">
        <Link href="/blog">
          <a className="btn btn-success btn-sm m-1">Volver...</a>
        </Link>
        <Link href={`/${articulo._id}/edit`}>
          <a className="btn btn-warning btn-sm m-1">Editar</a>
        </Link>
        <button className="btn btn-danger btn-sm m-1" onClick={() => deleteData(articulo._id)}>
          Eliminar
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await conectarDB();

    const articulo = await Articulo.findById(params.id).lean();

    if (!articulo) {
      return { props: { success: false, error: ER_PAGEART } };
    }

    articulo._id = `${articulo._id}`;
    articulo.date = moment(articulo.date).format("LLL");
    articulo.parrafos = articulo.texto.replace(/\n/g, "<%%%>").split("<%%%>");

    return { props: { success: true, articulo } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: ER_INVALID } };
    }
    return { props: { success: false, error: ER_SERVER } };
  }
}

// *********************************************************************************************************
// Estas funciones las usaremos para pruebas
// export async function getStaticPaths(){
//   try {
//     const rest = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await rest.json();
//     const paths = data.map(({id}) => ({params:{id: `${id}`}}))
//     return { paths, fallback: false }
//   } catch (error) {
//     console.log(error)
//   }
// }

// export async function getStaticProps({params}) {
//   try {
//     const rest = await fetch('https://jsonplaceholder.typicode.com/posts/' + params.id);
//     const data = await rest.json();
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
