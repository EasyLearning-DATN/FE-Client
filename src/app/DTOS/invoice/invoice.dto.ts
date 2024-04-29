import { IsNotEmpty, IsString } from 'class-validator';

// "order_id": "AAAAAAAAAA",
// "trans_id": "TTTTTTTTTTT",
// "total": 700000,
// "status": "pending",
// "user_info_id": 1,
// "package_upgrade_id": "24be4f8d-077a-4d30-b834-364db6596533"
export class invoiceDTO {
    @IsString()
    @IsNotEmpty()
    order_id: string = '';
    
    @IsString()
    @IsNotEmpty()
    trans_id: string = '';
    
    @IsString()
    @IsNotEmpty()
    package_upgrade_id: string = '';

    @IsString()
    @IsNotEmpty()
    method_payment: string = '';
    
    @IsString()
    @IsNotEmpty()
    total: string = '';
    
    @IsString()
    @IsNotEmpty()
    user_info_id: string = '';
    
    @IsString()
    @IsNotEmpty()
    status: string = '';
}