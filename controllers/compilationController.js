const fs = require("fs");
const path = require("path");
const short = require("short-uuid");
const executeJava = require("../utils/executeJava");
const extension = require("../utils/extensions");

const compile = async (req, res, next) => {
  try {
    const { language, script, stdIn } = req.body;
    const codesDir = path.join(__dirname, "..", "/codes");
    const fileName = `${short
      .generate()
      .replace(/-/g, "")
      .replace(/[0-9]/g, "A")}${extension(language)}`;

    if (!fs.existsSync(codesDir)) {
      fs.mkdirSync(codesDir);
    }

    const codeFilePath = path.join(codesDir, fileName);

    await fs.writeFileSync(codeFilePath, script, (err) => {
      console.error(err);
      return;
    });

    const data = fs.readFileSync(codeFilePath);
    const fd = fs.openSync(codeFilePath, "w+");
    const insert = Buffer.from(
      `public class ${path.basename(codeFilePath).split(".")[0]} { \n`
    );
    fs.writeSync(fd, insert, 0, insert.length, 0);
    fs.writeSync(fd, data, 0, data.length, insert.length);
    fs.close(fd, (err) => {
      if (err) throw err;
    });

    fs.appendFileSync(codeFilePath, "\n}", (err) => {
      if (err) throw err;
    });

    const output = await executeJava(codeFilePath);

    res.status(200).json({
      status: "success",
      output,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

module.exports = compile;
