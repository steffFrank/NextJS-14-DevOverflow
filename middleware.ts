import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks(.*)",
    "/tags",
    "/profile",
    "/profile/:id",
    "/question/:id",
    "tags/:id",
    "/community",
    "/jobs",
  ],
  ignoredRoutes: [
    "/api/webhooks(.*)",
    "/ask-question",
    "/collection",
    "/ask-questions",
    "questions/:id",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
