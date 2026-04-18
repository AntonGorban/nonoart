import cookieParser from 'cookie-parser';

import { environment } from '../environment';

export const cookieParserMiddleware = cookieParser(environment.COOKIE_SECRET);
