import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import Form from "../../components/Form";
import Layout from "../../components/Layout";
import { ART_EDIT, ART_EDIT_DESC, TITULO } from "../../constants";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299, we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
};

export default function Edit() {
  const router = useRouter();
  console.log("pa saber donde estoy")
console.log(router.query)

  const { id } = router.query;

  const { data: articulo, error } = useSWR(id ? `/api/articulo/${id}` : null, fetcher);

  if (error) {
    return <div>Error!!!</div>;
  }

  if (!articulo) {
    return (
      <div className="container mt-5 text-cetn">
        <h1>Loading...</h1>
      </div>
    );
  }

  const formData = {
    title: articulo.title,
    texto: articulo.texto,
  };

  return (
    <Layout title={TITULO + " | " + ART_EDIT} descripcion={ART_EDIT_DESC}>
      <div className="container">
        <h1 className="my-3">{ART_EDIT_DESC}</h1>
        <Form formData={formData} forNewArticulo={false} />
      </div>
    </Layout>
  );
}
