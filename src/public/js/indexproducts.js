const socketClient = io();


const form = document.getElementById("form");
const inputID = document.getElementById("id");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputThumbnail = document.getElementById("thumbnail");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputStatus = document.getElementById("status");
const inputCategory = document.getElementById("category");
const productos = document.getElementById("productos");
const btnerase = document.getElementById("erase");
const btnadd = document.getElementById("add");
const btnmostrar = document.getElementById("mostrar");

btnadd.addEventListener("click", (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescription.value;
  const price = inputPrice.value;
  const thumbnail = inputThumbnail.value;
  const code = inputCode.value;
  const stock = inputStock.value;
  const status = inputStatus.value;
  const category = inputCategory.value;
  socketClient.emit("newProduct", {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  });
});

btnerase.addEventListener("click", (e) => {
  e.preventDefault();
  const id = inputID.value;
  socketClient.emit("erase", parseInt(id));
});

btnmostrar.addEventListener("click", (e) => {
  e.preventDefault();
  socketClient.emit("mostrar");
});

socketClient.on("arrayProductsAdd", (productAddNew) => {
  const productoRender = productAddNew
    .map((prod) => {
      return `<p> ID: ${Number(prod._id)} - TITULO: ${prod.title} - DESCRIPTION: ${prod.description} - PRICE: ${prod.price} - THUMBNAIL: ${prod.thumbnail} - CODE: ${prod.code} - STOCK: ${prod.stock} - STATUS: ${prod.status} - CATEGORY:${prod.category} </p>`;
    })
    .join("");
  productos.innerHTML = productoRender;
});

socketClient.on("arrayProductsErase", (productAddNew) => {
  const productoRender = productAddNew
    .map((prod) => {
      return `<p> ID: ${Number(prod._id)} - TITULO: ${prod.title} - DESCRIPTION: ${prod.description} - PRICE: ${prod.price} - THUMBNAIL: ${prod.thumbnail} - CODE: ${prod.code} - STOCK: ${prod.stock} - STATUS: ${prod.status} - CATEGORY:${prod.category} </p>`;
    })
    .join("");
  productos.innerHTML = productoRender;
});

socketClient.on("mostrar", (lista) => {
  const productoRender = lista
    .map((prod) => {
      return `<p> ID: ${prod._id} - TITULO: ${prod.title} - DESCRIPTION: ${prod.description} - PRICE: ${prod.price} - THUMBNAIL: ${prod.thumbnail} - CODE: ${prod.code} - STOCK: ${prod.stock} - STATUS: ${prod.status} - CATEGORY:${prod.category} </p>`;
    })
    .join("");
  productos.innerHTML = productoRender;
});
