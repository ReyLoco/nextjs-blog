import { TITULO, CONTACT, CONTACTDESC} from '../../constants';
import Layout from "../../components/Layout";
import utilStyles from "../../styles/utils.module.css";

export default function index() {
  return (
    <Layout title={TITULO + " | " + CONTACT} descripcion= {CONTACTDESC} >
      <h1 className={utilStyles.h1}>{CONTACT}</h1>
    </Layout>
  )
}

