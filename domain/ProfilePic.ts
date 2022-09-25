import { ProfilePic } from 'types/ProfilePic'

const defaultProfilePic: ProfilePic = {
  profilePicUri:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiBpZD0icGVyc29uLWFjY2VudC00LW9uLWRhcmsiPgogIDxwYXRoIGZpbGw9IiMzODQzNGYiIGQ9Ik0wIDBoMTI4djEyOEgweiIvPgogIDxwYXRoIGQ9Ik04OC40MSA4NC42N2EzMiAzMiAwIDEwLTQ4LjgyIDAgNjYuMTMgNjYuMTMgMCAwMTQ4LjgyIDB6IiBmaWxsPSIjNzg4ZmE1Ii8+CiAgPHBhdGggZD0iTTg4LjQxIDg0LjY3YTMyIDMyIDAgMDEtNDguODIgMEE2Ni43OSA2Ni43OSAwIDAwMCAxMjhoMTI4YTY2Ljc5IDY2Ljc5IDAgMDAtMzkuNTktNDMuMzN6IiBmaWxsPSIjOWRiM2M4Ii8+CiAgPHBhdGggZD0iTTY0IDk2YTMxLjkzIDMxLjkzIDAgMDAyNC40MS0xMS4zMyA2Ni4xMyA2Ni4xMyAwIDAwLTQ4LjgyIDBBMzEuOTMgMzEuOTMgMCAwMDY0IDk2eiIgZmlsbD0iIzU2Njg3YSIvPgo8L3N2Zz4K',
}

export const createProfilePic = (args?: Partial<ProfilePic>): ProfilePic => {
  return {
    ...defaultProfilePic,
    ...args,
  }
}

export const editProfilePic = (
  profilePic: ProfilePic,
  args: Partial<ProfilePic>
) => {
  return createProfilePic({ ...profilePic, ...args })
}
