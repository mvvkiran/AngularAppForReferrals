Go to workspace
run : ng new (enter thr folder name)
cd new folder name (the newly generated one)
open VSCode
Open Terminal
Type claude and enter
Prompt Command : [Image #1]. This is a screenshot. As an experience Angular UI architect with 15 years of experience, I want to generate Angular application which has exactly the same look and feel. The screenshot has various components, such as a table, and a box for Prospect, Won and Lost. Once the application is generated, use Playwright to run the end to end testing. Use Playwright iteration Agentic Loop to ensure the look and feel in the table and other components and sections in the screenshot and the generated app are exactly the same. I have already generated boilerplate angular code using ng new. Just add the rest of the UI components as per the attached screenshot . In case any test cases fail, fix them and ensure all the test cases pass

Once CC successfully executes the prompt, it will generate the test report. In case if the test cases fail, it will let us know.
Then run prompt command : fix the test cases and ensure all the test cases pass. Ensure the look and feel is same in both screenshot and generated app

Once all the test cases are successful,
run the below commands:
npm start

then open browser and enter http://localhost:4200/