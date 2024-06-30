/** @type {(name: string) => string} */
export const requireEnv = (name) => {
  const env = process.env[name];
  if (!env) throw new Error(`Missing required env "${name}"`);
  return env;
};
