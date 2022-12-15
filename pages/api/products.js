const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
import arbo from "../../src/arbo.json"


async function openDb() {
  return sqlite.open({
    filename: './productdb.sqlite',
    driver: sqlite3.Database,
  });
}

export async function getData() {
  const db = await openDb();
  const teste = await db.all('SELECT *  FROM products WHERE ref like "%001.A.XF384B10%" ORDER BY familia')
  const response =  teste[0]
  return response
}

export default async function handler(req, res) {
  const db = await openDb();
  switch (req.query.type) {
    case 'familias':
      const familys = await db.all('SELECT DISTINCT familia FROM products');
      res.json(JSON.stringify(familys,null,2));
      break;
    case 'subfamilias':
      const subfamilys = await db.all(('WITH tab1 AS(SELECT * FROM products WHERE familia like "%').concat(req.query.familia,'%") SELECT DISTINCT subFamilia  FROM tab1  ORDER BY subFamilia ASC'));
      res.json(JSON.stringify(subfamilys,null,2));
      break;
    case 'categorias':
      const categorias = await db.all(('WITH tab1 AS(SELECT * FROM products WHERE subfamilia like "%').concat(req.query.subfamilia,'%") SELECT DISTINCT Categoria FROM tab1  ORDER BY Categoria ASC'));
      res.json(JSON.stringify(categorias,null,2));
      break;
    case 'subcategorias':
      const subcategorias = await db.all(('WITH tab1 AS(SELECT * FROM products WHERE Categoria like "%').concat(req.query.categoria,'%") SELECT DISTINCT subCategoria FROM tab1  ORDER BY subCategoria ASC'));
      res.json(JSON.stringify(subcategorias,null,2));
      break;
    case 'products_by_category':
      const productsByCategory = await db.all(('SELECT * FROM products WHERE Categoria like "%').concat(req.query.categoria,'%"'));
      res.json(JSON.stringify(productsByCategory,null,2));
      break;
    case 'products_by_subCategory':
      const products_by_subCategory = await db.all(('SELECT * FROM products WHERE subCategoria like "%').concat(req.query.subCategoria,'%"'));
      res.json(JSON.stringify(products_by_subCategory,null,2));
      break;
    case 'all':
      res.json(JSON.stringify(arbo,null,2))
      break
    case 'test':
      const teste = await db.all('SELECT *  FROM products WHERE ref like "%001.A.XF384B10%" ORDER BY familia')
      res.json(JSON.stringify(teste,null,2))
      break;
    case 'all_pro':
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
      }res.json(JSON.stringify(dict,null,2));
      break
    default:
      res.json('{"none"}');
  }  
}