import { ClassList, ClassName } from "$snippets/themes.ts";
import { CollectionID, Document } from "$collections/_index.ts";
import db from "$db/database.ts";

export abstract class Expression {
  constructor(
    protected readonly args: string[],
    protected readonly text: string | undefined,
    protected readonly source: string,
  ) {}

  public static from(
    expr: string,
    text: string | undefined,
    source: string,
  ): Expression {
    const args = expr.trim().split(/\s+/g);
    if (args.length === 0) throw new Error("Empty expression.");
    const cmd = args.shift()!;

    switch (cmd) {
      case "ref":
        return new RefExpression(args, text, source);
      case "dice":
        return new DiceExpression(args, text, source);
    }

    throw (`Invalid expression type '${cmd}'.`);
  }

  public abstract validate(): Promise<ValidationResult>;

  public abstract evaluateAsText(): Promise<string>;

  public abstract evaluateAsHtml(classes: ClassList): Promise<string>;

  public abstract evaluateAsInteractiveHtml(
    classes: ClassList,
  ): Promise<string>;
}

export type ValidationResult =
  | { kind: "valid" }
  | { kind: "error"; message: string };

function valid(): ValidationResult {
  return { kind: "valid" };
}

function error(message: string): ValidationResult {
  return { kind: "error", message };
}

export class DiceExpression extends Expression {
  // deno-lint-ignore require-await
  public async validate(): Promise<ValidationResult> {
    if (this.args.length === 0) {
      return error("Expected 'dice' expression to have at least one argument.");
    }

    return valid();
  }

  // deno-lint-ignore require-await
  public async evaluateAsText(): Promise<string> {
    return this.text ?? this.args.join(" ");
  }

  public async evaluateAsHtml(classes: ClassList): Promise<string> {
    return `<span class="${classes.dice}">${await this
      .evaluateAsText()}</span>`;
  }

  public evaluateAsInteractiveHtml(classes: ClassList): Promise<string> {
    return this.evaluateAsHtml(classes);
  }
}

export class RefExpression extends Expression {
  private get collectionClassName(): ClassName {
    return `ref-${this.args[0]}` as ClassName;
  }

  private fetchDoc(): Promise<Document | null> {
    return db.get(this.args[0] as CollectionID, this.args[1]);
  }

  public validate(): Promise<ValidationResult> {
    if (this.args.length !== 2) {
      return new Promise((resolve) =>
        resolve(error(
          `Expected 'ref' expression to have 2 arguments, got ${this.args.length}: '${
            this.args.join(" ")
          }'.`,
        ))
      );
    }

    // if (await this.fetchDoc() === null) {
    //   return error(`Invalid document reference '${this.args.join(" ")}'.`);
    // }

    return new Promise((resolve) => resolve(valid()));
  }

  public async evaluateAsText(): Promise<string> {
    const doc = await this.fetchDoc();
    return this.text ?? doc?.name ?? this.args[1];
  }

  public async evaluateAsHtml(classes: ClassList): Promise<string> {
    const text = await this.evaluateAsText();
    return `<span class="${classes.ref} ${
      classes[this.collectionClassName] ?? ""
    }">${text}</span>`;
  }

  public evaluateAsInteractiveHtml(classes: ClassList): Promise<string> {
    return this.evaluateAsHtml(classes);
  }
}
