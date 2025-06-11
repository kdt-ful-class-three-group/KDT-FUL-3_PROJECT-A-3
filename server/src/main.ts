import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
// * 서버를 실행하기 위한 부트스트랩 함수.
async function bootstrap() {
  // * NestFactory.create()는 NestJs 애플리케이션 인스턴스를 생성하는 역할.
  // * AppModule은 최상위 모듈, 애플리케이션의 모든 모듈을 포함.
  const PORT: string | number = process.env.PORT ?? '8008'; // 기본 포트 설정
  const app = await NestFactory.create(AppModule);


  //! Swagger 설정
  const config = new DocumentBuilder()
      .setTitle('StockNewbie-Park API')
      .setDescription('요청 endpoint에 대한 설명.')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // * 클라이언트에서 받아온 cookie를 읽기 위해 필요한 cookieParser를 사용한다고 정의.
  app.use(cookieParser());
  //cors
  app.enableCors({
    origin: process.env.CLIENT_URL, // 클라이언트 URL을 환경 변수에서 가져옴
    credentials: true // 오타 수정: Credential -> credentials
  })

  // * express의 server.listen() 과 유사한 역할을 함.
  // * 포트 번호는 .env 파일의 PORT 환경 변수에서 가져오거나, 없으면 3000번 포트로 설정.
  await app.listen(PORT); console.log(`http://localhost:${PORT}`);
}
bootstrap();
