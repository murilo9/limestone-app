export const firstLetters = (firstName: string, lastName: string) =>
  (lastName
    ? `${firstName[0]}${lastName[0]}`
    : `${firstName[0]}${firstName[1]}`
  ).toUpperCase();
