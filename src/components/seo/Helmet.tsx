import type { ReactNode } from "react";

/**
 * Drop-in replacement for react-helmet-async's <Helmet>.
 * React 19 hoists <title>, <meta> and <link> rendered anywhere into <head>,
 * on the server and in the browser, so these tags now ship in the
 * server-rendered HTML. JSON-LD <script> tags render in place, which
 * search engines read the same way.
 */
export const Helmet = ({ children }: { children?: ReactNode }) => <>{children}</>;
