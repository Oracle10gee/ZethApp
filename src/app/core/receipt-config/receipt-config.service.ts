// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ReceiptConfiguration } from './receipt-configuration.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ReceiptConfigurationService {
//   private readonly baseUrl = 'http://20.101.8.59/api/ReceiptConfiguration';

//   constructor(private readonly http: HttpClient) {}

//   getReceiptConfigurationByMerchantId(merchantId: string): Observable<ReceiptConfiguration> {
//     const url = `${this.baseUrl}/getReceiptConfigurationByMerchantId?merchantId=${merchantId}`;
//     return this.http.get<ReceiptConfiguration>(url);
//   }

//   updateReceiptConfiguration(id: number, configuration: ReceiptConfiguration): Observable<void> {
//     const url = `${this.baseUrl}/UpdateReceiptConfiguration/${id}`;
//     return this.http.put<void>(url, configuration);
//   }
// }
