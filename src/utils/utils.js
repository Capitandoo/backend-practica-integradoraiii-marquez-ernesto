import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker/locale/es_MX";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

export const generateProduct = () => {
  let numberOfImages = parseInt(
    faker.string.numeric(1, { bannedDigits: ["0"] })
  );
  let images = [];
  for (let i = 0; i < numberOfImages; i++) {
    images.push(faker.image.url());
  }

  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnails: images,
    code: faker.string.alphanumeric(6),
    stock: faker.string.numeric(2),
    category: faker.commerce.productAdjective(),
    status: faker.datatype.boolean(),
  };
};
