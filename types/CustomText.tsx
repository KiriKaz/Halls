
export type FormattedText = {
  text: string
  bold?: true
  italic?: true
  strikethrough?: true
  underline?: true
  superscript?: true  // Handle differently
  subscript?: true  // Handle differently
  discordSpoiler?: true
  smallcaps?: true
  fullWidth?: true
  upsideDown?: true
  customFont?: 'Arial'  // Replace with font names from somewhere. Can keep scarce.
}

// export type UnformattableText = {
//   text: string
// }

// export type CodeblockHighlightingText = {
//   text: string
//   language?: string  // Name of language? Refer to specific language, maybe? Language<T>
// }

// Temporarily blocking non-format texts, because man, I don't know how to implement them with TS.
// I don't want to have to make my own helper functions yet.

export type CustomText = FormattedText