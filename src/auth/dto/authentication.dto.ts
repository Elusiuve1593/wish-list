import { PartialType } from '@nestjs/mapped-types';
import { RegistrationDTO } from './registration.dto';

export class AuthenticationDTO extends PartialType(RegistrationDTO) {}
