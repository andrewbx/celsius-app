const execSync = require("child_process").execSync;
const args = require("yargs").parse();
// const Constants = require("./celsius-app-creds/production/constants").default
const ENV = args.env.toUpperCase();

const codePushChannels = {
  BETA: "Beta",
  BETA_STORYBOOK: "Beta-Storybook",
  // PRODUCTION: Constants.CLIENT_VERSION,
};

execSync(`yarn set:env --env=${ENV}`, { encoding: "utf-8", stdio: "inherit" });

// eslint-disable-next-line no-console
console.log(`Starting codepush to ${codePushChannels[ENV]} iOS channel`);
execSync(
  `appcenter codepush release-react -a celsius-network/celsius -d ${codePushChannels[ENV]}`,
  { encoding: "utf-8", stdio: "inherit" }
);

// eslint-disable-next-line no-console
console.log(`Starting codepush to ${codePushChannels[ENV]} Android channel`);
execSync(
  `appcenter codepush release-react -a celsius-network/celsius-1 -d ${codePushChannels[ENV]}`,
  { encoding: "utf-8", stdio: "inherit" }
);
