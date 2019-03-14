import { TestBed } from "@angular/core/testing";

import { DataService } from "./data.service";
import { TransomApiClientService } from "../transom-api-client.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxWebstorageModule } from "ngx-webstorage";
import { of, Observable } from 'rxjs';

class MockApiClient {
  setHeader(key:string, value:string){

  }
  postRequest(request: any): Observable<any> {
    return of(true);
  }
}

describe("DataService", () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxWebstorageModule.forRoot()],
      providers: [
        { provide: TransomApiClientService, useClass: MockApiClient }
      ]
    });
    service = TestBed.get(DataService);
    sessionStorage.removeItem("captcha-demo");
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

});
