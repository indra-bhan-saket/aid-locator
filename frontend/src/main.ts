import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Polyfill for ng-bootstrap i18n support
if (typeof (globalThis as any).$localize === 'undefined') {
  (globalThis as any).$localize = (template: TemplateStringsArray | string, ...expressions: any[]) => {
    // Handle both array and string inputs
    if (typeof template === 'string') {
      return template;
    }
    
    // Extract the default message from the i18n template
    let result = '';
    for (let i = 0; i < template.length; i++) {
      // Remove i18n metadata (format: :@@id:defaultText or :meaning|description@@id:defaultText)
      let part = template[i];
      const match = part.match(/:.*?:(.*?)$/);
      if (match) {
        part = match[1]; // Use the default text after the last colon
      }
      result += part;
      if (i < expressions.length) {
        result += expressions[i];
      }
    }
    return result;
  };
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
