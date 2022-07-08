import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const getObject = (
	bucketName: string,
	key: string,
) => {
	const object = s3.getObject({
		Bucket: bucketName,
		Key: key,
	});

	return object.promise();
};

export const putObject = (
	bucketName: string,
	key: string,
	body: string,
) => {
	const object = s3.putObject({
		Bucket: bucketName,
		Key: key,
		Body: Buffer.from(body),
	});

	return object.promise();
};

export const deleteObject = (
	bucketName: string,
	key: string,
) => {
	const object = s3.deleteObject({
		Bucket: bucketName,
		Key: key
	});

	return object.promise();
}