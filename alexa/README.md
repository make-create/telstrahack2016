Alexa Skill Setup
=====

This is the make-create team's AWS Lambda Nscript for alexa interaction.

To use:

1. Log into AWS Console
2. Open Lambda > Create Lambda Function
3. Type 'alexa' when searching templates
4. Pick ' alexa-skills-kit-color-expert'
5. Next > copy-paste `index.js` code under 'Lambda Function Code'
6. Finish
7. Make sure your Echo is setup to your developer account
8. Go to AWS Developer Centre > Alexa
9. Create alexa skill, using details in `DeveloperPortalSetup.txt`
10. Make sure the Lambda ARN is replaced with the one you created (in Step 6)
11. Go to Alexa SPA > Skills > Your Skills
12. The skill/app you created in step 10) should appear there
13. Talk to Alexa: Say "Alexa open [skill name]", "Alexa ask [skillname] how is Xavier"
14. With some luck this will work.
15. You can make further refinements to lambda via AWS Console.
