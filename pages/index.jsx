import * as Constants from 'constants';
import Layout from "../components/Layout";
import utilStyles from '../styles/utils.module.css';

let cadenas = Constants;

export default function Home() {
  return (
    <Layout title={cadenas.HOME} description={cadenas.HOMEDESC} home>
      
      <section className={utilStyles.headingMd}>
        <p>{cadenas.HOMETIT}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>


  )
}
