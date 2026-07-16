import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listServiceAreas from "./tools/list-service-areas";
import getServiceArea from "./tools/get-service-area";
import getBusinessInfo from "./tools/get-business-info";

// Build issuer from the project ref (inlined by Vite at build time) so the
// emitted Deno function has a literal — no runtime env read at module top level.
const projectRef =
  (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "jsg-liquidators-mcp",
  title: "JSG Liquidators",
  version: "0.1.0",
  instructions:
    "Tools for JSG Liquidators — Denver's estate & business liquidation experts. Use `get_business_info` for contact/services, `list_service_areas` / `get_service_area` for Colorado city coverage, and `list_blog_posts` / `get_blog_post` for guides on estate sales, cleanouts, consignment, and junk removal.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getBusinessInfo, listServiceAreas, getServiceArea, listBlogPosts, getBlogPost],
});
