import defaultSettings from "@/settings";

const title = defaultSettings.title || "效能分析";

export default function getPageTitle(pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`;
  // }
  return `${title}`;
}
