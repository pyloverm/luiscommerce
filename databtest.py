from pocketbase import PocketBase

pb = PocketBase('https://poor-camera.pockethost.io');

data = {
    "ref": "test2",
    "date": "2022-01-01 10:00:00.123Z",
    "ean": "hqsiufhqsidfh",
    "nome": "test",
    "marca": "test",
    "resumo": "test",
    "descricao": "test",
    "familia": "test",
    "subfamilia": "test",
    "preco": "test",
    "imagem": "https://example.com",
    "categoria": "test",
    "subcategoria": "test"
},{
    "ref": "test23",
    "date": "2022-01-01 10:00:00.123Z",
    "ean": "hqsiufhqsidfh",
    "nome": "test",
    "marca": "test",
    "resumo": "test",
    "descricao": "test",
    "familia": "test",
    "subfamilia": "test",
    "preco": "test",
    "imagem": "https://example.com",
    "categoria": "test",
    "subcategoria": "test"
};
for d in data:
    try:
        pb.records.create("products",d)
    except:
        print('already in !')
    result = pb.records.get_full_list(
        "products", 20
    )


for i in result:
    print(i.id)
