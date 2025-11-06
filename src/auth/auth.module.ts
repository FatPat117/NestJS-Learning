import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { SignInProvider } from './providers/sign-in.provider';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
    SignInProvider,
  ],
  exports: [AuthService, HashingProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('jwt.secret'),
    //     signOptions: {
    //       expiresIn: configService.get('jwt.accessTokenTTL'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
