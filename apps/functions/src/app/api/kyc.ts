import type { Api } from "../mangopay";

type KycDocumentStatus = 'CREATED' | 'VALIDATION_ASKED' | 'VALIDATED' | 'REFUSED' | 'OUT_OF_DATE';
type KycDocumentType = 'IDENTITY_PROOF' | 'REGISTRATION_PROOF' | 'ARTICLES_OF_ASSOCIATION' | 'SHAREHOLDER_DECLARATION' | 'ADDRESS_PROOF';
type KycDocumentRefusalReason = 'DOCUMENT_UNREADABLE' | 'DOCUMENT_NOT_ACCEPTED' | 'DOCUMENT_HAS_EXPIRED' | 'DOCUMENT_INCOMPLETE' | 'DOCUMENT_MISSING' | 'DOCUMENT_DO_NOT_MATCH_USER_DATA' | 'DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA' | 'SPECIFIC_CASE' | 'DOCUMENT_FALSIFIED' | 'UNDERAGE_PERSON' | 'SPECIFIC_CASE';
/**
 * A Wallet is an object in which PayIns and Transfers from users are stored in order to collect money. You can pay into a Wallet, withdraw funds from a wallet or transfer funds from a Wallet to another Wallet.
 */
interface KycDocument {
  Id: string;
  /** The object owner's UserId */
  UserId: string;
  /** The status of the document */
  status: KycDocumentStatus;
  /** The message accompanying a refusal */
  RefusedReasonMessage: null | string;
  /** The type of reason for refusal */
  RefusedReasonType: null | KycDocumentRefusalReason;
  /** The date when the document was processed by MANGOPAY. null if not processed yet */
  ProcessedDate: null | number;
  /** Custom data */
  Tag?: string;
}

interface CreateKycDocument {
  Tag?: string;
  Type: KycDocumentType;
}

interface KycQueryParams {
  Status?: KycDocumentStatus;
  Type?: KycDocumentType;
}

const baseUrl = (userId: string) => `users/${userId}/kyc/documents`;
export const kycApi = ({ post, put, get, download }: Api) => ({
  createDocument(userId: string, data: CreateKycDocument): Promise<KycDocument> {
    return post(baseUrl(userId), data);
  },
  /**
   * Create a the kyc document page
   * @param userId Id of the user
   * @param kycDocumentId Id of the kyc document
   * @param file Url of a file or base64 encoded version of the file
   * @returns 
   */
  async createPage(userId: string, kycDocumentId: string, file: string): Promise<any> {
    const File = await download(file);
    return post(`${baseUrl(userId)}/${kycDocumentId}/pages`, { File });
  },
  submit(userId: string, kycDocumentId: string): Promise<KycDocument> {
    return put(`${baseUrl(userId)}/${kycDocumentId}`, { Status: "VALIDATION_ASKED" });
  },
  get(userId: string, kycDocumentId: string, queryParams?: KycQueryParams): Promise<KycDocument | undefined> {
    return get(`${baseUrl(userId)}/${kycDocumentId}`, queryParams);
  },
  list(userId: string, queryParams?: KycQueryParams): Promise<KycDocument[]> {
    return get(baseUrl(userId), queryParams);
  }
});