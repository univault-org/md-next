import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
  // Add /md-next prefix only in production
  const basePath = process.env.NODE_ENV === 'production' ? '/md-next' : ''
  return `${basePath}${src}?w=${width}&q=${quality || 75}`
}

export default function OptimizedImage({ src, ...props }) {
  // For static source reference (like fill images that don't use loader)
  const imageSrc = process.env.NODE_ENV === 'production' 
    ? `/md-next${src}`
    : src

  return (
    <Image 
      loader={imageLoader}
      src={imageSrc}
      {...props}
    />
  )
}