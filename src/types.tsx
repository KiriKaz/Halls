
import type { SnackbarKey, OptionsObject } from 'notistack';

export type SessionToken = {
  token: string | null,
  username: string | null,
  pfp: string | null,
  id: string | null
}

export type Notification = {
  message: string | null,
  options: OptionsObject,
  origin?: string,
  dismissed?: boolean
}

export type Theming = {
  darkmode: boolean
}

export type WritingState = {
  slug: string,
  title: string,
  editing?: true,
  editingSlug?: string
}

export type CustomError = {
  code?: number,
  message: string
}