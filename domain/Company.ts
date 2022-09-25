import { Company } from 'types/Company'

const defaultCompany: Company = {
  name: 'Lorem ipsum dolor Inc.',
  logoUri:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiBpZD0iY29tcGFueS1hY2NlbnQtNC1vbi1kYXJrIj4KICA8cGF0aCBmaWxsPSIjMzg0MzRmIiBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICA8cGF0aCBmaWxsPSIjOWRiM2M4IiBkPSJNNDggMTZoNjR2MTEySDQ4eiIvPgogIDxwYXRoIGZpbGw9IiM3ODhmYTUiIGQ9Ik0xNiA4MGgzMnY0OEgxNnoiLz4KICA8cGF0aCBmaWxsPSIjNTY2ODdhIiBkPSJNNDggODBoMzJ2NDhINDh6Ii8+Cjwvc3ZnPgo=',
}

export const createCompany = (args?: Partial<Company>): Company => {
  return {
    ...defaultCompany,
    ...args,
  }
}
