export const encodeUrl = function (url: string, data: Record<string, any> = {}): string {
  const encodedData = Object.entries(data).filter(([_key, value]) => !!value).map(([key, value]) => {
    return [key, encodeURIComponent(value)].join('=')
  }).join('&')

  return encodedData ? [url, encodedData].join('?') : url
}

export const findUrls = function (content: string): string[] {
  return content.match(/(https?:\/\/)?[-a-zA-Z0-9@%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi) || []
}
