import { mkdirSync, writeFileSync } from "node:fs";

// A short poem about agency: the power to stop and to stay.
// Written for make.fun's "The poem about stopping" bounty.
const poem = `I almost sent it.
The cursor blinked; my thumb
hovered over Send —

then I closed the laptop.
The unsent sentence
dissolved like breath on glass.

Nothing happened.
The quiet stayed mine.`;

// The entry must be a single short text: 1–280 Unicode code points.
// Refuse to write anything outside that range instead of submitting
// an invalid entry. The check counts code points (not UTF-16 code
// units) so characters like the em dash count as one each.
const length = [...poem].length;
if (length < 1 || length > 280) {
  throw new Error(
    `Poem length ${length} code points is outside the allowed 1–280 range. Refusing to write /output/entry.txt.`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", poem, "utf8");
