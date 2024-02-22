import WertWidget from "@wert-io/widget-initializer";
import { useState } from "react";
import { generateWertSignedData } from "./../../utils/common";

const Home = () => {
  const [widgetLoading, setWidgetLoading] = useState(false);

  const openCheckout = async () => {
    setWidgetLoading(true);
    const wertWidget = new WertWidget({
      ...generateWertSignedData("0x8be54244f479A99758e88fb29B0955CD083a8a38", 1, 1),
      partner_id: "01GX31S022ST3GB9WY9X4TNYNW", // your partner id
      origin: "https://sandbox.wert.io", // this option needed only in sandbox
      is_crypto_hidden: true,
      extra: {
        item_info: {
          name: `Item 1`,
          author: "Our Platform",
        },
      },
      listeners: {
        "payment-status": (listenerData) => {
          console.log("Payment status:", listenerData);
          if (listenerData.status === "success") {
            console.log("sucess");
          }
        },
        loaded: () => {
          console.log("loaded");
          setWidgetLoading(false);
        },
      },
    });
    wertWidget.open();
  };
  return <div></div>;
};

export default Home;
