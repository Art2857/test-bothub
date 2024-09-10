export type RolesServiceContract = {
  get default(): number;
  applyMask(role: number): number;
  intersectionMask(role: number, mask: number): boolean;
};
