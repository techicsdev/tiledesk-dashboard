export interface Request {
  recipient?: string;
  recipient_fullname?: string;
  sender_fullname?: string;
  text?: string;
  first_text?: string;
  timestamp?: number;
  created_on?: any;
  membersCount?: number;
  support_status?: number;
  members?: any;
  requester_fullname?: string;
  requester_fullname_initial?: string;
  requester_fullname_fillColour?: string;
  requester_is_verified?: boolean;
  requester_id?: string;
  projectid?: string;

  members_array?: any;

  id?: string;
  request_date_fromnow?: any;
  currentUserIsJoined?: boolean;
  members_as_string?: any;
  served_by?: any;
  notification_already_shown?: boolean;
  agents?: any;
  first_message?: any;
  attributes?: any;
  showRequest?: boolean;
  firebaseDocChangeType?: string;
  rating?: any;
  rating_message?: string;
  participants?: any;
  lead?: any;

  // wsrequet
  createdAt?: any;
  availableAgents?: any;
  channel?: any;
  createdBy?: any;
  department?: any;
  id_project?: any;
  language?: any;
  messages_count?: any;
  request_id?: any;
  requester?: any;
  sourcePage?: any;
  status?: any;
  updatedAt?: any;
  tags?: any;
  userAgent?: any;
  _id?: any;
  // ./wsrequet

  hasAgent?(user_id: string): boolean;
}

export class Request implements Request {
  hasAgent?(current_user_id: string): boolean {
    // console.log('% »»» REQUEST MODEL - USER ID ', current_user_id)

    let found = false
    if (this.agents !== undefined) {
      // console.log('MODEL REQUEST - AGENT ', this.agents)
      // console.log('MODEL REQUEST - MEMBER 1)', this.members)

      this.agents.forEach(agent => {

        if (current_user_id === agent.id_user) {
          // console.log('AGENT - ID USER MATCH', agent.id_user)
          found = true
        }
      });

    }

    /**
     * *** NEW 29JAN19: runs a check of the current user' id between the members' ids ***
     * and set found = true if it is found
     * this resolve the bug: a request is assigned to an Agent of the group A then is riassigned to one of the group B
     * the Agent of the Group B doesn't see the request because of that the initial Agent's array is not modified
     */
    if (this.members !== undefined) {
      const _members = Object.keys(this.members);
      // console.log('MODEL REQUEST - MEMBER 2)', _members)
      // console.log('MODEL REQUEST - requester_id)', this.requester_id)

      _members.forEach(member => {

        // if (member !== 'system' && member !== this.requester_id) {
          if (current_user_id === member) {
            // console.log('MEMBER - ID MATCH ', member)
            found = true
          }
        // }
      });

    }
    // console.log('MODEL REQUEST FOUND AGENT ', found);
    return found;
  }

}
