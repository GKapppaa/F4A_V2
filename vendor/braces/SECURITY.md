# Local security patch

This directory vendors the MIT-licensed `braces` 3.0.3 package. F4A adds a maximum brace nesting depth of 100 in `lib/parse.js` to mitigate CVE-2026-93687 while the upstream advisory has no patched release. The package is used by Karma's test file watcher, not by the production application.

The root dependency overrides point `braces` to this local copy and `chokidar` to 4.0.3. Keep the upstream license and replace this local patch with an official fixed release when one is available. Re-check both `npm audit` and `pnpm audit` after changing overrides.
