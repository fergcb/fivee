import { useState } from "react";
import Snippet from "./Snippet.jsx";

import styles from "./SnippetsDemo.module.css";

export default function SnippetsDemo() {
  const [snippetType, setSnippetType] = useState("spell-card");
  const [docId, setDocId] = useState("wish");
  const [cssMode, setCssMode] = useState("bem");
  const [theme, setTheme] = useState("default");
  const [expressions, setExpressions] = useState("html");

  return (
    <div className={styles.demo}>
      <form onSubmit={(e) => e.preventDefault()}>
        <section class={styles.padTop}>
          <label>
            Snippet Type:
            <select
              name="snippetType"
              value={snippetType}
              onChange={(e) => setSnippetType(e.target.value)}
            >
              <option value="spell-card">spell card</option>
            </select>
          </label>
          <label>
            Document:
            <input
              type="text"
              name="documentId"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
            />
          </label>
          <hr />
          <label>
            Expressions:
            <select
              name="expressions"
              value={expressions}
              onChange={(e) => setExpressions(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="html">HTML</option>
              <option value="interactive">Interactive HTML</option>
            </select>
          </label>
        </section>
        <section>
          <fieldset>
            <legend>CSS Mode:</legend>
            <label>
              <input
                type="radio"
                name="cssMode"
                value="bem"
                onChange={(e) => setCssMode(e.target.value)}
                checked={cssMode === "bem"}
              />
              BEM ("bem")
            </label>
            <label>
              <input
                type="radio"
                name="cssMode"
                value="tw"
                onChange={(e) => setCssMode(e.target.value)}
                checked={cssMode === "tw"}
              />
              TailwindCSS ("tw")
            </label>
          </fieldset>
          <label>
            Theme:
            <select
              name="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="default-dark">Default Dark</option>
              <option value="book">Book</option>
              <option value="none">None</option>
            </select>
          </label>
        </section>
      </form>

      <Snippet
        {...{ snippetType, docId, cssMode, theme, expressions }}
      />
    </div>
  );
}
