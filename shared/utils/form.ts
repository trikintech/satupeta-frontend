export const getChangedFields = <T extends Record<string, unknown>>(
  original: Partial<T>,
  updated: T
): Partial<T> => {
  const changedFields: Partial<T> = {};

  (Object.keys(updated) as Array<keyof T>).forEach((key) => {
    const updatedValue = updated[key];
    const originalValue = original[key];

    if (updatedValue !== originalValue) {
      changedFields[key] = updatedValue;
    }
  });

  return changedFields;
};
