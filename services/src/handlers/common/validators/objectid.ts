import { ObjectId } from 'mongodb';

const objectId = (input: any) => {
	if (!ObjectId.isValid(input)) {
		throw new Error('It should be Object Id');
	}

	return true;
};

export default objectId;
