# Numeronym

A TypeScript library and CLI tool for generating numeronyms from words with full Unicode support.

> A numeronym is a number-based abbreviation where the number represents letters between the first and last character. For example: `internationalization` → `i18n` (18 letters between 'i' and 'n')

[![npm version](https://img.shields.io/npm/v/numeronym.svg)](https://www.npmjs.com/package/numeronym)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- ✅ **Unicode-safe** - Properly handles emoji, accents, and complex grapheme clusters
- ✅ **Multi-word support** - Process phrases with customizable separators
- ✅ **CLI & Library** - Use programmatically or from the command line
- ✅ **TypeScript** - Full type definitions included
- ✅ **Zero dependencies** - Uses native `Intl.Segmenter` API
- ✅ **Modern** - ESM format, works in Node.js 16+ and modern browsers

## Installation

```bash
npm install numeronym
```

## Quick Start

### As a Library

```typescript
import { toNumeronym } from "numeronym";

toNumeronym("internationalization"); // 'i18n'
toNumeronym("localization"); // 'l10n'
toNumeronym("accessibility"); // 'a11y'
toNumeronym("kubernetes"); // 'k8s'

// Multi-word phrases
toNumeronym("hello world"); // 'h3o w3d'
toNumeronym("hello world", { separator: "-" }); // 'h3o-w3d'
toNumeronym("hello world", { transform: "uppercase" }); // 'H3O W3D'

// Minimum length threshold
toNumeronym("the big word", { minLength: 4 }); // 'the big w2d'
```

### As a CLI

```bash
npx numeronym "hello world"
# h3o w3d

npx numeronym "hello world" --transform uppercase --separator "-"
# H3O-W3D

npx numeronym --help
```

## API

### `toNumeronym(input, options?)`

Converts a word or phrase into a numeronym.

**Parameters:**

- `input` (string) - The word or phrase to convert
- `options` (object, optional)
  - `separator` (string) - Separator between words (default: `' '`)
  - `transform` (`'uppercase'` | `'lowercase'` | `'capitalize'`) - Case transformation
  - `minLength` (number) - Minimum word length to convert (default: `4`)

**Returns:** string

**Examples:**

```typescript
// Basic usage
toNumeronym("development"); // 'd9t'
toNumeronym("cat"); // 'cat' (too short, unchanged)

// Custom separator
toNumeronym("hello world", { separator: "_" }); // 'h3o_w3d'

// Transform case
toNumeronym("Hello World", { transform: "lowercase" }); // 'h3o w3d'
toNumeronym("hello world", { transform: "capitalize" }); // 'H3o W3d'

// Control minimum length
toNumeronym("a big word", { minLength: 5 }); // 'a big word'
```

## CLI Usage

```bash
numeronym [options] <text>
```

**Options:**

- `-s, --separator <str>` - Separator between words (default: space)
- `-t, --transform <type>` - Transform case: `uppercase`, `lowercase`, or `capitalize`
- `-m, --min-length <num>` - Minimum word length to convert (default: 4)
- `-h, --help` - Show help message
- `-v, --version` - Show version

**Examples:**

```bash
numeronym "internationalization"
# i18n

numeronym "hello world" -t uppercase -s "-"
# H3O-W3D

numeronym "the big word" --min-length 4
# the big w2d
```

## Unicode Support

This library correctly handles Unicode grapheme clusters using `Intl.Segmenter`:

```typescript
toNumeronym("café"); // 'c2é'
toNumeronym("François"); // 'F6s'
toNumeronym("hello👋world"); // 'h9d'
toNumeronym("test🇺🇸end"); // 't6d'
toNumeronym("👨‍👩‍👧‍👦family"); // '👨‍👩‍👧‍👦5y'
```

Works with:

- Accented characters (é, ñ, ü)
- Emoji with skin tones (👋🏽)
- Flag emoji (🇺🇸)
- Complex emoji sequences (👨‍👩‍👧‍👦)

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build
npm run build

# Development mode (watch)
npm run dev

# Type check
npm run typecheck
```

## License

ISC
