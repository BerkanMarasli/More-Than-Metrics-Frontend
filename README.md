# More-Than-Metrics

Welcome to More Than Metrics, where candidates are considered something more than just metrics and recruiters can
see the true personality of a person without discriminating them by their appearance

## Contents

- [Objective](#Objective)
- [User Manual](#User-Manual)
- [Our Team](#Our-Team)

## Objective

The goal of this website is that both candidates and companies will have an enjoyable experience when either applying for a job,
or looking for potential employees.
The companies looking for potential candidates will have a whole different experience from the candidates which will hopefully make the recruitment process
more fun for the recruiter and the candidate. <br/><br/>

Our first initial plan for the project was to make a recruitment website that would make the recruiters job more fun, enjoyable, and more efficient.
However after looking through the ideas and features we, as a group, realised that the recruitment process in general is already extremely efficient
for the recruiter however they were making it efficient at the expense of the applicants and candidates that were trying to apply for the places. <br />
This is when we decided to make a recruitment website that made the applying process fairer for everyone involved,
anonymising the candidates and taking the bare metrics out of the data. The name ‘More Than Metrics’ Came from the idea that the website cares
more than just about the metrics of a person, and wants to know what the personalities are of that person. <br/>

This project was built with the Javascript coding language, using MaterialUI and recharts to help flesh out the front end,
and using PostGreSQL with data being posted to ElephantSQL to help handle the back end and API components.<br/>

The core features for the candidate are:

- Registering a Candidate account
- Logging into your Candidate account
- See a Job board for all of the available jobs
- Be able to search for specific jobs or companies
- Be able to view companies
- Most importantly be able to apply for a job

The core features for the company are:

- Registering a Company account
- Logging into your Company account
- Accessing a Company dashboard
- Seeing Company application stats for the whole company
- Seeing Company application stats for each job
- Be able to review applications to their jobs
- Be able to accept or reject applications
- Be able to see candidate details from accepted applications

## User Manual

Welcome to "More than metrics", a website that helps candidates to find jobs without being judged just by their grades as well as companies find the
right kind of employees through something other than just a CV!
This user manual is here to help you navigate around the website letting you make the most of our website, I hope you have a pleasnat recruitment journey!

(IMG OF FRONT PAGE)<br />
This is the Front page and the first thing a new user would see, if you have already signed up with us then you can skip to the logging in process by
clicking the burger menu and clicking the login button <br />
(IMG OF BURGER MENU)<br />
The login section is [here](#Login). <br/>
If this is your first time and you want to register you can scroll down on the Front page, or click the little arrow which will take you down to the
registering buttons.<br />
(IMG OF BUTTONS)<br />
Depending on who you are you can register for a specific account type, clicking on the respective button to create the account of your type<br />

### Registration

#### Candidate Registration

(IMG CANDIDATE SIDE)<br />
As a candidate you will first need to fill in your details, this is so that the recruiter can finally contact you when your application gets accepted.
This page will allow you to register a candidate account with us!<br />
The candidate register form requires 9 fields to be completed:

- First Name
- Last Name
- Email
- Phone Number
- Years in industry
- Candidate headline
- Password
- Confirm Password

All of these fields need to be completed otherwise you are unable to create the account,
if a certain field doesn’t have an input then an error message will be shown to alert you.
For example if I didn’t insert a First Name then an error message would appear like so… <br />
(IMG OF ERROR FIRST NAME)<br />
You can click on the years in industry drop down to choose the category you belong to like so…<br />
(IMG OF DROP DOWN YEARS)<br />
You can also choose the technologies that you think you know by clicking on the chips inside of the technologies drop down box,
you can choose multiple different chips to show all the different technologies you know like so…<br />
(IMG OF DROP DOWN CHIPS SELECTING MULTIPLE IN TECHNOLOGIES)<br />
There are a few restrictions on these fields:

- First Name, Last Name, and candidate headline must be at least 2 letters long.
- Email must be a valid email address
- Phone number must be 12 numbers.
- Passwords must be 8 characters long, one upper case, one lower case, one digit and one special character.
- Headline must be less than 100 characters.
- Confirm Password must be the same as password.

When trying to submit if you submit an email address which already has been recorded, an error telling you so will appear like so…<br />
(IMG OF EMAIL IS TAKEn MESSAGE)<br />
After you finish filling out all the fields correctly and no emails are the same you will be redirected to the Login page<br />

#### Company Registration

(IMG OF COMPANY REGISTER)<br />
We will move onto the company side so that companies can register to list their jobs<br />
As a company you will first need to fill in your details, this is so that you as a company can start posting jobs for candidates to apply to.
This page will allow you to register a company account with us!<br />
The company register form requires 10 fields to be completed:

- Company Logo URL
- Company Name
- Company Bio
- Number of employees
- Female percentage
- Retention rate
- Location
- Email
- Password
- Confirm Password

Like candidate profiles all of these fields need to be completed otherwise you are unable to create the account,
the number of employees is accessible through a drop down box.
If any of these fields are filled incorrectly a warning will appear telling the error.
Also like candidate registration there are some restrictions on these fields:

- Company name and location must be 2 or more characters
- Bio must be at most 500 characters long
- Female percentage and retention rate must be numbers between 0 and 100.

Registering a company will also redirect you to the Login page<br />

### Login

(IMG OF LOGIN PAGE)<br />
This is the Login page, which is accessible after you register a new account,
or if you already have an account is accessible by the burger menu in the top right corner of the front page.
There are also 2 buttons on the page in case you don’t have an account and want to register a new account,
the buttons will take you to their respective registering pages.<br />
This form has 2 fields:

- Email
- Password

If you input an incorrect email address then an error will appear telling you the account doesn’t exist like so..<br />
(IMG OF ERROR)<br />
If you input a correct email address but the password doesn’t match the correct email then you will also get an error telling you that the
password is incorrect like so... <br />
(IMG OF ERROR)
When both your account email address and your password are correct you will be logged into your account. Depending on what account type you have will
depend on what you see. We will be looking through how a candidate maneuvers through the website on their account,
if you are only interested in the company side, click [here](#Company)<br />

### Candidate

(IMG OF CANDIDATE SIDE DASHBOARD)<br />
When you log in as a candidate, you will instantly be shown a job board, this job board contains the job listings available. <br />
Each job has 3 buttons:

- Company
- View Job
- Apply to job

You can change pages on the job board by the buttons at the bottom of the job board <br />
You also have 3 buttons in the navigation bar <br />

- Jobs
- Profile
- Logout

We will look at the job options first, clicking on the company button will bring up a modal which contains the information about the company<br />
(IMG OF COMPANY MODAL)<br />
In the modal there is a list of jobs which are from the company with the same 2 buttons ‘View Job’ and ‘Apply’.
Clicking outside the modal will bring you back to the original job board.<br />
Clicking on view job will bring up a modal which contains the information about the job<br />
(IMG OF JOB MODAL)<br />
In the modal there is the list of responsibilities and technologies that are desired for that certain role there is also some company
information and an apply button for applying to that job, clicking off the modal will bring you back to the previous page.<br />
Clicking on the apply button will bring up the application form<br />
(IMG OF APPLICATION FORM)<br />
The application form includes the job details as well as the form for applying<br />
This application form has 6 input fields:

- Prompt 1, 2, and 3
- Answers 1, 2, and 3

These all have to be filled in, the prompts are all in dropdown boxes allowing you to choose which questions you want to answer,
and then you can fill in the answers with the boxes below the questions.
After clicking the submit button you will be prompted with a successful application message, then you can just sit back and wait for a reply <br />
(IMG OF SUCCESS ALERT)<br />
When you have applied to some jobs, you can click on your profile to see your own details as well as see your applications and the current progress
of those applications.<br />
(IMG OF PROFILE)<br />

On the left of the profile you have your details, on the right you have the jobs you have applied to, each job has a small marker next to it indicating
the progress made in the application, green meaning accepted, red meaning rejected, and yellow indicating the application is still pending.
Use the arrows under the applied to area to click through all your applications. <br/>
If you want to change your details you can click the button on the left side indicated as edit, when you click the edit button the form will be changeable
and all the validation needed for registering will be applied to this form as well. <br/>
(IMG OF EDIT SIDE)<br/>
You need to have all the fields filled in, this is pre-filled for you and will stay the same unless you change it yourself.<br/>
NOTE: the only field you don’t need filled is the password field, if you don’t want to change your password then you can just leave it blank.<br/>
When you successfully update your details you will get a success message like so…<br/>
(IMG OF SUCCESS MSG)<br/>

If you are done with applying and want to log out, click the logout screen, you will then be redirected back to the front page.<br/>

### Company

## Our Team

**Kasia - Project Manager**<br />
Our leader who is spearheading the movement to remove bias and discrimination from the recruitment process
<br /><br/>
**Berkan** <br />
Cultivated the recruitment website idea, working through thick and thin to make sure the website is running smooth
<br /><br />
**Kobi**<br />
Front end developer, letting you, and everyone else sign up to our website to start your journey
<br /><br />
**Sang**<br />
The skewer of the team, connecting everything together one endpoint at a time, and one database at a time
<br /><br />
