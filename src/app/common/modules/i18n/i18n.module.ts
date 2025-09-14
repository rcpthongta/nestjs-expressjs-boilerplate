import { DynamicModule, Module } from "@nestjs/common";

import { I18nModuleOptions } from "./interfaces";
import { I18nFallback } from "./models";

import { I18N_FALLBACK, I18N_SOURCE } from "./i18n.constant";
import { I18nService } from "./i18n.service";
import { I18nSource } from "./i18n.source";

@Module({})
export class I18nModule {
  public static forRoot(options: I18nModuleOptions): DynamicModule {
    return {
      module: I18nModule,
      providers: [
        {
          provide: I18N_SOURCE,
          useValue: new I18nSource(options.path)
        },
        {
          provide: I18N_FALLBACK,
          useValue: new I18nFallback(options.fallback)
        },
        I18nService
      ],
      exports: [I18nService]
    };
  }
}
