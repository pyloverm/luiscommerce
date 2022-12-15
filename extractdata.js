const fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
  return sqlite.open({
    filename: './productdb.sqlite',
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await openDb();
  var dict = {};
  dict['familia'] = {};
  const familyss = await db.all('SELECT DISTINCT familia FROM products');
  for (let i = 0; i < familyss.length; i++) {
    let family = familyss[i]['familia'];
    dict['familia'][family] = {}
    dict['familia'][family]['subfamilia'] = {}
    let subfamilys = await db.all(('WITH tab1 AS(SELECT * FROM products WHERE familia like "%').concat(family,'%") SELECT DISTINCT subFamilia  FROM tab1  ORDER BY subFamilia ASC'));
    for (let y = 0; y < subfamilys.length; y++) {
        let subfamily = subfamilys[y]['subFamilia']
        dict['familia'][family]['subfamilia'][subfamily] = {}
        dict['familia'][family]['subfamilia'][subfamily]['categoria'] = {}
        let categories = await db.all(('WITH tab1 AS(SELECT * FROM products WHERE subfamilia like "%').concat(subfamily,'%") SELECT DISTINCT Categoria FROM tab1  ORDER BY Categoria ASC'));
        for (let z = 0; z < categories.length; z++) {
            let categorie = categories[z]['Categoria']
            dict['familia'][family]['subfamilia'][subfamily]['categoria'][categorie] = {};
            dict['familia'][family]['subfamilia'][subfamily]['categoria'][categorie]['subcategoria'] = {};
            let subcategories = await db.all(('WITH tab1 AS(SELECT * FROM products WHERE Categoria like "%').concat(categorie,'%") SELECT DISTINCT subCategoria FROM tab1  ORDER BY subCategoria ASC'));
            for (let x = 0; x < subcategories.length; x++) {
                let subcategorie = subcategories[x]['subCategoria'];
                let products = await db.all(('SELECT * FROM products WHERE subCategoria like "%').concat(subcategorie,'%"'));
                dict['familia'][family]['subfamilia'][subfamily]['categoria'][categorie]['subcategoria'][subcategorie] = {};
            }
        }
    }
  }
  return dict
}
async function main(){
  const dict = await setup()
  // Save the data to a file as JSON
  fs.writeFileSync('./src/arbo.json', JSON.stringify(dict));
}

main()