const annotations = ["TODO", "HACK", "XXX", "FIXME"];
const annotationsRe = /^(\s*)((todo)|(hack)|(xxx)|(fixme))/i;

module.exports = {
  annotations,
  annotationsRe,
};
