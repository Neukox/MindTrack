import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';

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

  async loadTemplate(name: string): Promise<Handlebars.TemplateDelegate> {
    const fileName = this.normalizeName(name);
    if (this.cache.has(fileName)) return this.cache.get(fileName)!;

    const fullPath = path.join(this.templatesDir, fileName);
    this.logger.debug(`Loading template: ${fullPath}`);
    const content = await fs.readFile(fullPath, 'utf-8');
    const compiled = Handlebars.compile(content);
    this.cache.set(fileName, compiled);
    return compiled;
  }

  /**
   * Renderiza um template Handlebars pelo nome (com ou sem extensão .hbs)
   * Retorna string HTML/texto.
   */
  async renderTemplate(name: string, context: Record<string, any> = {}): Promise<string> {
    const compiled = await this.loadTemplate(name);
    return compiled(context);
  }

  /** Limpa cache de templates compilados (útil em dev ou quando atualizar templates em runtime) */
  clearCache() {
    this.cache.clear();
  }
}
