import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
  // Remove any existing /md-next prefix to avoid duplication
  const cleanSrc = src.replace('/md-next', '')
  const basePath = process.env.NODE_ENV === 'production' ? '/md-next' : ''
  return `${basePath}${cleanSrc}?w=${width}&q=${quality || 75}`
}

export default function OptimizedImage({ src, ...props }) {
 const env = process.env.NODE_ENV;
 console.log("current environment:", env);
  const newSrc = `/md-next/${src}`
  return (
    <Image 
      loader={imageLoader}
      src={env === 'production' ? newSrc : src}
      {...props}
    />
  )
}