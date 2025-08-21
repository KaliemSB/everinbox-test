import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix("/api");

// Enable validation globally
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);

const logger = new Logger(AppModule.name);
const PORT = process.env.PORT ?? 3000;

await app.listen(PORT, () => {
  logger.log(`Server is listening at port ${PORT}`);
  logger.log(`Current environment is: ${process.env.NODE_ENV}`);
  logger.log(`Health check available at: http://localhost:${PORT}/api/health`);
});
