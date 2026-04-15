import en from './en.json';
import hr from './hr.json';

export type Lang = 'en' | 'hr';

const translations: Record<Lang, typeof hr> = { en, hr };

function getNestedValue(obj: any, path: string): string | undefined {
  const value = path.split('.').reduce((acc: any, key: string) => {
    if (acc === undefined || acc === null) return undefined;
    return acc[key];
  }, obj);
  return typeof value === 'string' ? value : undefined;
}

export function t(key: string, lang: Lang): string {
  return getNestedValue(translations[lang], key) ?? key;
}

export function getCurrentLang(): Lang {
  try {
    const stored = localStorage.getItem('cv_lang') as Lang | null;
    return stored === 'en' || stored === 'hr' ? stored : 'hr';
  } catch {
    return 'hr';
  }
}

export function setLang(lang: Lang): void {
  try {
    localStorage.setItem('cv_lang', lang);
  } catch {}
  applyTranslations(lang);
}

export function applyTranslations(lang: Lang): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')!;
    const value = t(key, lang);
    if (value !== key) el.textContent = value;
  });

  document.querySelectorAll<HTMLElement>('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

export function initI18n(): void {
  applyTranslations(getCurrentLang());
}
