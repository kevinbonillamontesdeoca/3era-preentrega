const fs = require("fs");
class ProductManager {
  constructor(path) {
    this.path = path;
    this.id = 0;
  }
  async getProducts() {
    if (!fs.existsSync(this.path)) {
      fs.promises.writeFile(
        this.path,
        JSON.stringify(
          {
            id: 1,
            title: "prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc123",
            stock: 15,
          },
          {
            id: 2,
            title: "prueba 2",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc124",
            stock: 15,
          },
          {
            id: 3,
            title: "prueba 3",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc125",
            stock: 15,
          },
          {
            id: 4,
            title: "prueba 4",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc126",
            stock: 15,
          }
        ),
        "utf-8"
      );
    }
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    console.log(`Productos: ${readFile}`);
    return readFile;
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, JSON.stringify([]), "utf-8");
    }
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    let readProduct = JSON.parse(readFile);
    this.id++;
    const newProduct = {
      id: this.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const existingProduct = readProduct.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.error(`Error: Existe un producto con el código ${code}`);
    } else {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Error: Los campos son obligatorios.");
      } else {
        readProduct.push(newProduct);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(readProduct),
          "utf-8"
        );
        console.log(await fs.promises.readFile(this.path, "utf-8"));
      }
    }
  }
  async getProductById(id) {
    if (!fs.existsSync(this.path)) {
      fs.promises.writeFile(
        this.path,
        JSON.stringify(
          {
            id: 1,
            title: "prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc123",
            stock: 15,
          },
          {
            id: 2,
            title: "prueba 2",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc124",
            stock: 15,
          },
          {
            id: 3,
            title: "prueba 3",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc125",
            stock: 15,
          },
          {
            id: 4,
            title: "prueba 4",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "No imagen",
            code: "abc126",
            stock: 15,
          }
        ),
        "utf-8"
      );
    }
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    let readProduct = JSON.parse(readFile);
    const idProduct = readProduct.find((product) => product.id === id);
    if (idProduct) {
      console.log(idProduct);
      return idProduct;
    } else {
      console.error("No existe producto con el ID");
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    if (!fs.existsSync(this.path)) {
      fs.promises.writeFile(this.path, JSON.stringify([]), "utf-8");
    }
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    let readProduct = JSON.parse(readFile);
    const idProduct = readProduct.find((product) => product.id === id);
    const indexProduct = readProduct.indexOf(idProduct);
    const editedProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (indexProduct > -1) {
      readProduct.splice(indexProduct, 1, editedProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(readProduct),
        "utf-8"
      );
    }
  }
  async deleteProduct(id) {
    if (!fs.existsSync(this.path)) {
      fs.promises.writeFile(this.path, JSON.stringify([]), "utf-8");
    }
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    let readProduct = JSON.parse(readFile);
    const idProduct = readProduct.find((product) => product.id === id);
    const indexProduct = readProduct.indexOf(idProduct);
    if (indexProduct > -1) {
      readProduct.splice(indexProduct, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(readProduct),
        "utf-8"
      );
      console.log("Se elimino con éxito");
    } else {
      console.error("No existe producto con el ID");
    }
  }
}
module.exports = ProductManager;
