import React from 'react';
import {
	Editor as DraftEditor, EditorCommand, EditorState, RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

const Editor = () => {
	const styles = {
		editor: {
			border: '1px solid gray',
			minHeight: '6em',
		},
	};

	const [editorState, setEditorState] = React.useState(
		EditorState.createEmpty(),
	);

	const handleKeyCommand = (command: EditorCommand) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	const appendTest = () => {
		const currentBlocks = stateToHTML(editorState.getCurrentContent());
		const newState = stateFromHTML(`${currentBlocks}<p><strong>test</strong></p>`);
		setEditorState(EditorState.createWithContent(newState));
	};

	return (
		<div style={styles.editor}>
			<button onClick={appendTest} type="button">Append bold test</button>
			<DraftEditor
				editorState={editorState}
				onChange={setEditorState}
				handleKeyCommand={handleKeyCommand}
			/>

		</div>
	);
};

export default Editor;
