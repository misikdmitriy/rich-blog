import './config-enrich';
import express from 'express';
import postsV1 from './handlers/v1/posts';

const app = express();
app.use(express.json());
postsV1(app);

const port = Number(process.env.PORT || 80);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
