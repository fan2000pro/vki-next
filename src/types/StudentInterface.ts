interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isDeleted?: boolean;
  groupId: number;
  contacts: string;
};

export default StudentInterface;
