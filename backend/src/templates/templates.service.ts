import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';

type LoadTemplateOptions = {
  service?: string; // nome do serviço (opcional)
  path?: string; // caminho relativo dentro de templatesDir
  absolutePath?: boolean; // se true, usa o path fornecido como caminho absoluto
};

@Injectable()
export class TemplatesService {
  private templatesDir: string;
  private cache = new Map<string, Handlebars.TemplateDelegate>();
  private readonly logger = new Logger(TemplatesService.name);

  constructor() {
    this.templatesDir = path.resolve(__dirname, '../../templates');
  }

  private normalizeName(name: string) {
    return name.endsWith('.hbs') ? name : `${name}.hbs`;
  }

  private resolveFullPath(name: string, options?: LoadTemplateOptions) {
    let fileName = this.normalizeName(name);

    if (options?.absolutePath) {
      this.logger.debug(`Using absolute path for template: ${name}`);
      return path.resolve(name);
    }

    let baseDir = this.templatesDir;

    if (options?.service) {
      this.logger.debug(
        `Using service subdirectory for template: ${options.service}`,
      );
      baseDir = path.join(baseDir, options.service);
    }

    if (options?.path) {
      this.logger.debug(`Using additional path for template: ${options.path}`);
      baseDir = path.join(baseDir, options.path);
    }

    return path.join(baseDir, fileName);
  }

  async loadTemplate(
    name: string,
    options?: LoadTemplateOptions,
  ): Promise<Handlebars.TemplateDelegate> {
    const fullPath = this.resolveFullPath(name, options);
    const cacheKey = `${options?.service ?? options?.path ?? 'root'}:${path.basename(fullPath)}`;

    if (this.cache.has(cacheKey)) {
      this.logger.debug(`Template cache hit: ${cacheKey}`);
      return this.cache.get(cacheKey)!;
    }

    this.logger.debug(`Loading template: ${fullPath}`);
    const content = await fs.readFile(fullPath, 'utf-8');
    const compiled = Handlebars.compile(content);
    this.cache.set(cacheKey, compiled);
    return compiled;
  }

  /**
   * Renderiza um template Handlebars pelo nome (com ou sem extensão .hbs)
   * Retorna string HTML/texto.
   */
  async renderTemplate(
    name: string,
    context: Record<string, any> = {},
    options?: LoadTemplateOptions,
  ): Promise<string> {
    const compiled = await this.loadTemplate(name, options);
    this.logger.debug(`Rendering template: ${name}`);
    return compiled(context);
  }

  /** Limpa cache de templates compilados (útil em dev ou quando atualizar templates em runtime) */
  clearCache() {
    this.cache.clear();
  }
}
