import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
  // Remove any existing /md-next prefix to avoid duplication
  const cleanSrc = src.replace('/md-next', '')
  const basePath = process.env.NODE_ENV === 'production' ? '/md-next' : ''
  return `${basePath}${cleanSrc}?w=${width}&q=${quality || 75}`
}

export default function OptimizedImage({ src, ...props }) {
  // No need to modify src here since loader will handle the path
  const newSrc = `/md-next/${src}`
  return (
    <Image 
      loader={imageLoader}
      src={newSrc}
      {...props}
    />
  )
}