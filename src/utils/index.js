// Utility functions used throughout the application.

// Map a page name to a route. This is used by createPageUrl to link
// navigation items to the appropriate React Router path. If a page name
// isn't found the root (/) is returned.
const pageRoutes = {
  Lectures: '/',
  Record: '/record',
  LectureDetail: '/lecture',
};

export function createPageUrl(page) {
  return pageRoutes[page] || '/';
}

export default { createPageUrl };
