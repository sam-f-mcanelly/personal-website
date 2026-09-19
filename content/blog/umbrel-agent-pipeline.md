---
title: A Development Pipeline on an Umbrel Server
date: 2026-09-19
summary: How a card on a Vikunja board becomes a merged pull request on a mini PC under my desk, and the problems found in the first three days.
draft: false
---

This post describes the setup in my `portainer-gitea-ci-cd` repository. It covers the
components, the path a task takes from the board to `main`, and the problems found in the first
three days. The full documentation is in the repository.

## 1. Background

In 2025 the repository contained a Portainer stack. It ran `act_runner` and a `registry:2`
container next to the Gitea app on umbrelOS. This provided CI. It also had three problems:

1. The runner's entrypoint printed the registration token to the container log.
2. The runner ran with `privileged: true`.
3. Portainer had to be attached to `umbrel_main_network` by editing Umbrel's own compose file.

The current version replaces the stack with a setup script and adds Claude Code agents that
write and review the code. The runner is the only part the two versions have in common.

## 2. Hardware

- Ryzen 7 PRO 5850U mini PC, 8 cores / 16 threads
- 32 GB RAM, 4 TB storage
- umbrelOS on Debian 13

Everything described below runs on this machine. The runner has a capacity of one job, so the
backend and frontend jobs run one after the other. A pull request has a CI result about 90
seconds after the push.

## 3. Components

| Component     | Purpose                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Vikunja       | Task board. Columns: Backlog, Queue, Design, Build, Review, Your Call, Done.                                    |
| vikunja-mcp   | MCP server that exposes the board to the agents as tools. The tools enforce stage gates and the WIP limit.      |
| Gitea         | Git hosting, pull requests, branch protection, and Actions.                                                     |
| act_runner    | Runs each CI job in a new container.                                                                            |
| Claude Code   | One orchestrator session, one build agent per card, and one review agent per pull request.                      |
| `gitea-pr.sh` | Gitea has no equivalent of `gh`. The agents use this script for pull requests, reviews, CI status, and rebases. |

The agents use bot accounts with Write access. They can push branches and open pull requests.
They cannot push to `main`, change repository settings, or read secrets.

The project being built is Wealth, a net worth tracker (Kotlin/Ktor, React, SQLite) packaged as
an Umbrel app.

## 4. Procedure

A card moves through the system as follows.

1. I move the card from Backlog to Queue.
2. The orchestrator takes the next card and checks that every card it depends on is merged.
3. The orchestrator starts a build agent in a new git worktree.
4. The build agent writes a spec, then a failing test. It pastes the failing output into the
   card before it writes the implementation.
5. The build agent implements the change until every gate passes, rebases on `main`, pushes
   `task/<id>`, and opens a pull request.
6. The orchestrator starts a separate review agent on that exact commit.
7. The review agent posts inline comments and a verdict: `approve` or `needs_work`.
8. On `needs_work`, the card returns to Build. After three rounds it comes to me instead.
9. On `approve`, I read the pull request and merge it. A workflow then rebases the other approved
   pull requests onto the new `main`.
10. I move the card to Done.

Steps 1, 9, and 10 are mine. The agents do not merge, approve, or close pull requests, and they
do not move cards to Done.

## 5. Results after three days

The Wealth repository was created on 2026-09-16 at 01:50 UTC. The figures below cover the period
up to 2026-09-19 at 00:08 UTC. Commit and line counts come from git. Pull request, push, and
comment counts come from the Gitea API.

<!-- chart: stats -->

The bot account made 114 of the 145 pushes. My account made 31: 5 setup pushes on 2026-09-16 and
2026-09-17, 21 pull request merges (merging in the Gitea web UI records a push to `main`), and 5
"update branch" merges into open pull requests. The busiest bucket is 15:00 to 18:00 UTC on
2026-09-18, with 60 pushes. The rebase workflow (#20) and 11 probe pull requests were opened in
that bucket.

<!-- chart: pushes -->

At the end of the period there were 8,827 lines of tests, 4,050 lines of backend, and 4,128 lines
of frontend. The tests are larger than the backend and frontend combined. Section 6.2 describes
the rule that requires a failing test before each behaviour change.

<!-- chart: loc -->

There were 32 pull requests. 21 were merged. The other 11 were probes, opened to record how Gitea
handles a pull request that is behind `main`, conflicting, reworked, or approved, and closed
within a few minutes. The rebase workflow was written against the recorded behavior instead of
the documentation. The longest-open pull request was #1, at 7 hours and 8 minutes.

<!-- chart: prs -->

The board had 84 cards across 9 epics when the pipeline README was written. Most of them are in
Backlog, which is where new cards stay until I triage them.

<!-- chart: board -->

## 6. Problems found

### 6.1 Two passing pull requests produced a broken build

One card split a file into several files. Another card added code to the same package. Both pull
requests passed CI, and Gitea reported both as mergeable. After both were merged, every mapping
function was declared twice and one file was over the 300-line limit.

Rule: a card that restructures the repository runs alone.

### 6.2 Tests written after the code

The defects that got past review in the first days were found by using the app by hand. In one
case, a `PUT` request that left out `archived` un-archived the account.

Rule: the failing test output is recorded before the implementation exists. Integration tests use
the real Ktor module and a real SQLite file.

### 6.3 Job containers cannot resolve `umbrel.local`

Gitea's root URL is `http://umbrel.local:8085/`, and job containers clone from it. Docker does
not do mDNS.

Fix: the setup script adds `--add-host=umbrel.local:host-gateway` to every job container.

### 6.4 Pushes made with the Actions token start no workflows

A workflow that rebases pull requests with the built-in token produces branches that never run
CI.

Fix: the rebase workflow pushes with a separate token that I create.

### 6.5 Review cost

One card used 643k tokens. Two full review rounds accounted for 337k of that. The second round
reviewed a change of 8 added and 5 removed lines, none of which were code.

Rule: a full review runs once per card. Later rounds review only the new changes.

## 7. Known limitations

- Nothing technically prevents the agents from merging. Gitea allows the bot account to merge on
  `main`. Only the written rules in `CLAUDE.md` prevent it.
- CI jobs can reach the host's Docker socket, which is equivalent to root on the host. This is
  acceptable on a single-user home network. It would not be acceptable anywhere else.
- The orchestrator only runs while a Claude Code session is open.
- The release pipeline is designed but not built.
- Gitea does not publish a merge ref, so CI on a pull request tests the branch, not the result of
  merging it.

## 8. Source

The setup script, workflows, agent configuration, and full documentation are in the
[portainer-gitea-ci-cd repository](https://github.com/sam-f-mcanelly/portainer-gitea-ci-cd).
