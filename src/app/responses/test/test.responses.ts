export interface TestResponses {
  created_date: Date;
  name: string;
  id: string;
  user_info: {
    id: number;
    fullName: string;
    avatar: string | null;
  };
}
