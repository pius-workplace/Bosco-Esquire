// Resolves files in /public no matter which folder the build is served from.
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '')
