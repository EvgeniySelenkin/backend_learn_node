import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://bncabpoa:m938VXRdtQ0t_A1Cs_92FLQeTtN408ua@abul.db.elephantsql.com/bncabpoa',
      synchronize: true,
      entities: [User]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
