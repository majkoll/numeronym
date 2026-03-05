# Numeronym

A TypeScript library for generating numeronyms from words.

A numeronym is a number-based word where the number represents the count of letters between the first and last letter. For example:

- `internationalization` → `i18n` (18 letters between 'i' and 'n')
- `localization` → `l10n` (10 letters between 'l' and 'n')
- `accessibility` → `a11y` (11 letters between 'a' and 'y')

## Features

- ✅ **Unicode-safe**: Properly handles emoji, accented characters, and complex grapheme clusters
- ✅ **Multi-word support**: Process phrases with customizable separators
- ✅ **TypeScript**: Full type definitions included
- ✅ **Zero dependencies**: Uses native `Intl.Segmenter` API
- ✅ **Modern**: ESM format, works in Node.js 16+ and modern browsers

## Installation

```bash
npm install numeronym
```

## Usage

```typescript
import { toNumeronym } from "numeronym";

// Single words
toNumeronym("internationalization"); // 'i18n'
toNumeronym("localization"); // 'l10n'
toNumeronym("accessibility"); // 'a11y'
toNumeronym("kubernetes"); // 'k8s'

// Short words (3 characters or less) remain unchanged
toNumeronym("cat"); // 'cat'
toNumeronym("hi"); // 'hi'

// Multi-word phrases
toNumeronym("hello world"); // 'h3o w3d'
toNumeronym("internationalization localization"); // 'i18n l10n'

// Custom separator
toNumeronym("hello world", { separator: "-" }); // 'h3o-w3d'
toNumeronym("hello world", { separator: "_" }); // 'h3o_w3d'
toNumeronym("hello world", { separator: "" }); // 'h3ow3d'

// Transform option
toNumeronym("hello world", { transform: "capitalize" }); // 'H3o W3d'
toNumeronym("hello world", { transform: "uppercase" }); // 'H3O W3D'
toNumeronym("HELLO WORLD", { transform: "lowercase" }); // 'h3o w3d'

// minLength option
toNumeronym("the big word", { minLength: 4 }); // 'the big w2d'
toNumeronym("a big word", { minLength: 5 }); // 'a big word'

// Unicode support (emoji, accents, etc.)
toNumeronym("café"); // 'c2é'
toNumeronym("François"); // 'F6s'
toNumeronym("hello👋world"); // 'h9d'
toNumeronym("test🇺🇸end"); // 't6d'
```

## CLI Usage

You can use numeronym from the command line:

```bash
# Basic usage
npx numeronym "hello world"
# Output: h3o w3d

# With options
npx numeronym --transform uppercase "hello world"
# Output: H3O W3D

npx numeronym --separator "-" "hello world"
# Output: h3o-w3d

npx numeronym --min-length 4 "the big word"
# Output: the big w2d

# Combine options
npx numeronym -t capitalize -s "-" "hello world"
# Output: H3o-W3d

# Get help
npx numeronym --help

# Get version
npx numeronym --version
```

### CLI Options

- `-s, --separator <str>` - Separator between words (default: space)
- `-t, --transform <type>` - Transform case: `uppercase`, `lowercase`, or `capitalize`
- `-m, --min-length <num>` - Minimum word length to convert (default: 4)
- `-h, --help` - Show help message
- `-v, --version` - Show version

## Unicode Support

This library properly handles Unicode grapheme clusters, meaning it correctly counts what humans perceive as "characters" rather than UTF-16 code units. This includes:

- **Accented characters**: `café` → `c2é`, `naïve` → `n3e`
- **Emoji**: `hello👋world` → `h9d`, `test😀end` → `t6d`
- **Emoji with skin tones**: `👋🏽wave` → `👋🏽3e`
- **Flag emoji**: `test🇺🇸end` → `t6d`, `🇺🇸flag` → `🇺🇸3g`
- **Complex emoji**: `👨‍👩‍👧‍👦family` → `👨‍👩‍👧‍👦5y`

The library uses the native `Intl.Segmenter` API (available in Node.js 16+ and modern browsers) for accurate grapheme cluster segmentation.

```


## Development

### Project Structure

```

numeronym/
├── src/
│ ├── index.ts # Main export
│ └── **tests**/
│ └── index.test.ts # Test suite
├── examples/
│ └── demo.ts # Example usage
├── dist/ # Build output (generated)
├── tsconfig.json # TypeScript configuration
└── package.json # Project configuration

````

### Available Scripts

- **`npm run build`** - Build the project for production
- **`npm run dev`** - Watch mode for development (auto-rebuilds on changes)
- **`npm run typecheck`** - Type-check without building
- **`npm test`** - Run tests once
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run example`** - Run the example file

### Getting Started

1. **Install dependencies:**

   ```bash
   npm install
````

2. **Run tests:**

   ```bash
   npm test
   ```

3. **Try the example:**

   ```bash
   npm run example
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

### Development Workflow

1. Write your TypeScript code in `src/`
2. Run `npm run dev` to start the development watcher
3. Run `npm run test:watch` in another terminal for live testing
4. Use `npm run typecheck` to verify types
5. Build with `npm run build` when ready

## API

### `toNumeronym(input: string, options?: ToNumeronymOptions): string`

Converts a word or multi-word phrase into a numeronym.

A numeronym is a number-based word where the number represents the count of letters between the first and last letter.

**Parameters:**

- `input` - The word or phrase to convert
- `options` - Optional configuration object
  - `separator` - String to use between converted words in multi-word inputs (default: `' '`)
  - `transform` - Transform the case of the result: `'uppercase'`, `'lowercase'`, or `'capitalize'` (default: preserves original case)
  - `minLength` - Minimum word length to convert (default: `4`)

**Returns:**

- A numeronym string. Words with 3 or fewer characters are returned unchanged.

**Examples:**

```typescript
// Single words
toNumeronym("development"); // 'd9t'
toNumeronym("test"); // 't2t'
toNumeronym("hi"); // 'hi' (unchanged)

// Multi-word phrases
toNumeronym("hello world"); // 'h3o w3d'
toNumeronym("accessibility is important"); // 'a11y is i7t'

// Custom separators
toNumeronym("hello world", { separator: "-" }); // 'h3o-w3d'
toNumeronym("hello world", { separator: "" }); // 'h3ow3d'

// Transform option
toNumeronym("hello world", { transform: "capitalize" }); // 'H3o W3d'
toNumeronym("hello world", { transform: "uppercase" }); // 'H3O W3D'
toNumeronym("HELLO WORLD", { transform: "lowercase" }); // 'h3o w3d'

// minLength option
toNumeronym("the big word", { minLength: 4 }); // 'the big w2d'
toNumeronym("a big word", { minLength: 5 }); // 'a big word'
```

### `ToNumeronymOptions`

Configuration options for the `toNumeronym` function.

**Properties:**

- `separator?: string` - Separator to use between converted words in multi-word inputs (default: `' '`)
- `transform?: 'uppercase' | 'lowercase' | 'capitalize'` - Transform the case of the result (default: preserves original case)
- `minLength?: number` - Minimum word length to convert (default: `4`)

```

## License

ISC
```
