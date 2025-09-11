import { CustomDecorator, SetMetadata } from "@nestjs/common";

import { SKIP_RESPONSE_WRAPPER_KEY } from "../response-wrapper.constant";

export const SkipResponseWrapper: () => CustomDecorator<string> = (): CustomDecorator<string> => {
  return SetMetadata(SKIP_RESPONSE_WRAPPER_KEY, true);
};
