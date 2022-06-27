import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const listItems = (
	bucketName: string,
	pageSize = 100,
	startAfter: string | undefined = undefined,
) => s3.listObjectsV2({
	Bucket: bucketName,
	MaxKeys: pageSize,
	StartAfter: startAfter,
}).promise();

export const getObject = (
	bucketName: string,
	key: string,
) => s3.getObject({
	Bucket: bucketName,
	Key: key,
}).promise();
