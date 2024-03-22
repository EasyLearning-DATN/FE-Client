import { IsNotEmpty, IsString } from 'class-validator';

// "orderID": 123,
//       "requestId": 456,
//       "date": "12/07/20274",
//       "total": 999999,
//       "userId": "129df52e-2ad2-4065-ac18-8f998da1cf3d",
//       "status": "Khởi tạo hoá đơn"
export class invoiceDTO {
    @IsString()
    @IsNotEmpty()
    orderID: string = '';
    
    @IsString()
    @IsNotEmpty()
    transId: string = '';
    
    @IsString()
    @IsNotEmpty()
    date: string = '';
    
    @IsString()
    @IsNotEmpty()
    total: string = '';
    
    @IsString()
    @IsNotEmpty()
    userId: string = '';
    
    @IsString()
    @IsNotEmpty()
    status: string = '';
}