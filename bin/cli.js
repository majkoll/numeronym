#!/usr/bin/env node

import { toNumeronym } from "../dist/index.js";

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
numeronym - Generate numeronyms from words

Usage:
  numeronym [options] <text>
  numeronym <text> [options]

Arguments:
  <text>                Text to convert to numeronym

Options:
  -s, --separator <str> Separator between words (default: space)
  -t, --transform <type> Transform case: uppercase, lowercase, capitalize
  -m, --min-length <num> Minimum word length to convert (default: 4)
  -h, --help            Show this help message
  -v, --version         Show version

Examples:
  numeronym "hello world"
  numeronym "internationalization"
  numeronym "hello world" --transform uppercase
  numeronym --transform uppercase "hello world"
  numeronym "hello world" --separator "-"
  numeronym "the big word" --min-length 4
  numeronym "hello world" -t capitalize -s "-"
`);
}

function printVersion() {
  // Read version from package.json
  console.log("1.0.0");
}

if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
  printHelp();
  process.exit(0);
}

if (args.includes("-v") || args.includes("--version")) {
  printVersion();
  process.exit(0);
}

// Parse options and text separately
const options = {};
const textParts = [];

let i = 0;
while (i < args.length) {
  const arg = args[i];

  if (arg === "-s" || arg === "--separator") {
    if (!args[i + 1]) {
      console.error(`Error: --separator requires a value`);
      process.exit(1);
    }
    options.separator = args[i + 1];
    i += 2;
  } else if (arg === "-t" || arg === "--transform") {
    if (!args[i + 1]) {
      console.error(`Error: --transform requires a value`);
      process.exit(1);
    }
    const transform = args[i + 1];
    if (!["uppercase", "lowercase", "capitalize"].includes(transform)) {
      console.error(
        `Error: Invalid transform type "${transform}". Must be: uppercase, lowercase, or capitalize`,
      );
      process.exit(1);
    }
    options.transform = transform;
    i += 2;
  } else if (arg === "-m" || arg === "--min-length") {
    if (!args[i + 1]) {
      console.error(`Error: --min-length requires a value`);
      process.exit(1);
    }
    const minLength = parseInt(args[i + 1], 10);
    if (isNaN(minLength) || minLength < 1) {
      console.error(
        `Error: Invalid min-length "${args[i + 1]}". Must be a positive number`,
      );
      process.exit(1);
    }
    options.minLength = minLength;
    i += 2;
  } else if (arg.startsWith("-")) {
    console.error(`Error: Unknown option "${arg}"`);
    console.error("Use --help to see available options");
    process.exit(1);
  } else {
    // This is part of the text
    textParts.push(arg);
    i++;
  }
}

const text = textParts.join(" ");

if (!text) {
  console.error("Error: No text provided");
  console.error("Usage: numeronym [options] <text>");
  process.exit(1);
}

try {
  const result = toNumeronym(text, options);
  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
