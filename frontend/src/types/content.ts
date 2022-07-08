import { Variant } from '@mui/material/styles/createTypography';
import { NonEmptyArray } from './common';

export type ContentBase = {
    type: string
}

export type ContainerContent = ContentBase & Record<string, unknown> & {
    type: 'container',
    content: NonEmptyArray<ContentBase>
}

export type TextContent = ContentBase & {
    type: 'text',
    text: string
}

export type TypographyContent = ContentBase & Record<string, unknown> & {
    type: 'typography',
    variant: Variant,
    content: NonEmptyArray<ContentBase>
};
