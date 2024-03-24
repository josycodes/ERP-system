"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_SHARE_TYPE = exports.NOTE_STATUS = exports.ACTIVITY_TYPES = exports.LEADS_STATUSES = exports.STATUSES = exports.CONFIG_OPTIONS = void 0;
var CONFIG_OPTIONS;
(function (CONFIG_OPTIONS) {
})(CONFIG_OPTIONS || (exports.CONFIG_OPTIONS = CONFIG_OPTIONS = {}));
var STATUSES;
(function (STATUSES) {
    STATUSES["PENDING"] = "pending";
    STATUSES["CANCELLED"] = "cancelled";
    STATUSES["APPROVED"] = "approved";
    STATUSES["REJECTED"] = "rejected";
    STATUSES["ACTIVE"] = "active";
    STATUSES["NOT_VERIFIED"] = "not verified";
    STATUSES["UNDER_REVIEW"] = "under review";
    STATUSES["VERIFIED"] = "verified";
    STATUSES["BLACKLISTED"] = "blacklisted";
    STATUSES["DISABLED"] = "disabled";
})(STATUSES || (exports.STATUSES = STATUSES = {}));
var LEADS_STATUSES;
(function (LEADS_STATUSES) {
    LEADS_STATUSES["NEW"] = "new";
    LEADS_STATUSES["CONTACTED"] = "contacted";
    LEADS_STATUSES["NEGOTIATION"] = "negotiation";
    LEADS_STATUSES["PROPOSAL"] = "proposal";
    LEADS_STATUSES["CLOSED"] = "closed";
    LEADS_STATUSES["REJECTED"] = "rejected";
    LEADS_STATUSES["CANCELLED"] = "cancelled";
})(LEADS_STATUSES || (exports.LEADS_STATUSES = LEADS_STATUSES = {}));
var ACTIVITY_TYPES;
(function (ACTIVITY_TYPES) {
    ACTIVITY_TYPES["EMAIL"] = "email";
    ACTIVITY_TYPES["DOCUMENT"] = "document";
    ACTIVITY_TYPES["TASK"] = "task";
    ACTIVITY_TYPES["MEETING"] = "meeting";
    ACTIVITY_TYPES["ASSIGN"] = "assign";
    ACTIVITY_TYPES["LEAD"] = "lead";
    ACTIVITY_TYPES["NOTE"] = "note";
})(ACTIVITY_TYPES || (exports.ACTIVITY_TYPES = ACTIVITY_TYPES = {}));
var NOTE_STATUS;
(function (NOTE_STATUS) {
    NOTE_STATUS["DRAFT"] = "draft";
    NOTE_STATUS["DONE"] = "done";
    NOTE_STATUS["AUTO_SAVE"] = "auto-save";
})(NOTE_STATUS || (exports.NOTE_STATUS = NOTE_STATUS = {}));
var TEMPLATE_SHARE_TYPE;
(function (TEMPLATE_SHARE_TYPE) {
    TEMPLATE_SHARE_TYPE["EVERYONE"] = "everyone";
    TEMPLATE_SHARE_TYPE["USER"] = "user";
})(TEMPLATE_SHARE_TYPE || (exports.TEMPLATE_SHARE_TYPE = TEMPLATE_SHARE_TYPE = {}));
