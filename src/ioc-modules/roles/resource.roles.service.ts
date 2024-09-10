import { RolesServiceContract } from "./types";
import * as Constants from "./constants";

export class RolesService implements RolesServiceContract {
  public constructor(private readonly defaultRole: number) {}

  public get default(): number {
    return this.defaultRole;
  }

  public applyMask(role: number): number {
    return role & Constants.ROLE_MASK;
  }

  public intersectionMask(role: number, mask: number): boolean {
    return !!(role & mask);
  }
}
