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

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", poem, "utf8");
