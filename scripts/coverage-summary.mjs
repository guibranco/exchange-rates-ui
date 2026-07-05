import { readFileSync } from 'node:fs';

const summaryPath = 'coverage/coverage-summary.json';
const summary = JSON.parse(readFileSync(summaryPath, 'utf8'));
const { total } = summary;

const metrics = [
  ['Statements', total.statements],
  ['Branches', total.branches],
  ['Functions', total.functions],
  ['Lines', total.lines],
];

const rows = metrics
  .map(([name, m]) => `| ${name} | ${m.pct.toFixed(2)}% | ${m.covered}/${m.total} |`)
  .join('\n');

process.stdout.write(
  `## Coverage report\n\n| Metric | % | Covered/Total |\n| --- | --- | --- |\n${rows}\n`,
);
