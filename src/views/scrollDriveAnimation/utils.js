export const getElementById = (id, container) => {
  return container.querySelector(`[data-id="${id}"]`);
};
