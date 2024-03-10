export interface sc_options {
  address: string;
  commodity: string;
  commodity_amount: number;
  network: string;
  sc_address: string;
  sc_input_data: string;
}
export interface signed_sc_options extends sc_options {
  signature: string;
}
