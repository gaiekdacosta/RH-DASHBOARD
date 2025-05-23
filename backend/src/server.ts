import { fastify } from 'fastify';
import fastifyCors from "@fastify/cors";
import dotenv from 'dotenv';
import { useRoutes } from './routes'; 

dotenv.config();

const app = fastify({ logger: true });

const PORT = process.env.PORT || 3000;

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
});

useRoutes(app);

app.listen({ port: Number(PORT), host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
});

