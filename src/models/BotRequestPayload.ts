export interface BotRequestPayload {
  get_params: {
    base_url: string | null;
    bot_key: string | null;
    cart_variable: string;
    chat_uuid: string | null;
    ecommerce: string | null;
    ecommerce_url: string | null;
    is_async: boolean;
    on_clear_node: unknown;
    on_close_url: string | null;
    on_success_node: string | null;
    primary_color: string | null;
    widget_origin: unknown;
  };
  is_async: boolean;
  node: string | null;
}
