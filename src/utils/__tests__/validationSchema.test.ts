import { validationSchema } from '../validationSchema';

const VALID_VALUES = {
  firstName: 'Sam',
  lastName: 'Smith',
  phone: '+14161231234',
  corporationNumber: '123456789',
};

describe('validate form input for first name', () => {
  it('returns error when first name is missing', async () => {
    const values = { ...VALID_VALUES, firstName: '' };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /First Name is required/,
    );
  });

  it('returns error when first name is greater than 50 characters', async () => {
    const values = {
      ...VALID_VALUES,
      firstName: 'StevensonsStevensonsStevensonsStevensonsStevensonsStevensons',
    };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /First Name cannot exceed 50 characters/,
    );
  });
});

describe('validate form input for last name', () => {
  it('returns error when last name is missing', async () => {
    const values = { ...VALID_VALUES, lastName: '' };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /Last Name is required/,
    );
  });

  it('returns error when last name is greater than 50 characters', async () => {
    const values = {
      ...VALID_VALUES,
      lastName: 'StevensonsStevensonsStevensonsStevensonsStevensonsStevensons',
    };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /Last Name cannot exceed 50 characters/,
    );
  });
});

describe('validate form input for phone number', () => {
  it('returns error when phone number is missing', async () => {
    const values = { ...VALID_VALUES, phone: '' };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /Phone Number is required/,
    );
  });

  it('returns error when phone does not begin with +1', async () => {
    const values = { ...VALID_VALUES, phone: '123456' };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /Must be a Canadian phone number starting with \+1/,
    );
  });

  it('returns error when phone number contains more than 12 characters', async () => {
    const values = { ...VALID_VALUES, phone: '+141612312345' };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /Must be a Canadian phone number starting with \+1/,
    );
  });
});

describe('validate form input for corporation number', () => {
  it('returns error when corporation number is missing', async () => {
    const values = { ...VALID_VALUES, corporationNumber: '' };
    await expect(validationSchema.validate(values)).rejects.toThrow(
      /Corporation Number is required/,
    );
  });

  it('returns error when corporationNumber is not numeric', async () => {
    await expect(
      validationSchema.validate({ ...VALID_VALUES, corporationNumber: 'abc' }),
    ).rejects.toThrow(/Corporation Number can only contain numbers/);
  });

  it('returns error when corporationNumber is the wrong length', async () => {
    await expect(
      validationSchema.validate({
        ...VALID_VALUES,
        corporationNumber: '12345',
      }),
    ).rejects.toThrow(/Corporation Number must be exactly 9 characters/);
  });
});

describe('validate expected form values', () => {
  it('validates expected values', async () => {
    await expect(validationSchema.validate(VALID_VALUES)).resolves.toEqual(
      expect.objectContaining(VALID_VALUES),
    );
  });
});
