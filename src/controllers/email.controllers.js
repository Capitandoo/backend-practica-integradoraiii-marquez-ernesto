import { transporter } from "../services/email.services.js";
import config from "../../config.js";
import { logger } from "../utils/logger.js";

export const sendGmail = async (nameEmail, ticketData) => {
  try {
    const { name } = nameEmail;
    const { code, purchase_datetime, amount, purchaser } = ticketData;
    const gmailOptions = {
      from: config.EMAIL,
      to: config.EMAIL,
      subject: "Detalle de compra",
      html: `<h1>Gracias por tu compra ${name}!</h1>
            <p>Detalles del ticket:</p>
            <ul>
              <li>Código: ${code}</li>
              <li>Fecha de compra: ${purchase_datetime}</li>
              <li>Monto total: $${amount}</li>
              <li>Comprador: ${purchaser}</li>
            </ul>
          `,
      attachments: [{}],
    };
    const response = await transporter.sendMail(gmailOptions);
    logger.info("Email enviado!");
    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
