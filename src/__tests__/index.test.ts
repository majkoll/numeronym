import { describe, it, expect } from "vitest";
import { toNumeronym } from "../index.js";

describe("toNumeronym", () => {
  it("should convert long words to numeronyms", () => {
    expect(toNumeronym("internationalization")).toBe("i18n");
    expect(toNumeronym("localization")).toBe("l10n");
    expect(toNumeronym("accessibility")).toBe("a11y");
    expect(toNumeronym("kubernetes")).toBe("k8s");
    expect(toNumeronym("observability")).toBe("o11y");
  });

  it("should return short words unchanged (3 characters or less)", () => {
    expect(toNumeronym("hi")).toBe("hi");
    expect(toNumeronym("cat")).toBe("cat");
    expect(toNumeronym("a")).toBe("a");
    expect(toNumeronym("ab")).toBe("ab");
  });

  it("should handle 4-character words", () => {
    expect(toNumeronym("test")).toBe("t2t");
    expect(toNumeronym("code")).toBe("c2e");
  });

  it("should handle edge cases", () => {
    expect(toNumeronym("word")).toBe("w2d");
    expect(toNumeronym("development")).toBe("d9t");
  });

  it("should preserve case of first and last characters", () => {
    expect(toNumeronym("Internationalization")).toBe("I18n");
    expect(toNumeronym("KUBERNETES")).toBe("K8S");
  });

  it("should handle empty string", () => {
    expect(toNumeronym("")).toBe("");
  });

  describe("multi-word support", () => {
    it("should convert multi-word phrases with default separator", () => {
      expect(toNumeronym("hello world")).toBe("h3o w3d");
      expect(toNumeronym("internationalization localization")).toBe(
        "i18n l10n",
      );
      expect(toNumeronym("accessibility is important")).toBe("a11y is i7t");
    });

    it("should handle multiple spaces between words", () => {
      expect(toNumeronym("hello   world")).toBe("h3o w3d");
      expect(toNumeronym("one  two  three")).toBe("one two t3e");
    });

    it("should convert phrases with custom separator", () => {
      expect(toNumeronym("hello world", { separator: "-" })).toBe("h3o-w3d");
      expect(toNumeronym("hello world", { separator: "_" })).toBe("h3o_w3d");
      expect(
        toNumeronym("internationalization localization", { separator: " | " }),
      ).toBe("i18n | l10n");
    });

    it("should handle empty separator", () => {
      expect(toNumeronym("hello world", { separator: "" })).toBe("h3ow3d");
    });

    it("should preserve case in multi-word phrases", () => {
      expect(toNumeronym("Hello World")).toBe("H3o W3d");
      expect(toNumeronym("HELLO WORLD")).toBe("H3O W3D");
    });

    it("should handle mix of short and long words", () => {
      expect(toNumeronym("hi internationalization")).toBe("hi i18n");
      expect(toNumeronym("a big word")).toBe("a big w2d");
    });
  });

  describe("transform option", () => {
    it("should capitalize words when transform is 'capitalize'", () => {
      expect(toNumeronym("hello", { transform: "capitalize" })).toBe("H3o");
      expect(
        toNumeronym("internationalization", { transform: "capitalize" }),
      ).toBe("I18n");
      expect(toNumeronym("test", { transform: "capitalize" })).toBe("T2t");
    });

    it("should uppercase words when transform is 'uppercase'", () => {
      expect(toNumeronym("hello", { transform: "uppercase" })).toBe("H3O");
      expect(
        toNumeronym("internationalization", { transform: "uppercase" }),
      ).toBe("I18N");
      expect(toNumeronym("test", { transform: "uppercase" })).toBe("T2T");
    });

    it("should lowercase words when transform is 'lowercase'", () => {
      expect(toNumeronym("HELLO", { transform: "lowercase" })).toBe("h3o");
      expect(toNumeronym("Hello", { transform: "lowercase" })).toBe("h3o");
      expect(
        toNumeronym("INTERNATIONALIZATION", { transform: "lowercase" }),
      ).toBe("i18n");
    });

    it("should preserve original case when no transform provided", () => {
      expect(toNumeronym("hello")).toBe("h3o");
      expect(toNumeronym("Hello")).toBe("H3o");
      expect(toNumeronym("HELLO")).toBe("H3O");
    });

    it("should transform multi-word phrases", () => {
      expect(toNumeronym("hello world", { transform: "capitalize" })).toBe(
        "H3o W3d",
      );
      expect(toNumeronym("hello world", { transform: "uppercase" })).toBe(
        "H3O W3D",
      );
      expect(toNumeronym("HELLO WORLD", { transform: "lowercase" })).toBe(
        "h3o w3d",
      );
    });

    it("should transform short words", () => {
      expect(toNumeronym("hi", { transform: "capitalize" })).toBe("Hi");
      expect(toNumeronym("cat", { transform: "uppercase" })).toBe("CAT");
      expect(toNumeronym("DOG", { transform: "lowercase" })).toBe("dog");
    });

    it("should transform words with accents", () => {
      expect(toNumeronym("café", { transform: "capitalize" })).toBe("C2é");
      expect(toNumeronym("josé", { transform: "uppercase" })).toBe("J2É");
      expect(toNumeronym("CAFÉ", { transform: "lowercase" })).toBe("c2é");
    });

    it("should work with transform and custom separator", () => {
      expect(
        toNumeronym("hello world", { transform: "capitalize", separator: "-" }),
      ).toBe("H3o-W3d");
      expect(
        toNumeronym("hello world", { transform: "uppercase", separator: "_" }),
      ).toBe("H3O_W3D");
    });
  });

  describe("minLength option", () => {
    it("should respect custom minLength", () => {
      expect(toNumeronym("the big word", { minLength: 4 })).toBe("the big w2d");
      expect(toNumeronym("a big word", { minLength: 5 })).toBe("a big word");
      expect(toNumeronym("hello world", { minLength: 6 })).toBe("hello world");
    });

    it("should use default minLength of 4", () => {
      expect(toNumeronym("cat")).toBe("cat"); // 3 chars, unchanged
      expect(toNumeronym("test")).toBe("t2t"); // 4 chars, converted
      expect(toNumeronym("hello")).toBe("h3o"); // 5 chars, converted
    });

    it("should work with minLength of 1 (convert everything 2+ chars)", () => {
      expect(toNumeronym("a", { minLength: 1 })).toBe("a"); // 1 char, can't make numeronym
      expect(toNumeronym("hi", { minLength: 1 })).toBe("hi"); // 2 chars, no middle
      expect(toNumeronym("cat", { minLength: 1 })).toBe("c1t"); // 3 chars, converts
      expect(toNumeronym("test", { minLength: 1 })).toBe("t2t"); // 4 chars, converts
    });

    it("should work with large minLength", () => {
      expect(toNumeronym("hello world", { minLength: 10 })).toBe("hello world");
      expect(toNumeronym("internationalization", { minLength: 10 })).toBe(
        "i18n",
      );
    });

    it("should combine with transform option", () => {
      expect(
        toNumeronym("the big word", {
          minLength: 4,
          transform: "uppercase",
        }),
      ).toBe("THE BIG W2D");
    });

    it("should work with Unicode and emoji", () => {
      expect(toNumeronym("café hi", { minLength: 5 })).toBe("café hi");
      expect(toNumeronym("café hello", { minLength: 5 })).toBe("café h3o");
    });
  });

  describe("Unicode and emoji support", () => {
    it("should handle accented characters correctly", () => {
      expect(toNumeronym("café")).toBe("c2é");
      expect(toNumeronym("naïve")).toBe("n3e");
      expect(toNumeronym("résumé")).toBe("r4é");
      expect(toNumeronym("François")).toBe("F6s");
      expect(toNumeronym("Zoë")).toBe("Zoë");
      expect(toNumeronym("Noël")).toBe("N2l");
      expect(toNumeronym("Müller")).toBe("M4r");
      expect(toNumeronym("José")).toBe("J2é");
    });

    it("should handle emoji correctly", () => {
      expect(toNumeronym("hello👋world")).toBe("h9d");
      expect(toNumeronym("test😀end")).toBe("t6d");
      expect(toNumeronym("👋wave")).toBe("👋3e");
      expect(toNumeronym("wave👋")).toBe("w3👋");
    });

    it("should handle emoji with skin tones", () => {
      expect(toNumeronym("hello👋🏽world")).toBe("h9d");
      expect(toNumeronym("👋🏽wave")).toBe("👋🏽3e");
    });

    it("should handle flag emoji", () => {
      expect(toNumeronym("test🇺🇸end")).toBe("t6d");
      expect(toNumeronym("🇺🇸flag")).toBe("🇺🇸3g");
    });

    it("should handle complex emoji (family, etc)", () => {
      expect(toNumeronym("👨‍👩‍👧‍👦family")).toBe("👨‍👩‍👧‍👦5y");
      expect(toNumeronym("test👨‍👩‍👧‍👦end")).toBe("t6d");
    });

    it("should handle multi-word with emoji", () => {
      expect(toNumeronym("hello👋 world🌍")).toBe("h4👋 w4🌍");
      expect(toNumeronym("test 👋 end")).toBe("t2t 👋 end");
    });
  });
});
