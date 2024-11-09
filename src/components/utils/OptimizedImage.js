import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}${src}?w=${width}&q=${quality || 75}`
}

export default function OptimizedImage({ src, ...props }) {
  return (
    <Image 
      loader={imageLoader}
      src={src}
      {...props}
    />
  )
}