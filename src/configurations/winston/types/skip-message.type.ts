import * as winston from "winston";

import { SkipMessageOptions } from "../interfaces";

export type SkipMessage = (opts: SkipMessageOptions) => winston.Logform.Format;
