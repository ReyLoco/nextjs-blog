import * as Constants from '../../constants';
import styles from '../../styles/Layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

let cadenas = Constants;
let name = cadenas.IMAGES_ALT;


export default function Layout({children, title, description, home}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/1.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={cadenas.IMAGES_ALT}
            />
            <h1 className={utilStyles.heading2Xl}>{cadenas.TITULO}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/1.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={cadenas.IMAGES_ALT}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{cadenas.TITULO}</a>
              </Link>
            </h2>
          </>
        )}
        <nav>
          <Link href="/">
            <a>Inicio | </a>
          </Link>
          <Link href="/blog">
            <a>Blog | </a>
          </Link>
          <Link href="/contact">
            <a>Contacto | </a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer>{!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}</footer>
    </div>
  );
}

Layout.defaultProps ={
  title: cadenas.TITULO,
  description: cadenas.DESCRIPCION

}