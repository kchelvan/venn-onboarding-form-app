import { useCorporationNumberValidation } from '../useCorporationValidation';

jest.mock('../useCorporationValidation');

describe('useCorporationNumberValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns error when corporation number is empty', async () => {
    const mockValidateCorporationNumber = jest.fn().mockResolvedValueOnce({
      valid: false,
      message: 'Corporation Number is required',
    });

    (useCorporationNumberValidation as jest.Mock).mockReturnValueOnce({
      validateCorporationNumber: mockValidateCorporationNumber,
    });

    const { validateCorporationNumber } = useCorporationNumberValidation();
    const response = await validateCorporationNumber('');

    expect(response).toEqual({
      valid: false,
      message: 'Corporation Number is required',
    });
  });

  it('returns successful response on valid corporation number from server', async () => {
    const mockResponse = { valid: true, corporationNumber: '123456789' };
    const mockValidateCorporationNumber = jest
      .fn()
      .mockResolvedValueOnce(mockResponse);

    (useCorporationNumberValidation as jest.Mock).mockReturnValueOnce({
      validateCorporationNumber: mockValidateCorporationNumber,
    });

    const { validateCorporationNumber } = useCorporationNumberValidation();
    const response = await validateCorporationNumber('123456789');

    expect(response).toEqual(mockResponse);
  });

  it('returns error on invalid corporation number from server', async () => {
    const mockValidateCorporationNumber = jest.fn().mockResolvedValueOnce({
      valid: false,
      message: 'invalid corporation number',
    });

    (useCorporationNumberValidation as jest.Mock).mockReturnValueOnce({
      validateCorporationNumber: mockValidateCorporationNumber,
    });

    const { validateCorporationNumber } = useCorporationNumberValidation();
    const response = await validateCorporationNumber('507982498');

    expect(response).toEqual({
      valid: false,
      message: 'invalid corporation number',
    });
  });
});
