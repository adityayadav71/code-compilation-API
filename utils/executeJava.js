const { exec } = require("child_process");
const path = require("path");

const executeJava = (compile, filePath) => {
  const jobId = path.basename(filePath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(`javac ${filePath}`, (err, stdout, stderr) => {
      err && reject({ err, stderr });
      stderr && reject(stderr);
      resolve(stdout);
    });
  });
};

module.exports = executeJava;
