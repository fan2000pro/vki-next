interface GroupInterface {
  id: number;
  name: string;
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
