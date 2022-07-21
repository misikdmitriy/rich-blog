import { Variant } from '@mui/material/styles/createTypography';
import { NonEmptyArray } from './common';

export type ContentBase = Record<string, unknown> & {
    type: string
    key?: string
}

export type ContainerContent = ContentBase & {
    type: 'container',
    content: NonEmptyArray<ContentBase>
}

export type TextContent = ContentBase & {
    type: 'text',
    text: string
}

export type TypographyContent = ContentBase & {
    type: 'typography',
    variant: Variant,
    content: NonEmptyArray<ContentBase>
};

export type ImageContent = ContentBase & {
    type: 'image',
    src: string,
    alt: string,
};

export type HtmlContent = ContentBase & {
    type: 'html',
    html: string
};

export type AccordionContent = ContentBase & {
    type: 'accordion',
    content: {
        key: string,
        title: ContentBase,
        content: ContentBase
    }[]
};
