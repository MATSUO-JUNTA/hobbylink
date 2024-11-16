export const imageFetcher = (url: string) => {
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      return new File([blob], 'image.jpg')
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}
