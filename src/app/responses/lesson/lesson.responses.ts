// {
//   "status": 200,
//   "code": "LSN_4004",
//   "message": "Find lesson success!",
//   "data": {
//   "id": "7338e12c-17f6-44fe-aa4f-14107f2f0ecf",
//     "name": "Toán nâng cao",
//     "description": "Nhiều bài tập toán nâng cao",
//     "created_date": "2024-03-04T11:26:54",
//     "created_by": "589ea2b4-3e5b-44f9-8ccc-1ce1f9bbb74e",
//     "last_modified_date": "2024-03-04T11:26:54",
//     "last_modified_by": "589ea2b4-3e5b-44f9-8ccc-1ce1f9bbb74e",
//     "is_public": true,
//     "image_url": "sđsfdfdsfds.jpg"
// "user_info": {
//   "id": 6,
//     "fullName": "Tuan Kiet",
//     "avatar": null
// }
// }
// }
import { QuestionResponses } from '../question/question.responses';
import { ImageResponses } from '../image/image.responses';

export interface LessonResponses {
  id: string;
  name: string;
  description: string;
  created_date: Date;
  created_by: string;
  last_modified_date: Date;
  last_modified_by: string;
  is_public: boolean;
  access_times: number;
  totalComment: number;
  image: ImageResponses;
  user_info: {
    id: number;
    fullName: string;
    avatar: ImageResponses;
    username: string;
  };
  questions: QuestionResponses[];
}
