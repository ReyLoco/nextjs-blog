import Layout from "../../components/Layout";
import { ABOUT, ABOUTDESC, TITULO } from "../../constants";
import utilStyles from "../../styles/utils.module.css";

export default function index() {
  return (
    <Layout title={TITULO + " | " + ABOUT} descripcion={ABOUTDESC}>
      <h1 className={utilStyles.h1}>{ABOUT}</h1>
    </Layout>
  );
}
