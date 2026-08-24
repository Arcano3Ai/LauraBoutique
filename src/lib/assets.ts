export const getAssetPath = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/LauraBoutique')) {
    return `/LauraBoutique${cleanPath}`;
  }
  const isGithub = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/LauraBoutique' : '');
  return `${isGithub}${cleanPath}`;
};
