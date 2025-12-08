interface GroupInterface {
  id: number;
  name: string;
  contacts: string;
  students?: Array<{
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    groupId: number;
    contacts: string;
  }>;
}

export default GroupInterface;
