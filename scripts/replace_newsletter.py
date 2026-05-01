#!/usr/bin/env python3
"""Replace hardcoded Mailchimp signup blocks in posts with a Liquid include.

Usage:
    python3 scripts/replace_newsletter.py [--dry-run]

Walks `_blog`, `_visualizations`, `_tips` and rewrites every matching block
with `{% include newsletter.html %}`. Idempotent: if a file no longer contains
the hardcoded block, it is left untouched.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET_DIRS = ["_blog", "_visualizations", "_tips"]
INCLUDE_TAG = "{% include newsletter.html %}"

# The hardcoded Mailchimp block opens with one of these <link ...> tags
# (sometimes only one of them is present) and closes with the </div> that
# terminates the #mc_embed_signup wrapper.
BLOCK_PATTERN = re.compile(
    r"""
    (?:[ \t]*<link\s+href=["']//cdn-images\.mailchimp\.com/embedcode/[^>]*>\s*)?  # optional CDN link
    (?:[ \t]*<link\s+href=["']/assets/css/mailchimp\.css["'][^>]*>\s*)?            # optional local link
    [ \t]*<div\s+id=["']mc_embed_signup["'][^>]*>     # opening wrapper
    .*?                                               # form body
    </form>\s*</div>                                  # closing wrapper
    """,
    re.DOTALL | re.VERBOSE,
)


def process_file(path: Path, dry_run: bool) -> int:
    """Return the number of replacements made in `path`."""
    text = path.read_text(encoding="utf-8")
    new_text, n = BLOCK_PATTERN.subn(INCLUDE_TAG, text)
    if n == 0:
        return 0
    if not dry_run:
        path.write_text(new_text, encoding="utf-8")
    return n


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="report what would change without writing files",
    )
    args = parser.parse_args()

    total_files = 0
    total_replacements = 0
    for rel_dir in TARGET_DIRS:
        directory = ROOT / rel_dir
        if not directory.is_dir():
            continue
        for path in sorted(directory.iterdir()):
            if path.suffix.lower() not in {".html", ".md"}:
                continue
            n = process_file(path, dry_run=args.dry_run)
            if n:
                total_files += 1
                total_replacements += n
                print(f"{path.relative_to(ROOT)}: {n} replacement(s)")

    suffix = " (dry run)" if args.dry_run else ""
    print(
        f"\nTotal: {total_replacements} replacement(s) across "
        f"{total_files} file(s){suffix}."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
