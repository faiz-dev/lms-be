import { SetMetadata } from '@nestjs/common';

export const REPONSE_MESSAGE_KEY = 'response_message';

export const ResponseMessage = (message: string) =>
  SetMetadata(REPONSE_MESSAGE_KEY, message);
