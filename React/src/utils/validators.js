/* eslint-disable import/prefer-default-export */
/**
/**
 * Verifiy SIRET field form
 * @param {Number} siret
 * @return Bool true/false if valid SIRET number
 */
export const verifySiret = (siret) => {
  const parsedSiret = siret.replace(/\s/g, '');

  if (!Number(parsedSiret) || parsedSiret.length !== 14) return false;
  let bal = 0;
  let total = 0;
  for (let i = 13; i >= 0; i--) {
    const step = (parsedSiret.charCodeAt(i) - 48) * (bal + 1);
    total += (step > 9) ? step - 9 : step;
    bal = 1 - bal;
  }
  if (total % 10 === 0) {
    return parsedSiret.toString();
  }
  return false;
};

/**
* Validate Password fields
* @param {String} password
* @return Bool true/false if valid password with conditions :
* - Min eight characters
* - at least one uppercase letter
* - at least one lowercase letter
* - at least one number
*/
export const validatePassword = (password) => (
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
);


/**
* Validate Phone number field
* @param {String} phone number
* @return Bool true/false if valid phone number
*/
export const validatePhone = (phone) => (
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)
);
