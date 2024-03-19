// {
//     "amount": 999999,
//     "payType": "",
//     "requestType": "transactionStatus",
//     "orderId": "1",
//     "extraData": "",
//     "signature": "ad6fc9f76458c358cb33a786636da37090eb18303f6819eb1a84032d1d5c0341",
//     "requestId": "1",
//     "transId": "4358744957855565108",
//     "errorCode": 36,
//     "message": "Session Expired",
//     "localMessage": "Phiên giao dịch đã hết hạn"
// }
export interface PaymemtStatusResponses {
    amount: number;
    payType: string;
    requestType: string;
    orderId: string;
    extraData: string;
    signature: string;
    requestId: string;
    transId: string;
    errorCode: number;
    message: string;
    localMessage: string;
}
  