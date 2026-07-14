import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const translationsDir = path.join(root, 'admin', 'i18n');
const requiredLanguages = ['en', 'de', 'ru', 'pt', 'nl', 'fr', 'it', 'es', 'pl', 'uk', 'zh-cn'];

function readTranslation(language) {
    const file = path.join(translationsDir, `${language}.json`);
    if (!fs.existsSync(file)) {
        throw new Error(`Missing translation file: admin/i18n/${language}.json`);
    }
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const englishKeys = new Set(Object.keys(readTranslation('en')));
const errors = [];

for (const language of requiredLanguages) {
    const translations = readTranslation(language);
    const keys = new Set(Object.keys(translations));
    const missing = [...englishKeys].filter(key => !keys.has(key));
    const extra = [...keys].filter(key => !englishKeys.has(key));
    const empty = [...englishKeys].filter(
        key => keys.has(key) && (typeof translations[key] !== 'string' || translations[key].trim() === ''),
    );

    if (missing.length > 0) {
        errors.push(`${language}: missing keys: ${missing.join(', ')}`);
    }
    if (extra.length > 0) {
        errors.push(`${language}: extra keys: ${extra.join(', ')}`);
    }
    if (empty.length > 0) {
        errors.push(`${language}: empty or non-string values: ${empty.join(', ')}`);
    }
}

if (errors.length > 0) {
    throw new Error(`Translation files do not match admin/i18n/en.json:\n${errors.join('\n')}`);
}

console.log(`Translation key parity verified for ${requiredLanguages.length} languages (${englishKeys.size} keys).`);
