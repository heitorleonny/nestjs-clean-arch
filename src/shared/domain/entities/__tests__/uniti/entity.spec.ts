import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { Entity, isValidUUID } from "../../entity";

type StubProps = {
  prop1: string;
  prop2: number;
}



class StubEntity extends Entity<StubProps> {}
describe("UserEntity unit tests", () => {


  it("Should set props and id", () => {
    const props = {prop1: 'value 1', prop2: 15};
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(entity.id).toBeTruthy();
  })

  it("Should accept a valid uuid", () => {
    const props = {prop1: 'value 1', prop2: 15};
    const id = "f3e1c9b0-5d6a-4c8b-9f1e-2d3e4f5a6b7c";
    const entity = new StubEntity(props, id);

    expect(entity.id).toBeTruthy();
    expect(entity.id).toBe(id);
  })

  it("Should reject an invalid uuid", () => {
    const props = {prop1: 'value 1', prop2: 15};

    expect(() => new StubEntity(props, "invalid-uuid")).toThrow("Invalid UUID");
  })

  it("Should validate uuids", () => {
    expect(isValidUUID("f3e1c9b0-5d6a-4c8b-9f1e-2d3e4f5a6b7c")).toBe(true);
    expect(isValidUUID("invalid-uuid")).toBe(false);
  })

  it("Should convert a entity to a Javascript Object", () => {
    const props = {prop1: 'value 1', prop2: 15};
    const id = "f3e1c9b0-5d6a-4c8b-9f1e-2d3e4f5a6b7c";
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props
    })

  })
})
