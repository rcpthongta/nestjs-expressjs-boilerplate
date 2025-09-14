import { Global, Module } from "@nestjs/common";

import path from "node:path";

import { I18nModule } from "./modules";

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallback: {
        fallbackLanguage: "en",
        fallbacks: {
          "en-*": "en"
        }
      },
      path: path.join(__dirname, "resources", "i18n")
    })
  ],
  exports: [I18nModule]
})
export class CommonModule {}
