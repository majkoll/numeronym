import { toNumeronym } from "../src/index.js";

console.log("Numeronym Examples:");
console.log("-------------------");
console.log(`internationalization -> ${toNumeronym("internationalization")}`); // i18n
console.log(`localization -> ${toNumeronym("localization")}`); // l10n
console.log(`accessibility -> ${toNumeronym("accessibility")}`); // a11y
console.log(`kubernetes -> ${toNumeronym("kubernetes")}`); // k8s
console.log(`observability -> ${toNumeronym("observability")}`); // o11y

// Short words remain unchanged
console.log(`\nShort words:`);
console.log(`cat -> ${toNumeronym("cat")}`); // cat
console.log(`hi -> ${toNumeronym("hi")}`); // hi

// Multi-word support
console.log(`\nMulti-word phrases:`);
console.log(`hello world -> ${toNumeronym("hello world")}`); // h3o w3d
console.log(
  `internationalization localization -> ${toNumeronym("internationalization localization")}`,
); // i18n l10n
console.log(
  `accessibility is important -> ${toNumeronym("accessibility is important")}`,
); // a11y is i7t

// Custom separator
console.log(`\nWith custom separators:`);
console.log(
  `hello world (separator: "-") -> ${toNumeronym("hello world", { separator: "-" })}`,
); // h3o-w3d
console.log(
  `hello world (separator: "_") -> ${toNumeronym("hello world", { separator: "_" })}`,
); // h3o_w3d
console.log(
  `hello world (separator: "") -> ${toNumeronym("hello world", { separator: "" })}`,
); // h3ow3d

// Unicode support (accented characters and emoji)
console.log(`\nUnicode support (names with accents):`);
console.log(`Zoë -> ${toNumeronym("Zoë")}`); // Zoë (3 chars, unchanged)
console.log(`Noël -> ${toNumeronym("Noël")}`); // N2l
console.log(`üller -> ${toNumeronym("üller")}`); // ü3r
console.log(`François -> ${toNumeronym("François")}`); // F6s
console.log(`José -> ${toNumeronym("José")}`); // J2é

console.log(`\nUnicode support (emoji):`);
console.log(`hello👋world -> ${toNumeronym("hello👋world")}`); // h9d
console.log(`test🇺🇸end -> ${toNumeronym("test🇺🇸end")}`); // t6d

// Transform option
console.log(`\nWith transform option:`);
console.log(
  `hello world (transform: "capitalize") -> ${toNumeronym("hello world", { transform: "capitalize" })}`,
); // H3o W3d
console.log(
  `hello world (transform: "uppercase") -> ${toNumeronym("hello world", { transform: "uppercase" })}`,
); // H3O W3D
console.log(
  `HELLO WORLD (transform: "lowercase") -> ${toNumeronym("HELLO WORLD", { transform: "lowercase" })}`,
); // h3o w3d
console.log(
  `josé (transform: "capitalize") -> ${toNumeronym("josé", { transform: "capitalize" })}`,
); // J2é
console.log(
  `CAFÉ (transform: "lowercase") -> ${toNumeronym("CAFÉ", { transform: "lowercase" })}`,
); // c2é
