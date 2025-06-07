export const Roles = Object.freeze({
  CUSTOMER: 'customer',
  CRAFTER: 'crafter',
});

// Optional: for dropdowns or iteration
export const RoleList = Object.values(Roles);

export const RoleIcons = {
  [Roles.CUSTOMER]: 'person-outline',
  [Roles.CRAFTER]: 'people-outline',
};
