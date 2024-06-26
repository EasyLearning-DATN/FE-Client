// {
//     "status": 200,
//     "code": "USR_2005",
//     "message": "Get profile success!",
//     "data": {
//         "username": "anv",
//         "fullName": "Nguyễn Văn A",
//         "email": "anv@gmail.com",
//         "avatar": "",
//         "dayOfBirth": "2003-07-12",
//         "locked": false
//     }
// }

export interface UserResponse {
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  dayOfBirth: string;
  locked?: boolean;
  id?: string;
  role: string;
  userInfoId?: number;
}

export interface UserInfoResponse {
  id: number;
  fullName: string;
  avatar: {
    url: string;
    publicId: string;
  };
  username: string;
}
