import { execSync } from "child_process";
import gitStatus from "git-status";
import shell from "shelljs";

const checkForChanges = (): boolean => {
  const status = gitStatus();
  return status.some((file) => file.working !== " ");
};

const runVersioning = () => {
  try {
    if (checkForChanges()) {
      const currentVersion = require("../package.json").version;
      const betaVersion = `${currentVersion}-beta`;
      shell.sed(
        "-i",
        `"version": "${currentVersion}"`,
        `"version": "${betaVersion}"`,
        "package.json"
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runVersioning();
