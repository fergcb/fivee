import { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

import styles from "./Snippet.module.css";

export default function Snippet(
  {
    snippetType,
    docId,
    children,
    defaultTab,
    cssMode,
    theme,
    includeStylesheets,
    expressions,
  },
) {
  const { siteConfig } = useDocusaurusContext();

  const baseURL = process.env.NODE_ENV === "production"
    ? siteConfig.url
    : "http://localhost:8000";

  const snippetPath = `/snippets/${snippetType}/${docId}`;

  const url = new URL(snippetPath, baseURL);

  if (cssMode !== undefined) {
    url.searchParams.set("cssMode", cssMode);
  }
  if (theme !== undefined) {
    url.searchParams.set("theme", theme);
  }
  if (includeStylesheets !== undefined) {
    url.searchParams.set("includeStylesheets", includeStylesheets);
  }
  if (expressions !== undefined) {
    url.searchParams.set("expressions", expressions);
  }

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState(defaultTab ?? "output");

  useEffect(() => {
    setLoading(true);
    fetch(url.toString())
      .then((res) => res.text())
      .then(setSnippet)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [snippetType, docId, cssMode, theme, expressions]);

  return (
    <div className={clsx("card shadow--lw", styles.snippet)}>
      <div className={clsx("card__header", styles.snippet__header)}>
        {children && (
          <div className={clsx("alert alert--info", styles.snippet__desc)}>
            {children}
          </div>
        )}
        <div className={clsx(styles.snippet__req)}>
          <code className={styles.snippet__req__method}>GET</code>
          <code className={styles.snippet__req__url}>
            {url.toString()}
          </code>
        </div>
      </div>
      <div className={clsx("card__body", styles.snippet__body)}>
        <ul className={clsx("tabs", styles.snippet__tabs)}>
          <li
            onClick={() => setActiveTab("output")}
            className={clsx("tabs__item", styles.snippet__tabs__item, {
              "tabs__item--active": activeTab === "output",
            })}
          >
            Output
          </li>
          <li
            onClick={() => setActiveTab("source")}
            className={clsx("tabs__item", styles.snippet__tabs__item, {
              "tabs__item--active": activeTab === "source",
            })}
          >
            Source
          </li>
        </ul>
        {loading ? <div>Loading...</div> : (
          activeTab === "output"
            ? (
              <output
                dangerouslySetInnerHTML={{ __html: snippet }}
              />
            )
            : (
              <CodeBlock language="html">
                {snippet}
              </CodeBlock>
            )
        )}
        {error && !loading && (
          <div className="alert alert--danger">
            {error.toString()}
          </div>
        )}
      </div>
    </div>
  );
}
