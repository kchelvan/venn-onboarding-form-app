export interface CorporationValidationResponse {
  valid: boolean;
  message?: string;
  corporationNumber?: string;
}

export const useCorporationNumberValidation = () => {
  const validateCorporationNumber = async (corporationNumber: string) => {
    if (!corporationNumber) {
      return {
        valid: false,
        message: 'Corporation Number is required',
      };
    }

    try {
      const response = await fetch(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${corporationNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const corporationDataResponse: CorporationValidationResponse =
        await response.json();

      return corporationDataResponse;
    } catch (err) {
      return {
        valid: false,
        message: 'Error validating corporation number',
      };
    }
  };

  return { validateCorporationNumber };
};
