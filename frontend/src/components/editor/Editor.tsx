import React from 'react';
import {
	Editor as DraftEditor, EditorCommand, EditorState, RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

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

	console.log(stateToHTML(editorState.getCurrentContent()));

	const handleKeyCommand = (command: EditorCommand) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	return (
		<div style={styles.editor}>
			<DraftEditor
				editorState={editorState}
				onChange={setEditorState}
				handleKeyCommand={handleKeyCommand}
			/>

		</div>
	);
};

export default Editor;
