import React from 'react';
import { Box, Typography as MuiTypography } from '@mui/material';
import {
	ContainerContent,
	ContentBase,
	ImageContent,
	TextContent,
	TypographyContent,
	HtmlContent,
	AccordionContent,
} from '../../types/content';
import AccordionComponent from '../accordion/Accordion';

interface ContentProps<TContentType extends ContentBase = ContentBase> {
    content: TContentType
}

// eslint-disable-next-line no-use-before-define
const contentMapper = (content: ContentBase) => <ContentRoot key={content.key} content={content} />;

const Text = (props: ContentProps<TextContent>) => {
	const { content, ...other } = props;
	return <span {...other}>{content.text}</span>;
};

const Typography = (props: ContentProps<TypographyContent>) => {
	const { content: { variant, content, ...other } } = props;

	return (
		<MuiTypography variant={variant} {...other}>
			{content.map(contentMapper)}
		</MuiTypography>
	);
};

const Container = (props: ContentProps<ContainerContent>) => {
	const { content: { content, ...other } } = props;

	return (
		<Box {...other}>
			{content.map(contentMapper)}
		</Box>
	);
};

const Image = (props: ContentProps<ImageContent>) => {
	const { content: { src, alt, ...other } } = props;
	return <img src={src} alt={alt} {...other} />;
};

const Html = (props: ContentProps<HtmlContent>) => {
	const { content: { html, ...other } } = props;
	// eslint-disable-next-line react/no-danger
	return <div dangerouslySetInnerHTML={{ __html: html }} {...other} />;
};

const Accordion = (props: ContentProps<AccordionContent>) => {
	const { content: { content, ...other } } = props;
	return (
		<AccordionComponent
			articles={content.map(({ key, title, content: ctnt }) => ({
				key,
				title: contentMapper(title),
				content: contentMapper(ctnt),
			}))}
			{...other}
		/>
	);
};

const ContentRoot = (props: ContentProps) => {
	const { content } = props;

	if (content.type === 'container') {
		return <Container content={content as ContainerContent} />;
	}
	if (content.type === 'text') {
		return <Text content={content as TextContent} />;
	}
	if (content.type === 'typography') {
		return <Typography content={content as TypographyContent} />;
	}
	if (content.type === 'image') {
		return <Image content={content as ImageContent} />;
	}
	if (content.type === 'html') {
		return <Html content={content as HtmlContent} />;
	}
	if (content.type === 'accordion') {
		return <Accordion content={content as AccordionContent} />;
	}

	return null;
};

export default ContentRoot;
