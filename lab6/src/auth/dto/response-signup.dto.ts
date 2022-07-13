import { User } from '../../user/user.entity';
import { ResponseLoginDto } from './response-login.dto';

export class ResponseSignUpDto extends ResponseLoginDto {
  user: User;
}
