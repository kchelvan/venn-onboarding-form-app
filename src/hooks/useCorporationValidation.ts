import { useState } from 'react';

export interface CorporationValidationResponse {
  valid: boolean;
  message?: string;
  corporationNumber?: string;
}

export const useCorporationNumberValidation = () => {
  const [isValidCorporationNumber, setIsValidCorporationNumber] =
    useState<CorporationValidationResponse>({
      valid: false,
      message: '',
    });
  const validateCorporationNumber = async (corporationNumber: string) => {
    if (!corporationNumber) {
      setIsValidCorporationNumber({
        valid: false,
        message: 'Corporation Number is required',
      });
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

      setIsValidCorporationNumber(corporationDataResponse);
    } catch (err) {
      setIsValidCorporationNumber({
        valid: false,
        message: 'Error validating corporation number',
      });
    }
  };

  return { validateCorporationNumber, isValidCorporationNumber };
};
