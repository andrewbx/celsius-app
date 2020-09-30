const execSync = require("child_process").execSync;
const args = require("yargs").parse();

const ENV = args.env.toUpperCase();

execSync(`yarn set:env --env=${ENV}`, { encoding: "utf-8" });

// output.stdout.on('data', (data) => {
//   // eslint-disable-next-line no-console
//   console.log(`stdout: ${data}`);
// });

// output.stderr.on('data', (data) => {
//   // eslint-disable-next-line no-console
//   console.error(`stderr: ${data}`);
// });

// output.on('close', (code) => {
//   // eslint-disable-next-line no-console
//   console.log(`child process exited with code ${code}`);
// });
