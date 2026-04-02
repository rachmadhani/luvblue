/**
 * Normalizes an image URL by prepending the base URL if it's a relative path.
 * @param path The image path or URL from the API
 * @returns The absolute URL to the image
 */
export const getImageUrl = (path: string): string => {
  if (!path) return ''

  const trimmedPath = path.trim()

  // If it's already an absolute URL or a data/blob URL, return it as is
  if (
    trimmedPath.startsWith('http://') ||
    trimmedPath.startsWith('https://') ||
    trimmedPath.startsWith('data:') ||
    trimmedPath.startsWith('blob:')
  ) {
    return trimmedPath
  }

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000'

  // Ensure the path doesn't have a leading slash before prepending the base URL
  const normalizedPath = trimmedPath.startsWith('/') ? trimmedPath.slice(1) : trimmedPath

  return `${baseUrl}/${normalizedPath}`
}
