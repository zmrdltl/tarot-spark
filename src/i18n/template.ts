const BRACED_TOKEN_PATTERN = /\{([^{}]*)\}/g;
const PLACEHOLDER_KEY_PATTERN = /^[A-Za-z][A-Za-z0-9_]*$/;
const TEMPLATE_PLACEHOLDER_PATTERN = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;

export function formatTemplateStrict(
  template: string,
  values: Readonly<Record<string, string>>,
  context: string,
): string {
  assertTemplatePlaceholders(template, Object.keys(values), context);

  return template.replace(
    TEMPLATE_PLACEHOLDER_PATTERN,
    (_match, key: string) => {
      const value = values[key];

      if (value === undefined) {
        throw new Error(`${context} is missing template value "${key}".`);
      }

      return value;
    },
  );
}

export function assertTemplatePlaceholders(
  template: string,
  expectedKeys: readonly string[],
  context: string,
): void {
  const rawActualKeys = extractRawTemplatePlaceholders(template, context);
  const actualKeys = uniqueSorted(rawActualKeys);
  const normalizedExpectedKeys = uniqueSorted(expectedKeys);
  const duplicatedActualKeys = findDuplicates(rawActualKeys);
  const duplicatedExpectedKeys = findDuplicates(expectedKeys);
  const missingKeys = normalizedExpectedKeys.filter(
    (key) => !actualKeys.includes(key),
  );
  const unexpectedKeys = actualKeys.filter(
    (key) => !normalizedExpectedKeys.includes(key),
  );
  const errors = [
    formatKeyError("duplicate actual", duplicatedActualKeys),
    formatKeyError("duplicate expected", duplicatedExpectedKeys),
    formatKeyError("missing", missingKeys),
    formatKeyError("unexpected", unexpectedKeys),
  ].filter((message): message is string => message !== undefined);

  if (errors.length > 0) {
    throw new Error(
      `${context} template placeholders mismatch: ${errors.join("; ")}.`,
    );
  }
}

export function extractTemplatePlaceholders(
  template: string,
  context: string,
): readonly string[] {
  return uniqueSorted(extractRawTemplatePlaceholders(template, context));
}

function extractRawTemplatePlaceholders(
  template: string,
  context: string,
): readonly string[] {
  const malformedTokens = findMalformedPlaceholderTokens(template);

  if (malformedTokens.length > 0) {
    throw new Error(
      `${context} contains malformed template placeholders: ${malformedTokens.join(
        ", ",
      )}.`,
    );
  }

  const keys = Array.from(template.matchAll(TEMPLATE_PLACEHOLDER_PATTERN)).map(
    (match) => match[1] ?? "",
  );

  return keys;
}

function findMalformedPlaceholderTokens(template: string): readonly string[] {
  const malformedTokens: string[] = [];
  const textOutsideBracedTokens = template.replace(
    BRACED_TOKEN_PATTERN,
    (token, key: string) => {
      if (!PLACEHOLDER_KEY_PATTERN.test(key)) {
        malformedTokens.push(token);
      }

      return "";
    },
  );

  if (/[{}]/.test(textOutsideBracedTokens)) {
    malformedTokens.push("unmatched brace");
  }

  return uniqueSorted(malformedTokens);
}

function formatKeyError(label: string, keys: readonly string[]) {
  return keys.length > 0 ? `${label}: ${keys.join(", ")}` : undefined;
}

function findDuplicates(values: readonly string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates].sort();
}

function uniqueSorted(values: readonly string[]) {
  return [...new Set(values)].sort();
}
