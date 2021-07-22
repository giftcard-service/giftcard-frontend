export namespace gcs {
  export interface CredentialsInterface {
    username: string;
    password: string;
  }

  export interface TokensInterface {
    userId: string;
    access_token: string;
  }

  export interface UserProfileInterface {
    id: string;
    username: string;
    isManager: boolean;
    store?: {
      id: string;
      name: string;
    };
  }

  export interface GiftcardInterface {
    ownerId: string;
    storeId: string;
    amount: number;
    creationTime: Date | string;
    expirationTime: Date | string;
    isUsed?: boolean;
  }

  export interface GiftcardResponseInterface {
    id: string;
    store: { id: string; name: string };
    amount: number;
    amountLeft?: number;
    creationTime: Date | string;
    expirationTime: Date | string;
    isUsed?: boolean;
  }

  export interface QrCodeCreateRequestInterface {
    giftcardId: string;
  }

  export interface GiftcardPurchaseInterface {
    userId: string;
    storeId: string;
    giftcardId: string;
    qrCodeId: string;
    amount: number;
  }

  export interface QrCodeResponseInterface {
    id: string;
    giftcard: gcs.GiftcardInterface;
    creationTime: Date | string;
    expirationTime: Date | string;
  }

  export interface PaginationResponseInterface {
    items: Array<any>;
    links: {
      first: string;
      previous: string;
      next: string;
      last: string;
    };
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }
}
