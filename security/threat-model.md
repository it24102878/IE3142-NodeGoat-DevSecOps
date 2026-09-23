# NodeGoat Threat Model

## Assets

- User credentials
- Authentication/session information
- User profile and application data
- MongoDB database records
- NodeGoat source code
- Docker/container configuration
- GitHub repository
- CI/CD pipeline
- CI/CD secrets

## Entry Points

- NodeGoat login form
- Registration form
- User input fields
- URL/query parameters
- HTTP requests to NodeGoat
- Application routes
- Database queries
- GitHub repository pushes
- GitHub Actions workflow inputs

## Trust Boundaries

### TB1 - Browser to NodeGoat
User-controlled input crosses from an untrusted client into the NodeGoat application.

### TB2 - NodeGoat to MongoDB
Application-generated database operations cross from the application layer to the database layer.

### TB3 - Developer to GitHub
Source code and configuration are pushed from developer systems to the shared repository.

### TB4 - GitHub to GitHub Actions
Repository code and secrets are consumed by automated CI/CD jobs.

Threat T1 — Injection against MongoDB query
STRIDE:
Tampering / Information Disclosure

Component:
Browser → NodeGoat → MongoDB

Attack scenario:
An attacker provides specially crafted input that changes
how a database query is interpreted.

Potential result:
Unauthorized information could be accessed or application
data could be manipulated.


Threat T2 — Malicious script stored/displayed by NodeGoat
STRIDE:
Tampering / Information Disclosure

Component:
Browser → NodeGoat → other users' browsers

Attack scenario:
An attacker submits malicious script content into an
application input that is later rendered without sufficient
encoding or sanitization.

Potential result:
The script could execute in another user's browser.

Threat T3 — Unauthorized access to another user's data
STRIDE:
Elevation of Privilege / Information Disclosure

Component:
NodeGoat routes and application logic

Attack scenario:
An authenticated user manipulates identifiers or requests
to access information or functions belonging to another user.

Potential result:
Confidential application data may be disclosed or modified.

Threat T4 — Authentication/session misuse
STRIDE:
Spoofing / Elevation of Privilege

Component:
Login/session handling

Attack scenario:
Weak authentication or session handling may allow an
attacker to impersonate another user or obtain unauthorized
access.

Potential result:
Account compromise and unauthorized actions.

Step 8 — Build the STRIDE table

| ID | STRIDE                                          | Component                       | Threat                                             | Security impact                           |
| -- | ----------------------------------------------- | ------------------------------- | -------------------------------------------------- | ----------------------------------------- |
| T1 | Tampering / Information Disclosure              | NodeGoat ↔ MongoDB              | Malicious input manipulates a database query       | Unauthorized access/manipulation of data  |
| T2 | Tampering / Information Disclosure              | Browser ↔ NodeGoat              | Untrusted content executes in browser              | Script execution/session or data exposure |
| T3 | Elevation of Privilege / Information Disclosure | NodeGoat application routes     | User accesses another user's information/functions | Unauthorized disclosure/modification      |
| T4 | Spoofing / Elevation of Privilege               | Authentication/session handling | Attacker impersonates or gains unauthorized access | Account compromise                        |
Create your risk scale
Likelihood:
1 = Low
2 = Medium
3 = High

Impact:
1 = Low
2 = Medium
3 = High

Risk Score = Likelihood × Impact

1–2 = Low
3–4 = Medium
6–9 = High

| Likelihood ↓ / Impact → |    1 Low | 2 Medium |   3 High |
| ----------------------- | -------: | -------: | -------: |
| **3 High**              | 3 Medium |   6 High |   9 High |
| **2 Medium**            |    2 Low | 4 Medium |   6 High |
| **1 Low**               |    1 Low |    2 Low | 3 Medium |
justification

T1 — Injection

Likelihood: High

User-controlled input reaches application logic and database operations, making injection a realistic attack path if query construction is unsafe.

Impact: High

Successful exploitation could expose or manipulate data stored in MongoDB

T2 — XSS-style threat
Likelihood: High

NodeGoat accepts and displays user-controlled information, creating a realistic opportunity for malicious script content if output is not properly handled.

Impact: Medium

Successful exploitation could affect users viewing the malicious content and potentially expose browser-side information.

This is a copy of a shared ChatGPT chat. It won't be added to memory.

Report conversation
Saturday 1:23 AM
Uploaded a file
this is a assignment that I have to work with in university. I need you to fully analyze this document and summarize what I have to do in this project clearly and understandably as possible. we select NodeGoat project for continuing this project. so explain me what in this project
This error shows
Today 9:20 AM
this is the screenshot that I got in the vs code
this ain't right. cuz every member should commit their own part in the project to git hub. 
I uploaded a screen shot that we divide our parts. can we use this as 4 member part.
this is the warning that I get when I bash the docekr compose config
Uploaded a file
use this template

The cleanest way is to stop thinking that every member must work in every phase. They do not.

The assignment only says the repository history should reflect contributions from all four members; it does not say every member must commit something in every phase.

Use this as the fixed allocation from now on:

Project Phase	Main owner	Exact responsibility
Phase 1–3	Shared	Setup, repository, run original NodeGoat
Phase 4	Member 1	Docker, Docker Compose, architecture, networking, trust boundaries
Phase 5	Member 2	STRIDE threat modelling, risk assessment, Semgrep baseline
Phase 6	All 4 separately	Each member exploits and fixes one vulnerability
Phase 7	All 4, different tools	M1 Trivy, M2 Semgrep, M3 core GitHub Actions + npm audit, M4 Gitleaks
Phase 8	Member 4 mainly	GitHub Secrets, secrets management, pipeline failure demonstration
Phase 9	Shared	Merge, integrate, test entire project
Phase 10	Shared	Report + viva

That is the structure you should follow.

Member 1

Member 1 owns:

Phase 4

Dockerfile
docker-compose.yml
NodeGoat container
MongoDB container
Docker network
ports
architecture diagram
data flows
trust boundaries

Then later:

Phase 6

Vulnerability 1

Phase 7

Trivy

So Member 1's work is:

Phase 4
Docker + Architecture
        ↓
Phase 6
Vulnerability 1
        ↓
Phase 7
Trivy

Typical commits:

docs: add NodeGoat architecture and trust boundaries

security: fix vulnerability 1

ci: add Trivy container scanning
Member 2

Member 2 does not need to do Member 1's Phase 4 Docker work.

Member 2 starts their major responsibility in:

Phase 5

STRIDE
at least 4 threats
likelihood
impact
risk matrix
threat-to-control mapping
Semgrep baseline scan

Then:

Phase 6

Vulnerability 2

Then:

Phase 7

Semgrep after fixes
Semgrep GitHub Actions integration

So:

Phase 5
STRIDE + Risk + Semgrep BEFORE
        ↓
Phase 6
Vulnerability 2
        ↓
Phase 7
Semgrep AFTER + CI

Typical commits:

security: add threat model and risk assessment

security: fix vulnerability 2

ci: add Semgrep SAST gate
Member 3

Member 3's main responsibility starts around the CI/CD work.

Before Phase 7 they can study the build/test process, but they do not need to create artificial commits just for that.

Their major tasks are:

Phase 6

Vulnerability 3

Phase 7

create the main GitHub Actions workflow
automatic build
automatic testing
npm audit
coordinate the other security jobs

So:

Phase 6
Vulnerability 3
        ↓
Phase 7
GitHub Actions
Build + Test
npm audit

Typical commits:

security: fix vulnerability 3

ci: add automated build and test workflow

ci: add npm audit dependency scanning
Member 4

Member 4 mainly owns secrets/security enforcement.

They do:

Phase 6

Vulnerability 4

Phase 7

Gitleaks

Phase 8

environment variables
GitHub Actions Secrets
remove/avoid hardcoded secrets
configure security gate failure
demonstrate red failed pipeline
restore green successful pipeline

So:

Phase 6
Vulnerability 4
        ↓
Phase 7
Gitleaks
        ↓
Phase 8
GitHub Secrets
Security Gate
Failed Pipeline Demo

Typical commits:

security: fix vulnerability 4

ci: add Gitleaks secrets scanning

security: configure environment secrets

ci: enforce security gate failure
The easiest way to remember it

Think:

MEMBER 1
Docker
Vulnerability 1
Trivy

MEMBER 2
Threat Modelling
Vulnerability 2
Semgrep

MEMBER 3
CI/CD Core
Vulnerability 3
npm audit

MEMBER 4
Secrets
Vulnerability 4
Gitleaks + Failed Pipeline

That's your permanent member allocation.

What happens in Phase 6?

Phase 6 is the only major phase where all four members work at the same time on the same type of task:

Member 1 → Vulnerability 1
Member 2 → Vulnerability 2
Member 3 → Vulnerability 3
Member 4 → Vulnerability 4

Each person must independently do:

Exploit
   ↓
BEFORE screenshot
   ↓
Find vulnerable code
   ↓
Fix code
   ↓
Commit their fix
   ↓
Repeat exact exploit
   ↓
AFTER screenshot

That is required because the assignment asks for at least four exploit-and-fix demonstrations.

So right now

You are at:

Phase 4

Therefore:

Member 1 should now continue the main technical work.

Members 2, 3, and 4 do not need to duplicate Phase 4 work or make unnecessary commits.

Once Member 1 completes Phase 4:

Phase 4 ✅
Member 1 work
        ↓
Phase 5
Member 2 work
        ↓
Phase 6
ALL FOUR MEMBERS
        ↓
Phase 7
Each member's assigned security tool
        ↓
Phase 8
Member 4 mainly
        ↓
Phase 9
Group integration

That is the structure I recommend we keep fixed so it does not become confusing again.

Sources
also I need to create github branches using our IT numbers. Member 1 = IT24104385,
member 2 = IT24100555
member 3 = IT24101102
member 4 = IT24102878

So start giving the phase 4 now on. use these details for continue this project.

Yes. From now on I’ll use the IT numbers as the branch names and member identifiers:

Member	IT Number / Branch	Responsibility
Member 1	IT24104385	Application & Docker + Vulnerability 1 + Trivy
Member 2	IT24100555	Threat Modelling & Risk Assessment + Vulnerability 2 + Semgrep
Member 3	IT24101102	Core CI/CD + Vulnerability 3 + npm audit
Member 4	IT24102878	Secrets & Security Enforcement + Vulnerability 4 + Gitleaks

For Phase 4, only Member 1 (IT24104385) does the main technical work. The other members do not need to duplicate it. Phase 4 satisfies the assignment requirement for application architecture, containerisation, data flows, and trust boundaries.

PHASE 4 — Member 1: IT24104385
Step 1 — Create Member 1 branch

Open VS Code terminal in:

C:\Users\binol\Documents\IE3142-DevSecOps\IE3142-NodeGoat-DevSecOps

First:

git checkout master

Then:

git pull origin master

Check:

git status

You should have:

nothing to commit, working tree clean

Now create Member 1 branch:

git checkout -b IT24104385

Push it to GitHub:

git push -u origin IT24104385

Verify:

git branch

Expected:

* IT24104385
  master
📸 Screenshot required

Save:

P4-01-IT24104385-branch.png

Make sure IT24104385 is visible.

Step 2 — Verify Docker containers

Make sure Docker Desktop is running.

Run:

docker compose up -d

Then:

docker compose ps

You already showed me a valid result similar to:

mongo    Up
web      Up

with:

0.0.0.0:4000->4000/tcp

That means:

Windows localhost:4000
          ↓
NodeGoat container:4000
📸 Screenshot required

You already have this.

Save it as:

P4-02-compose-services-running.png

This proves:

NodeGoat container ✅
MongoDB container ✅
Port mapping ✅
Step 3 — Verify NodeGoat in browser

Open:

http://localhost:4000

Make sure NodeGoat loads.

If needed, log in using the seeded account you used in Phase 3.

📸 Screenshot required

The screenshot should show:

NodeGoat page;
browser address bar;
localhost:4000.

Save:

P4-03-nodegoat-running.png

This is one of the strongest screenshots for the containerisation section.

Step 4 — Understand docker-compose.yml

Open:

docker-compose.yml

Do not change it yet.

You should see two services:

web
mongo

Conceptually:

docker-compose.yml
│
├── web
│   └── NodeGoat
│
└── mongo
    └── MongoDB

The important connection is:

MONGODB_URI:
mongodb://mongo:27017/nodegoat

Breakdown:

mongodb://  → database protocol
mongo       → Docker service name
27017       → MongoDB port
nodegoat    → database name

The NodeGoat container therefore talks to MongoDB using:

mongo:27017

not:

localhost:27017
Why?

Inside Docker Compose, containers can locate each other using their service names.

So:

web container
     |
     | mongo:27017
     ↓
mongo container
📸 Screenshot recommended

Take a screenshot of the important part of docker-compose.yml.

Save:

P4-04-docker-compose-file.png
Step 5 — Understand the Dockerfile

Open:

Dockerfile

Do not change anything yet.

You mainly need to understand these concepts:

FROM
WORKDIR
COPY
RUN
USER
EXPOSE
FROM

Defines the base Node.js/Linux image.

Conceptually:

Linux
+
Node.js
+
NodeGoat code
=
NodeGoat Docker image
WORKDIR

Defines where the application lives inside the container.

COPY

Copies project files into the Docker image.

RUN

Executes build/setup instructions such as installing dependencies.

USER

If the application runs as a non-root user, that reduces unnecessary privilege inside the container.

EXPOSE 4000

Indicates the application uses container port:

4000

Compose then publishes:

4000:4000

meaning:

Host port 4000 → Container port 4000
📸 Screenshot recommended

Save:

P4-05-dockerfile.png
Step 6 — Check NodeGoat container logs

Run:

docker compose logs web --tail 40

Look for evidence that:

MongoDB became available
NodeGoat initialized
application/server started

You do not need to understand every line.

📸 Screenshot recommended

Save:

P4-06-nodegoat-logs.png

If you see a serious error instead of successful startup, send it to me.

Step 7 — Check MongoDB logs

Run:

docker compose logs mongo --tail 30

You should see MongoDB activity.

Again, you do not need to understand everything.

We mainly need to confirm:

MongoDB container is actually functioning.
📸 Screenshot optional

Save:

P4-07-mongodb-logs.png
Step 8 — Inspect Docker network

Run:

docker network ls

Look for something with a name similar to:

ie3142-nodegoat-devsecops_default

The exact name can differ.

Now inspect it using the actual name:

docker network inspect YOUR_NETWORK_NAME

For example:

docker network inspect ie3142-nodegoat-devsecops_default

Look through the output.

You should find both containers attached to that network.

Conceptually:

Docker network
│
├── NodeGoat web container
│
└── MongoDB container

This explains how:

web

can communicate with:

mongo
📸 Screenshot required/recommended

Capture enough output to show the network and containers.

Save:

P4-08-docker-network.png
Step 9 — Understand the application data flow

This is extremely important for your architecture diagram and later STRIDE analysis.

The normal flow is:

USER
  |
  | HTTP request
  ↓
BROWSER
  |
  | localhost:4000
  ↓
NODEGOAT
Node.js + Express
  |
  | MongoDB query
  ↓
MONGODB
  |
  | database result
  ↓
NODEGOAT
  |
  | HTTP response
  ↓
BROWSER

More precisely:

1. User enters information in browser.

2. Browser sends request to localhost:4000.

3. Docker forwards port 4000 to NodeGoat container.

4. Express receives the request.

5. NodeGoat processes the request.

6. NodeGoat communicates with MongoDB.

7. MongoDB returns data.

8. NodeGoat generates a response.

9. Browser displays the result.

You need to understand this for the viva.

Step 10 — Identify trust boundaries

The assignment specifically requires trust boundaries.

For NodeGoat, use these.

Trust Boundary 1
Browser / User / Attacker

==========================
TRUST BOUNDARY 1
==========================

NodeGoat Web Application

Why?

The browser is untrusted.

Inputs can include:

username
password
URL parameters
forms
cookies
HTTP headers

and any of them may be malicious.

Trust Boundary 2
NodeGoat Web Application

==========================
TRUST BOUNDARY 2
==========================

MongoDB

This is where application/database communication occurs.

Possible later security concerns include:

query manipulation
unauthorized access
sensitive data exposure
Trust Boundary 3

For the final DevSecOps architecture:

Developer

==========================
TRUST BOUNDARY 3
==========================

GitHub Repository / GitHub Actions

We haven't implemented the full pipeline yet, but it belongs in the final architecture.

Step 11 — Create architecture diagram

Member 1 should now create the actual architecture diagram.

You can use:

draw.io / diagrams.net

I recommend draw.io because it is simple.

Create these main components:

+--------------------------+
| User / Browser           |
+------------+-------------+
             |
             | HTTP :4000
             ↓

========== TRUST BOUNDARY 1 ==========

+--------------------------+
| NodeGoat Web Application |
| Node.js + Express        |
| Docker Container         |
| Port 4000                |
+------------+-------------+
             |
             | MongoDB
             | mongo:27017
             ↓

========== TRUST BOUNDARY 2 ==========

+--------------------------+
| MongoDB 4.4              |
| Docker Container         |
| Database: nodegoat       |
| Port 27017               |
+--------------------------+

Then add a development section:

Developer
    |
    | git push
    ↓
GitHub Repository
    |
    ↓
GitHub Actions

Label the GitHub Actions part:

Planned DevSecOps Pipeline

because it will be implemented later.

Eventually it contains:

Semgrep
npm audit
Gitleaks
Trivy
Step 12 — Export architecture diagram

Export it as PNG:

nodegoat-architecture.png

Also save the editable draw.io file:

nodegoat-architecture.drawio
📸 Main figure required

Your exported architecture image becomes:

P4-09-nodegoat-architecture.png

This should definitely go into the report.

Step 13 — Add architecture folder to repository

In PowerShell:

mkdir architecture

Put inside:

architecture/
│
├── nodegoat-architecture.png
└── nodegoat-architecture.drawio

Check:

git status

You should see the new files.

Step 14 — Commit Member 1 work

Run:

git add architecture

Then:

git commit -m "docs: add NodeGoat architecture and trust boundaries"

Then:

git push origin IT24104385

Now GitHub should show a commit made by Member 1.

📸 Screenshot recommended

On GitHub, open:

IT24104385 branch

and show the commit.

Save:

P4-10-member1-github-commit.png
Step 15 — Do not merge yet

For now:

IT24104385

can remain as its own branch.

We will merge at the correct integration point.

Do not have Member 2 start from an outdated branch.

When Member 2 begins Phase 5, we will make sure they create:

IT24100555

from the latest appropriate master.

That avoids unnecessary merge problems.

Step 16 — Add Phase 4 evidence to your working report

Use these three main figures:

Figure 1:
NodeGoat and MongoDB running using Docker Compose

Figure 2:
Containerized NodeGoat application on localhost:4000

Figure 3:
NodeGoat architecture and trust boundaries

You can keep Docker logs/network screenshots in the appendix.

A short report explanation can be:

OWASP NodeGoat was deployed as a containerized two-component application consisting of the Node.js/Express web application and MongoDB database. Docker Compose was used to start and connect the two services. The NodeGoat web service is exposed to the host through port 4000, while MongoDB is accessed internally by the application through the Docker service address mongo:27017. Two major runtime trust boundaries were identified: between the external browser and NodeGoat, and between NodeGoat and MongoDB. These trust boundaries and data flows form the basis for the STRIDE threat analysis performed in the next phase.

Phase 4 screenshots checklist

By the end of Phase 4, Member 1 should have:

P4-01-IT24104385-branch.png
P4-02-compose-services-running.png
P4-03-nodegoat-running.png
P4-04-docker-compose-file.png
P4-05-dockerfile.png
P4-06-nodegoat-logs.png
P4-07-mongodb-logs.png          optional
P4-08-docker-network.png
P4-09-nodegoat-architecture.png
P4-10-member1-github-commit.png

You don't need all ten inside the main report. Keep all as evidence and choose the strongest 3–4 for the actual report.

Phase 4 completion condition

Phase 4 is complete when:

✅ Member 1 branch IT24104385 exists
✅ NodeGoat + MongoDB run through Docker Compose
✅ NodeGoat opens on localhost:4000
✅ Docker network is understood
✅ Dockerfile is understood
✅ docker-compose.yml is understood
✅ Data flow is understood
✅ Trust boundaries identified
✅ Architecture diagram created
✅ Architecture files committed by IT24104385
✅ Screenshots saved

Then Member 1 pauses their major work until later phases.

The next main owner becomes:

Phase 5 → Member 2 → IT24100555 → STRIDE + Risk Assessment + Semgrep baseline.

Sources
ok. now i need phase 5

Yes. Phase 5 belongs mainly to Member 2 — IT24100555.

This phase is:

Threat Modelling + Risk Assessment + Semgrep baseline scan

Do not fix vulnerabilities yet. The actual four vulnerability fixes still belong to Phase 6.

The assignment requires at least 4 realistic, application-specific STRIDE threats, likelihood/impact ratings with justification, threat-to-control mapping, and SAST evidence before/after the fixes.

PHASE 5 — Member 2: IT24100555

Before starting, Member 1's Phase 4 architecture should ideally be merged into master, because Member 2 needs that architecture for STRIDE.

Step 1 — Create Member 2 branch

First:

git checkout master

Then:

git pull origin master

Check:

git status

You want:

nothing to commit, working tree clean

Now create the Member 2 branch:

git checkout -b IT24100555

Push it:

git push -u origin IT24100555

Verify:

git branch

Expected:

* IT24100555
  master
📸 Screenshot required

Save:

P5-01-IT24100555-branch.png
Step 2 — Understand what STRIDE means

STRIDE is the threat-modelling method required by your assignment.

S = Spoofing
T = Tampering
R = Repudiation
I = Information Disclosure
D = Denial of Service
E = Elevation of Privilege

Very simply:

STRIDE	Meaning
Spoofing	Pretending to be another user/system
Tampering	Unauthorized modification of data
Repudiation	User denies performing an action because evidence/logging is weak
Information Disclosure	Unauthorized information exposure
Denial of Service	Making the system unavailable
Elevation of Privilege	Getting permissions the attacker should not have

You do not need one threat from every STRIDE category.

The assignment only requires at least 4 realistic threats.

Step 3 — Use Phase 4 architecture

Member 2 should study the architecture created by Member 1.

You should have something like:

User / Browser
      |
      | HTTP :4000
      ↓
====================
Trust Boundary 1
====================
      ↓
NodeGoat
Node.js + Express
      |
      | MongoDB
      ↓
====================
Trust Boundary 2
====================
      ↓
MongoDB

Later:

Developer
    |
    | git push
    ↓
GitHub
    ↓
GitHub Actions

From that architecture, identify:

Assets
Entry points
Trust boundaries
Data flows
Attack surfaces
Step 4 — Identify important assets

Create a file/folder for threat modelling.

In PowerShell:

mkdir security

Then create:

security/
└── threat-model.md

Open threat-model.md in VS Code.

Start with:

# NodeGoat Threat Model

## Assets

- User credentials
- Authentication/session information
- User profile and application data
- MongoDB database records
- NodeGoat source code
- Docker/container configuration
- GitHub repository
- CI/CD pipeline
- CI/CD secrets
What is an asset?

Something valuable that must be protected.

For example:

passwords
user accounts
database records
source code
GitHub secrets
Step 5 — Identify entry points

Add:

## Entry Points

- NodeGoat login form
- Registration form
- User input fields
- URL/query parameters
- HTTP requests to NodeGoat
- Application routes
- Database queries
- GitHub repository pushes
- GitHub Actions workflow inputs

The most important runtime entry point is:

Browser
   ↓
HTTP request
   ↓
NodeGoat

Anything supplied by the browser must be treated as potentially malicious.

Step 6 — Identify trust boundaries

Add:

## Trust Boundaries

### TB1 - Browser to NodeGoat
User-controlled input crosses from an untrusted client into the NodeGoat application.

### TB2 - NodeGoat to MongoDB
Application-generated database operations cross from the application layer to the database layer.

### TB3 - Developer to GitHub
Source code and configuration are pushed from developer systems to the shared repository.

### TB4 - GitHub to GitHub Actions
Repository code and secrets are consumed by automated CI/CD jobs.

This connects directly to the Phase 4 architecture diagram.

Step 7 — Create the initial STRIDE threats

Do not copy generic threats.

We need threats tied to NodeGoat.

Use this as your initial working threat model.

Threat T1 — Injection against MongoDB query
STRIDE:
Tampering / Information Disclosure

Component:
Browser → NodeGoat → MongoDB

Attack scenario:
An attacker provides specially crafted input that changes
how a database query is interpreted.

Potential result:
Unauthorized information could be accessed or application
data could be manipulated.

This is a strong threat because NodeGoat accepts user input that later reaches application/database logic.

Threat T2 — Malicious script stored/displayed by NodeGoat
STRIDE:
Tampering / Information Disclosure

Component:
Browser → NodeGoat → other users' browsers

Attack scenario:
An attacker submits malicious script content into an
application input that is later rendered without sufficient
encoding or sanitization.

Potential result:
The script could execute in another user's browser.

This corresponds to an XSS-style threat.

Threat T3 — Unauthorized access to another user's data
STRIDE:
Elevation of Privilege / Information Disclosure

Component:
NodeGoat routes and application logic

Attack scenario:
An authenticated user manipulates identifiers or requests
to access information or functions belonging to another user.

Potential result:
Confidential application data may be disclosed or modified.
Threat T4 — Authentication/session misuse
STRIDE:
Spoofing / Elevation of Privilege

Component:
Login/session handling

Attack scenario:
Weak authentication or session handling may allow an
attacker to impersonate another user or obtain unauthorized
access.

Potential result:
Account compromise and unauthorized actions.

These are candidate threats based on your current NodeGoat architecture. When we select the exact four Phase 6 vulnerabilities, update these so they match the actual features you demonstrated.

Do not present unverified details as final facts yet.

Step 8 — Build the STRIDE table

Put this into your threat-model file:

ID	STRIDE	Component	Threat	Security impact
T1	Tampering / Information Disclosure	NodeGoat ↔ MongoDB	Malicious input manipulates a database query	Unauthorized access/manipulation of data
T2	Tampering / Information Disclosure	Browser ↔ NodeGoat	Untrusted content executes in browser	Script execution/session or data exposure
T3	Elevation of Privilege / Information Disclosure	NodeGoat application routes	User accesses another user's information/functions	Unauthorized disclosure/modification
T4	Spoofing / Elevation of Privilege	Authentication/session handling	Attacker impersonates or gains unauthorized access	Account compromise
📸 Screenshot required

Take a screenshot when the table is completed.

Save:

P5-02-stride-threat-table.png
Step 9 — Create your risk scale

The assignment allows a simple 3×3 or 5×5 risk matrix.

For your project, I recommend 3×3 because it is easier to explain in the viva.

Use:

Likelihood:
1 = Low
2 = Medium
3 = High

Impact:
1 = Low
2 = Medium
3 = High

Formula:

Risk Score = Likelihood × Impact

Then:

1–2 = Low
3–4 = Medium
6–9 = High
Step 10 — Create risk matrix

Use:

Likelihood ↓ / Impact →	1 Low	2 Medium	3 High
3 High	3 Medium	6 High	9 High
2 Medium	2 Low	4 Medium	6 High
1 Low	1 Low	2 Low	3 Medium
📸 Screenshot required

Save:

P5-03-risk-matrix.png
Step 11 — Give each threat a risk rating

For now, use a working assessment like this:

ID	Likelihood	Impact	Score	Risk
T1	3 High	3 High	9	High
T2	3 High	2 Medium	6	High
T3	2 Medium	3 High	6	High
T4	2 Medium	3 High	6	High

But do not simply write the numbers.

The assignment requires justification.

Step 12 — Write the justification

Example:

T1 — Injection

Likelihood: High

User-controlled input reaches application logic and database operations, making injection a realistic attack path if query construction is unsafe.

Impact: High

Successful exploitation could expose or manipulate data stored in MongoDB.

T2 — XSS-style threat

Likelihood: High

NodeGoat accepts and displays user-controlled information, creating a realistic opportunity for malicious script content if output is not properly handled.

Impact: Medium

Successful exploitation could affect users viewing the malicious content and potentially expose browser-side information.

T3 — Unauthorized resource access
Likelihood: Medium

Exploitation requires an authenticated user and manipulation of application requests or identifiers.

Impact: High

Successful exploitation could expose or alter information belonging to another user.

T4 — Authentication/session attack

Likelihood: Medium
The attacker must successfully exploit a weakness in authentication or session handling.

Impact: High

Successful exploitation could result in account impersonation and unauthorized application actions.


Threat-to-control mapping
| Threat                    | Planned control                                   | Location/status           |
| ------------------------- | ------------------------------------------------- | ------------------------- |
| T1 Injection              | Safe database query handling and input validation | Phase 6 secure coding fix |
| T2 Script injection       | Output encoding/input handling                    | Phase 6 secure coding fix |
| T3 Unauthorized access    | Server-side authorization checks                  | Phase 6 secure coding fix |
| T4 Auth/session misuse    | Stronger authentication/session controls          | Phase 6 secure coding fix |
| Repository secrets        | Gitleaks + GitHub Secrets                         | Member 4 / Phases 7–8     |
| Source-code weaknesses    | Semgrep                                           | Member 2 / Phases 5 & 7   |
| Vulnerable dependencies   | npm audit                                         | Member 3 / Phase 7        |
| Vulnerable image packages | Trivy                                             | Member 1 / Phase 7        |
