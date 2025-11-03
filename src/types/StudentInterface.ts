interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isDeleted?: boolean;
  groupId: number;
  contacts: string;
  group?: {
    id: number;
    name: string;
  };
}

export default StudentInterface;
