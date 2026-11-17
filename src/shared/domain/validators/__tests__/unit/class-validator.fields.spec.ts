import { jest } from "@jest/globals";

const validateSyncMock = jest.fn();

jest.unstable_mockModule("class-validator", () => ({
  validateSync: validateSyncMock,
}));

const { ClassValidatorFields } = await import("../../class-validator-fields");

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> { }

describe("ClassValidatorFields Unit Tests", () => {

  it("Should set errors when validation fails", () => {
    const sut = new StubClassValidatorFields();

    expect(sut.errors).toEqual({});
    expect(sut.validatedData).toEqual(undefined);
  })


  it("Should validate with errors", () => {
    validateSyncMock.mockReturnValue([
      { property: 'fielda', constraints: { isRequired: 'test error' } },
    ])
    const sut = new StubClassValidatorFields();

    expect(sut.validate(null)).toBeFalsy()
    expect(validateSyncMock).toHaveBeenCalled()
    expect(sut.validatedData).toBeUndefined()
    expect(sut.errors).toStrictEqual({ fielda: ["test error"] })
  })


})
