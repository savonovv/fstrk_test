import axios, { AxiosError } from "axios";
import { action, computed, observable } from "mobx";
import ENDPOINTS, { BASEURL } from "../../api/endpoints";
import { CartDto } from "./Cart.dto";

class CartStore {
  @observable
  isLoading = false;

  @observable
  redirecting = false;

  @observable
  error: AxiosError | null = null;

  @observable
  cartData: CartDto | null = null;

  @action
  getCartData = async (
    chatId: string | null,
    botKey: string | null
  ): Promise<void> => {
    if (chatId && botKey) {
      this.isLoading = true;
      const { main, chats } = ENDPOINTS.partners;
      const url = `${BASEURL}${main}${chats.main}/${chatId}${chats.variables}`;
      axios
        .get<{ [catrId: string]: CartDto }>(url, {
          headers: {
            "bot-key": botKey,
          },
        })
        .then((response) => {
          const [, cart] = Object.entries(response.data)[0];
          this.cartData = cart;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
    return new Promise((r) => r());
  };

  @action
  createOrder = async (
    chatId: string | null,
    botKey: string | null,
    onSuccessNode: string | null
  ) => {
    if (this.cartData && chatId && botKey && onSuccessNode) {
      const { main, chats } = ENDPOINTS.partners;
      const url = `${BASEURL}${main}${chats.main}/${chatId}`;
      axios
        .post(
          url + chats.variables,
          {
            [`cart-${chatId}`]: this.cartData,
          },
          {
            headers: {
              "bot-key": botKey,
            },
          }
        )
        .then(() => {
          axios.post(
            url + chats.push,
            {
              node: onSuccessNode,
            },
            {
              headers: {
                "bot-key": botKey,
              },
            }
          );
        })
        .then(() => {
          this.redirecting = true;
        })
        .catch((error) => {
          this.error = error;
        });
    }
  };

  @action
  quantityChanging = (
    guid: string,
    changingAction: "remove" | "add" | "delete"
  ) => {
    if (changingAction === "delete") {
      if (this.cartData?.products) {
        this.cartData = {
          products: this.cartData?.products.filter(
            (product) => product.guid !== guid
          ),
        };
      }
      return;
    }
    if (this.cartData?.products) {
      const [product] = this.cartData.products.filter(
        (productItem) => productItem.guid === guid
      );

      product.quantity =
        changingAction === "remove"
          ? product.quantity - 1
          : product.quantity + 1;

      const newCartData = this.cartData;

      newCartData.products
        .filter((productItem) => productItem.guid !== guid)
        .push(product);

      this.cartData = { products: newCartData.products };
    }
  };

  @computed
  get cartItemsCount() {
    return this.cartData?.products.length;
  }
}

const cartStore = new CartStore();

export default cartStore;
