# Jira Remediation Notes

## Status

Jira project `AICC` is reachable through the MCP connector, and read calls succeed. `jira_get_project_issues` returns successfully with an empty issue list.

## Blocker

`jira_create_issue` currently hangs until timeout. This has been reproduced with multiple bounded tests:

- Minimal Task create: `project_key`, `summary`, `issue_type` only
- Story create with description and explicit `{}` additional fields
- Invalid project key create, which should normally return a validation error
- Explicit all-fields create with assignee, description, components, and additional fields supplied

Because even the invalid-project create attempt hangs, the issue appears isolated to the Jira MCP `jira_create_issue` execution path rather than the `AICC` project key, issue type, labels, descriptions, or payload shape.

## Current Tracker Decision

Until Jira creation is repaired, GitHub Issues remain the active execution tracker for AICC workstreams. Slack `new-channel` has been updated with this status.

## Recommended Remediation

1. Review the Jira MCP connector logs for `jira_create_issue` calls.
2. Confirm the connector token/account has Browse Project and Create Issues permissions in project `AICC`.
3. Confirm the project issue screen does not require hidden mandatory custom fields.
4. Test create directly through Jira REST API using the same integration identity if available.
5. Restart or update the Jira MCP connector if create calls are deadlocking before returning validation errors.
