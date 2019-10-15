import fs from 'fs';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { ssr, build_dir, dev } from '@sapper/internal/manifest-server';
import { generate_mock_api_data } from './mock/generate-mock-api-data.js';

generate_mock_api_data();

const { PORT } = process.env;

const middleware = [
		compression({ threshold: 0 }),
		sirv('static', { dev }),
];

if (ssr) {
	const sapper = import('@sapper/server');
	middleware.push(sapper.middleware());
} else {
	middleware.push(sirv(build_dir, { dev }));
}


polka() // You can also use Express
	.use(...middleware)
	.listen(PORT, err => {
		if (err) {
			console.log('error', err);
		}
	});
