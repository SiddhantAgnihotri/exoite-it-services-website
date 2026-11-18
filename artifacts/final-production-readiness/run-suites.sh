#!/usr/bin/env bash
# Runs the existing browser suites for the final sprint. Suites that write to a fixed historical
# artifact folder are run with that folder backed up and restored, so earlier evidence is preserved;
# their fresh output is moved under artifacts/final-production-readiness/suites/<suite>/.
cd "$(dirname "$0")/../.." || exit 1
OUT=artifacts/final-production-readiness/suites
BK="${SCRATCH:-/tmp}/suite-backups"
mkdir -p "$OUT" "$BK"
summary="$OUT/summary.txt"; : > "$summary"

run_env() { # name script
  mkdir -p "$OUT/$1"
  QA_ARTIFACT_DIR="$OUT/$1" node "scripts/$2" > "$OUT/$1/run.log" 2>&1
  echo "$1 exit=$?" | tee -a "$summary"
}
run_fixed() { # name script artifactDir
  local name=$1 script=$2 dir=$3
  rm -rf "$BK/$name"; [ -d "$dir" ] && cp -r "$dir" "$BK/$name"
  mkdir -p "$OUT/$name"
  node "scripts/$script" > "$OUT/$name/run.log" 2>&1; local code=$?
  echo "$name exit=$code" | tee -a "$summary"
  if [ -d "$dir" ]; then cp -r "$dir"/. "$OUT/$name/output/" 2>/dev/null || { mkdir -p "$OUT/$name/output" && cp -r "$dir"/. "$OUT/$name/output/"; }; fi
  rm -rf "$dir"; [ -d "$BK/$name" ] && cp -r "$BK/$name" "$dir"
}

run_env critical premium-visual-refinement.browser.mjs
run_env interactions interaction-polish.browser.mjs
run_fixed routes production-routes.browser.mjs artifacts/production-fixes
run_fixed blockers production-blockers.browser.mjs artifacts/production-fixes
run_fixed homepage homepage-premium.browser.mjs artifacts/homepage-premium
run_fixed ai-services ai-services.browser.mjs artifacts/ai-services
run_fixed illustration-contrast illustration-contrast.browser.mjs artifacts/final-premium-review
echo done >> "$summary"
