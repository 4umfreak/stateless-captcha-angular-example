import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TransomApiClientService } from "../transom-api-client.service";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor(private apiClient: TransomApiClientService) {
  }

  /**
   * Submit the completed request data structure, and any files
   * from session storage, to the REST API that will generate and
   * send the request as email.
   *
   * @param authToken
   * @param nonce
   * @param contactRequest - A structure containing the complete request
   */
  submitRequest(authToken: string, nonce: string, contactRequest: any): Observable<any> {
    this.apiClient.setHeader("Authorization", "Bearer " + authToken);
    this.apiClient.setHeader("captcha-nonce", nonce);
    // contactRequest.attachments = [];

    return this.apiClient.postRequest(contactRequest);
  }

}
