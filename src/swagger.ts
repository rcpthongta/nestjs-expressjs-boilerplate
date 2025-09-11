import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export class Swagger {
  private readonly logger: Logger = new Logger(Swagger.name);

  private readonly application: NestExpressApplication;
  private readonly path: string;
  private readonly pathUI: string;
  private readonly pathJSON: string;
  private readonly pathYAML: string;

  public constructor(application: NestExpressApplication) {
    this.application = application;
    this.path = "api-docs";
    this.pathUI = `${this.path}/ui`;
    this.pathJSON = `${this.path}/json`;
    this.pathYAML = `${this.path}/yaml`;
  }

  public run(): void {
    const builder: DocumentBuilder = new DocumentBuilder();
    const theme: SwaggerTheme = new SwaggerTheme();
    const configuration: Omit<OpenAPIObject, "paths"> = builder
      .setVersion(environment.application.version)
      .setTitle(environment.application.name)
      .setDescription("API Documentation")
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(this.application, configuration, {
      autoTagControllers: true,
      deepScanRoutes: true,
      ignoreGlobalPrefix: false
    });

    SwaggerModule.setup(this.pathUI, this.application, document, {
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
        ${theme.getBuffer(SwaggerThemeNameEnum.FLATTOP)}

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
    });

    this.logger.log(`UI {/${this.pathUI}}:`);
    this.logger.log(`Json {/${this.pathJSON}}:`);
    this.logger.log(`Yaml {/${this.pathYAML}}:`);
  }
}
