# IE3142 NodeGoat DevSecOps Project

This repository contains the IE3142 DevOps Security group project based on
OWASP NodeGoat. The project demonstrates a DevSecOps workflow that combines
containerization, threat modelling, secure coding, CI/CD, automated security
scanning, and secrets management.

## Team Responsibilities

| Member | Main Responsibilities |
| --- | --- |
| IT24104385 | Application, Docker, Injection fix, Trivy |
| IT24100555 | Threat modelling, CSRF fix, Semgrep |
| IT24101102 | CI/CD pipeline, Access Control fix, npm audit |
| IT24102878 | Secrets management, Sensitive Data fix, Gitleaks |

## Security Improvements

The project demonstrates fixes for four application security issues:

- Server-side JavaScript injection
- Cross-Site Request Forgery (CSRF)
- Broken function-level access control
- Sensitive configuration exposure

## DevSecOps Pipeline

GitHub Actions automatically performs:

1. Build and unit testing
2. npm dependency scanning
3. Semgrep SAST
4. Gitleaks secret scanning
5. Trivy container-image scanning

Gitleaks is configured as a blocking security gate for newly detected secrets.

## Secrets Management

Sensitive runtime configuration is supplied using environment variables.

Required variables:

- MONGODB_URI
- COOKIE_SECRET
- CRYPTO_KEY
- ZAP_API_KEY

Real values must not be committed to Git.

Copy `.env.example` to `.env` and provide local values before starting the
application.

## Running Locally

### 1. Clone the repository

```powershell
git clone https://github.com/it24102878/IE3142-NodeGoat-DevSecOps.git
cd IE3142-NodeGoat-DevSecOps