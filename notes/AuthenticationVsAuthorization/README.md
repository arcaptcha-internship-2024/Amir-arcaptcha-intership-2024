# Authentication VS Authorization

In the case of data security, Authentication and Authorization are 2 different utils and they has many differences in their core. 

## Table of content:

| Title | Link |
| --- | --- |
| What is Authentication? | [link](#what-is-authentication) |

### What is Authentication?

Authentication is the process of answering this question: `Who you are?`. By answering to this question, you will identify consumer to ensure they're who they claim to be. This method will usually use `username` and `password` or in some cases biometric information.

### What is Authorization?

Authorization is the method of figuring out and granting permissions of an authenticated user. It says that user has permission to access the entities or not. It will come after `Authentication` and confirm that the authenticated user has the proper rights to use to use certain data, applications or services. 

| Authentication Techniques | Autorization techniques |
| --- | --- |
| Password-base authentication | Role-Based Access Controls (RBAC) |
| Passwordless authentication | JWT Authorization |
| 2FA/MFA (2 Factor authentication / Multi factor authentication) | SAML Authorization |
| Social Authentication | OAuth 2.0 Authorization |
