import fs from 'fs';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { build_dir, dev } from '@sapper/internal/manifest-server';
import { generate_mock_api_data } from './mock/generate-mock-api-data.js';

generate_mock_api_data();

const { PORT } = process.env;

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv(build_dir, { dev }),
		sirv('static', { dev }),
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
