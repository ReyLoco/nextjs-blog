import Layout from "../components/Layout";
import { HOME, HOMEDESC, HOMETEXT, HOMETIT } from "../constants";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout title={HOME} description={HOMEDESC} home>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.h1}>{HOMETIT}</h1>
        <div>
          {HOMETEXT.map((p, i) => {
            return <p key={i}>{p}</p>;
          })}
        </div>
      </section>
    </Layout>
  );
}
