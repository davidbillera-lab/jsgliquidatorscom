/**
 * Type shims for libraries whose published types are incompatible
 * with our React 18 + @types/react version. These declarations
 * override the broken JSX component typings without touching runtime.
 */

declare module "input-otp" {
  import type { Context } from "react";

  export interface SlotProps {
    char: string | null;
    isActive: boolean;
    hasFakeCaret: boolean;
    placeholderChar?: string | null;
  }

  export interface OTPInputContextType {
    slots: SlotProps[];
    isFocused: boolean;
    isHovering: boolean;
  }

  export const OTPInputContext: Context<OTPInputContextType>;
  export const OTPInput: any;
}

declare module "recharts" {
  // Re-export everything from recharts but loosen Tooltip typing so it works as a JSX component.
  export * from "recharts/types/index";
  export const Tooltip: any;
}
