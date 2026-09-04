import type { MetadataRoute } from "next";

const BASE_URL = "https://evisa-eta.co.uk";

const staticRoutes = [
  "",
  "/about",
  "/apply",
  "/contact",
  "/track-status",
  "/migration-rules",
  "/privacy-policy",
  "/terms-conditions",
  "/refund-policy",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/apply" ? 0.9 : 0.7,
  }));
}
