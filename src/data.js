import content from "./data.json";


export function getFamilias() {
    var obj = JSON.parse(content);
    var query = obj.Produtos;
    var test = query[1];
    console.log(test);
    return test;
  }