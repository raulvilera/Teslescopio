import { readFile, mkdir, writeFile } from 'node:fs/promises';

const rosterFiles = [
  ['8º Ano A', '/home/ubuntu/roster_8A.json'],
  ['8º Ano B', '/home/ubuntu/roster_8B.json'],
];

const groups = [];
for (const [grade, pathname] of rosterFiles) {
  const raw = JSON.parse(await readFile(pathname, 'utf8'));
  const students = (raw.values ?? [])
    .slice(4)
    .filter((row) => row?.[0]?.trim() && row?.[1]?.trim())
    .map((row) => ({ number: String(row[0]).trim(), name: String(row[1]).trim() }));
  groups.push({ grade, students });
}

await mkdir('/home/ubuntu/atividade-ciencias-8ano/client/src/data', { recursive: true });
const content = `/** Lista original de alunos usada pela atividade. */\nexport const studentGroups = ${JSON.stringify(groups, null, 2)} as const;\n`;
await writeFile('/home/ubuntu/atividade-ciencias-8ano/client/src/data/students.ts', content, 'utf8');
console.log(`Listas preparadas: ${groups.map((group) => `${group.grade}: ${group.students.length}`).join(' · ')}`);
