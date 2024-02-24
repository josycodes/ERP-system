export enum CONFIG_OPTIONS {

}

export enum STATUSES {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  NOT_VERIFIED = 'not verified',
  UNDER_REVIEW = 'under review',
  VERIFIED = 'verified',
  BLACKLISTED = 'blacklisted',
  DISABLED = 'disabled',
}

export enum LEADS_STATUSES {
  NEW = 'new',
  CONTACTED = 'contacted',
  NEGOTIATION = 'negotiation',
  PROPOSAL = 'proposal',
  CLOSED = 'closed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum ACTIVITY_TYPES {
  EMAIL = 'email',
  DOCUMENT = 'document',
  TASK = 'task',
  MEETING = 'meeting',
  ASSIGN = 'assign',
  LEAD = 'lead',
  NOTE = 'note',
}