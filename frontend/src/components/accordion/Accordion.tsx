import React from 'react';
import {
	Accordion as MuiAccordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';

interface Article {
    key: string,
    title: |
        string |
        React.ReactNode |
        React.ReactNode[],
    content: |
        string |
        React.ReactNode |
        React.ReactNode[],
    accordionProps?: Record<string, unknown>
}

interface AccordionProps {
    articles: Article[],
}

const Accordion = (props: AccordionProps) => {
	const { articles } = props;

	return (
		<>
			{articles.map(({
				key, title, content, accordionProps = {},
			}) => (
				<MuiAccordion key={key} {...accordionProps}>
					<AccordionSummary>
						{title}
					</AccordionSummary>
					<AccordionDetails>{content}</AccordionDetails>
				</MuiAccordion>
			))}
		</>
	);
};

export default Accordion;
