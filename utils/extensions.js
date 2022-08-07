const extension = (language) => {
  switch (language) {
    case "java":
      return ".java";
      break;
    case "python3":
      return ".py";
      break;
    case "cpp":
      return ".cpp";
      break;
    case "c":
      return ".c";
      break;
    case "nodejs":
      return ".js";
  }
};

module.exports = extension;
