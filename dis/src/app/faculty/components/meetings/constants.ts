export interface Meeting {
  meetingId: string;
  meetingDate: string;
  meetingTime: String;
  hostId: string;
  meetingObjective: string;
  meetingVenue: string;
  meetingSummary: string;
  meetingEndTime: string;
  meetingDuration:string;
  meetingAttendants: string[];
}
export interface MeetingAttendant {
  id: string;
  userId: string;
  name: string;
  nameAcronym: string;
  profilePicture: string;
  currentDesignation: string;
  email: string;
  mobileNo: number;
  alternateMobileNo: number;
  userName: string;
  isPresent: number
}
export interface Attendance {
  meetingId: string;
  attendees: MeetingAttendant[];
}