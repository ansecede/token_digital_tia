export type UsarTokenQueryParams = {
    cliente: string;
    token: string;
};
export type GenerarTokenQueryParams = Omit<UsarTokenQueryParams, "token">;
export type TokenGenerationType = "crypto" | "simple";
