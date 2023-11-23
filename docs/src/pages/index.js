import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import { Icon } from '@iconify/react'

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.heading)}>
          Five<span style={{ color: 'var(--ifm-color-primary)' }}>e</span>
        </Heading>
        <p className="hero__subtitle">
          A repository of data from Dungeons and Dragons 5th Edition.
        </p>
        <p className={styles["get-started"]}>Get started with:</p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--primary button--lg", styles.button)}
            to="/docs/graphql">
            <Icon icon="fa6-solid:code" />
            Fetch D&amp;D data with GraphQL
          </Link>
          <Link
            className={clsx("button button--primary button--lg", styles.button)}
            to="/docs/snippets">
            <Icon icon="fa6-solid:database" style={{ fontSize: '20px' }} />
            Embed D&D content with Snippets
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Home`}
      description="A repository of data from Dungeons and Dragons 5th Edition.">
      <HomepageHeader />
    </Layout>
  );
}
