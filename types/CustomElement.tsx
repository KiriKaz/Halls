import { CustomText } from './CustomText';

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type CustomElement = ParagraphElement | CodeElement;