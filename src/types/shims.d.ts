/**
 * Type shims for libraries whose published types are incompatible
 * with our React 18 + @types/react version. These declarations
 * override the broken JSX component typings without touching runtime.
 */

declare module "react-helmet-async" {
  import type { ReactNode, FC } from "react";

  export interface HelmetProps {
    children?: ReactNode;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    onChangeClientState?: (newState: any, addedTags: any, removedTags: any) => void;
    titleTemplate?: string;
    defaultTitle?: string;
    title?: string;
    prioritizeSeoTags?: boolean;
  }

  export interface HelmetProviderProps {
    children?: ReactNode;
    context?: Record<string, unknown>;
  }

  export const Helmet: FC<HelmetProps>;
  export const HelmetProvider: FC<HelmetProviderProps>;
}

declare module "input-otp" {
  import type { ComponentType, ReactNode, RefAttributes, InputHTMLAttributes } from "react";

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

  export const OTPInputContext: React.Context<OTPInputContextType>;

  export interface OTPInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "children"> {
    value?: string;
    onChange?: (value: string) => void;
    maxLength: number;
    textAlign?: "left" | "center" | "right";
    onComplete?: (value: string) => void;
    pushPasswordManagerStrategy?: "increase-width" | "none";
    containerClassName?: string;
    render?: (props: { slots: SlotProps[] }) => ReactNode;
    children?: ReactNode;
  }

  export const OTPInput: ComponentType<OTPInputProps & RefAttributes<HTMLInputElement>>;
}

declare module "recharts" {
  // Re-export everything from recharts but loosen Tooltip typing so it works as a JSX component.
  export * from "recharts/types/index";
  export const Tooltip: any;
}
