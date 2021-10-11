import Form from "../components/Form";
import Layout from "../components/Layout";
import { ART_NEW, ART_NEW_DESC, TITULO } from "../constants";

export default function New() {
  const formData = {
    title: "",
    texto: "",
  };

  return (
    <Layout title={TITULO + " | " + ART_NEW} descripcion={ART_NEW_DESC}>
      <div className="container">
        <h1 className="my-3">{ART_NEW}</h1>
        <Form formData={formData} />
      </div>
    </Layout>
  );
}
