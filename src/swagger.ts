import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export class Swagger {
  private readonly logger: Logger = new Logger(Swagger.name);

  private readonly path: string = "api-docs";
  private readonly theme: SwaggerTheme = new SwaggerTheme();

  private readonly application: NestExpressApplication;

  private get pathUI(): string {
    return `${this.path}/ui`;
  }

  private get pathJSON(): string {
    return `${this.path}/json`;
  }

  private get pathYAML(): string {
    return `${this.path}/yaml`;
  }

  private createDocument(): OpenAPIObject {
    const configuration: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setVersion(environment.application.version)
      .setTitle(environment.application.name)
      .setDescription("API Documentation")
      .build();

    return SwaggerModule.createDocument(this.application, configuration, {
      autoTagControllers: true,
      deepScanRoutes: true,
      ignoreGlobalPrefix: false
    });
  }

  private createSwaggerOptions(): SwaggerCustomOptions {
    return {
      jsonDocumentUrl: this.pathJSON,
      yamlDocumentUrl: this.pathYAML,
      raw: ["json"],
      swaggerOptions: {
        deepLinking: true,
        defaultModelsExpandDepth: -1,
        displayRequestDuration: true,
        filter: true,
        operationsSorter: "method",
        persistAuthorization: true,
        showCommonExtensions: true,
        showExtensions: true,
        showMutatedRequest: true,
        withCredentials: environment.security.cors.credentials
      },
      customSiteTitle: "API Documentation | OpenAPI (Swagger)",
      customCss: `
        ${this.theme.getBuffer(SwaggerThemeNameEnum.FLATTOP)}

        .parameters-col_name {
          min-width: 30em;
          padding: 10px 0px;
        }

        .parameters-col_description {
          width: 70em;
          margin-bottom: 2em;
        }
      `,
      useGlobalPrefix: false
    };
  }

  public constructor(application: NestExpressApplication) {
    this.application = application;
  }

  public run(): void {
    const document: OpenAPIObject = this.createDocument();
    const options: SwaggerCustomOptions = this.createSwaggerOptions();

    SwaggerModule.setup(this.pathUI, this.application, document, options);

    this.logger.log(`UI {/${this.pathUI}}:`);
    this.logger.log(`Json {/${this.pathJSON}}:`);
    this.logger.log(`Yaml {/${this.pathYAML}}:`);
  }
}
