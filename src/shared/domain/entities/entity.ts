
export function isValidUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export abstract class Entity<Props= any> {
  public readonly _id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string){
    this.props = props;
    const entityId = id ?? crypto.randomUUID();

    if (!isValidUUID(entityId)) {
      throw new Error("Invalid UUID");
    }

    this._id = entityId;
  }

  get id() {
    return this._id;
  }

  toJSON(): Required<{id: string} & Props> {
    return {
      id: this._id,
      ...this.props
    } as Required<{id: string} & Props>;
  }
}
