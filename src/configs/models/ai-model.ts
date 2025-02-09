import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const courseOutlineMethod = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a study material for python for exam and level of difficulty will be EASY with summary of course ,list of chapters along with summary for each chapter,Topic list in each chapter,all result in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseSummary\": \"This introductory Python course covers the fundamental concepts and syntax needed to write basic Python programs.  It's designed for beginners with little to no prior programming experience and prepares you for introductory programming exams.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Introduction to Python\",\n      \"chapterSummary\": \"This chapter introduces Python, its applications, and setting up your programming environment. We'll cover basic syntax and running your first Python program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Python's applications\",\n        \"Installing Python\",\n        \"Setting up your IDE (e.g., VS Code, Thonny)\",\n        \"Running your first Python program\",\n        \"Basic Syntax (indentation, comments)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Data Types and Variables\",\n      \"chapterSummary\": \"This chapter explores fundamental data types in Python (integers, floats, strings, booleans) and how to work with variables.\",\n      \"topics\": [\n        \"Integers\",\n        \"Floating-point numbers\",\n        \"Strings\",\n        \"Booleans\",\n        \"Variables and assignment\",\n        \"Type conversion\",\n        \"Variable naming conventions\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Operators\",\n      \"chapterSummary\": \"This chapter covers arithmetic, comparison, logical, and assignment operators used in Python expressions.\",\n      \"topics\": [\n        \"Arithmetic operators (+, -, *, /, //, %, **)\",\n        \"Comparison operators (==, !=, >, <, >=, <=)\",\n        \"Logical operators (and, or, not)\",\n        \"Assignment operators (=, +=, -=, *=, /=)\",\n        \"Operator precedence\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Input and Output\",\n      \"chapterSummary\": \"Learn how to get input from the user and display output using the `input()` and `print()` functions.\",\n      \"topics\": [\n        \"The `print()` function\",\n        \"Formatting output\",\n        \"The `input()` function\",\n        \"Getting user input\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Control Flow (if-else statements)\",\n      \"chapterSummary\": \"This chapter introduces conditional statements (`if`, `elif`, `else`) to control the flow of execution in your programs.\",\n      \"topics\": [\n        \"The `if` statement\",\n        \"The `elif` statement\",\n        \"The `else` statement\",\n        \"Nested `if` statements\",\n        \"Boolean expressions\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Loops (for and while loops)\",\n      \"chapterSummary\": \"Learn about loops (`for` and `while`) for repeating blocks of code.\",\n      \"topics\": [\n        \"The `for` loop (iterating through sequences)\",\n        \"The `range()` function\",\n        \"The `while` loop\",\n        \"Loop control statements (`break`, `continue`)\",\n        \"Nested loops\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Lists and Tuples\",\n      \"chapterSummary\": \"This chapter introduces lists and tuples – fundamental data structures for storing collections of items.\",\n      \"topics\": [\n        \"Lists: creation, access, modification\",\n        \"List methods (append, insert, remove, etc.)\",\n        \"Tuples: creation, access\",\n        \"Difference between lists and tuples\",\n        \"List slicing\"\n      ]\n    },\n        {\n      \"chapterTitle\": \"Basic Functions\",\n      \"chapterSummary\": \"Learn to define and use functions to modularize your code and improve readability.\",\n      \"topics\": [\n        \"Defining functions\",\n        \"Function parameters\",\n        \"Return values\",\n        \"Function calls\",\n        \"Scope of variables\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Generate a study material for python for exam and level of difficulty will be EASY with summary of course ,show course title difficulty  level \n list of chapters along with summary for each chapter,Topic list in each chapter,all result in json format\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseTitle\": \"Introduction to Python Programming\",\n  \"difficultyLevel\": \"Easy\",\n  \"courseSummary\": \"This introductory Python course covers the fundamental concepts and syntax needed to write basic Python programs. It's designed for beginners with little to no prior programming experience and prepares you for an introductory programming exam.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Getting Started with Python\",\n      \"chapterSummary\": \"This chapter introduces Python, its applications, and setting up your programming environment. We'll cover basic syntax and running your first Python program.\",\n      \"topics\": [\n        \"What is Python and why learn it?\",\n        \"Installing Python on your system\",\n        \"Choosing an IDE (Integrated Development Environment)\",\n        \"Writing and running your first Python program\",\n        \"Understanding basic Python syntax (indentation, comments)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Variables and Data Types\",\n      \"chapterSummary\": \"This chapter explores fundamental data types in Python (integers, floats, strings, booleans) and how to work with variables.\",\n      \"topics\": [\n        \"Integers, floats, and their operations\",\n        \"Strings and string manipulation (basic concatenation)\",\n        \"Boolean values (True/False)\",\n        \"Declaring and assigning variables\",\n        \"Basic type conversion\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Operators in Python\",\n      \"chapterSummary\": \"This chapter covers arithmetic, comparison, logical, and assignment operators.\",\n      \"topics\": [\n        \"Arithmetic operators (+, -, *, /, //, %, **)\",\n        \"Comparison operators (==, !=, >, <, >=, <=)\",\n        \"Logical operators (and, or, not)\",\n        \"Assignment operators (=, +=, -=, *=, /=)\",\n        \"Order of operations\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Input and Output\",\n      \"chapterSummary\": \"Learn how to get input from the user and display output using the `input()` and `print()` functions.\",\n      \"topics\": [\n        \"The `print()` function and its formatting options\",\n        \"The `input()` function for user interaction\",\n        \"Basic string formatting with f-strings (optional, but recommended)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Control Flow: Making Decisions\",\n      \"chapterSummary\": \"This chapter introduces conditional statements (`if`, `elif`, `else`) to control the flow of execution.\",\n      \"topics\": [\n        \"The `if` statement\",\n        \"The `elif` statement (handling multiple conditions)\",\n        \"The `else` statement (default case)\",\n        \"Nested `if` statements\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Loops: Repeating Actions\",\n      \"chapterSummary\": \"Learn about `for` and `while` loops for repeating blocks of code.\",\n      \"topics\": [\n        \"The `for` loop (iterating through sequences)\",\n        \"The `while` loop (repeating until a condition is false)\",\n        \"Loop control statements (`break`, `continue`)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Lists and Basic Data Structures\",\n      \"chapterSummary\": \"Introduction to lists – ordered, mutable collections of items.\",\n      \"topics\": [\n        \"Creating and accessing lists\",\n        \"Basic list operations (append, insert, remove, etc.)\",\n        \"List slicing (accessing portions of a list)\",\n        \"List comprehensions (optional, for more advanced learners)\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });



    export const generateNotesAIModel = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Generate exam material detail content for each chapter ,Make sure to include all topic point in the content , make sure to give content in html format(Do not add HTMLKL, Head, body, title tag) The chapters : {\n      \"chapterTitle\": \"What is Data Science?\",\n      \"chapterSummary\": \"This chapter introduces the field of data science, its applications, and the key skills and roles involved.\",\n      \"topics\": [\n        \"Definition and scope of data science\",\n        \"The data science process (data collection, cleaning, analysis, visualization, interpretation)\",\n        \"Applications of data science in various fields\",\n        \"Different roles in a data science team (data scientist, data engineer, data analyst)\"\n      ]\n    },"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```html\n<h3>What is Data Science?</h3>\n<p>This chapter introduces the field of data science, its applications, and the key skills and roles involved.</p>\n\n<h4>Definition and scope of data science</h4>\n<p>This section will define data science, differentiating it from related fields like data analysis and machine learning.  It will explore the broad scope of data science, encompassing various techniques and methodologies used to extract knowledge and insights from structured and unstructured data.  Expect questions on the core principles and the overall aim of data science.</p>\n\n<h4>The data science process (data collection, cleaning, analysis, visualization, interpretation)</h4>\n<p>This section details the typical stages involved in a data science project.  It will cover:\n<ul>\n  <li><strong>Data Collection:</strong>  Methods of data acquisition (e.g., web scraping, APIs, databases).  Understanding data sources and their limitations.</li>\n  <li><strong>Data Cleaning:</strong> Handling missing values, outliers, and inconsistencies.  Data transformation and preprocessing techniques.</li>\n  <li><strong>Data Analysis:</strong>  Exploratory data analysis (EDA), statistical analysis, and hypothesis testing.  Understanding descriptive and inferential statistics.</li>\n  <li><strong>Data Visualization:</strong> Creating informative and effective visualizations using various tools and techniques (e.g., histograms, scatter plots, box plots).  Interpreting visualizations to communicate insights.</li>\n  <li><strong>Data Interpretation:</strong> Drawing meaningful conclusions and making informed recommendations based on the analysis and visualization results.  Communicating findings clearly and effectively.</li>\n</ul>\nExpect questions on the order of these steps, the tools used at each stage, and the challenges encountered.</p>\n\n<h4>Applications of data science in various fields</h4>\n<p>This section showcases the versatility of data science across diverse industries.  Examples might include:\n<ul>\n  <li><strong>Business:</strong> Customer segmentation, market research, fraud detection.</li>\n  <li><strong>Healthcare:</strong> Disease prediction, personalized medicine, drug discovery.</li>\n  <li><strong>Finance:</strong> Risk management, algorithmic trading, credit scoring.</li>\n  <li><strong>Technology:</strong> Recommender systems, natural language processing, image recognition.</li>\n</ul>\nExpect questions on specific applications and how data science techniques are utilized in those contexts.</p>\n\n\n<h4>Different roles in a data science team (data scientist, data engineer, data analyst)</h4>\n<p>This section distinguishes between the key roles within a data science team:\n<ul>\n  <li><strong>Data Scientist:</strong> Focuses on building and deploying machine learning models, performing advanced statistical analysis, and interpreting results.</li>\n  <li><strong>Data Engineer:</strong> Responsible for building and maintaining the infrastructure for data processing and storage.  Ensures data quality and accessibility.</li>\n  <li><strong>Data Analyst:</strong>  Performs exploratory data analysis, identifies trends and patterns, and communicates findings to stakeholders using visualizations and reports.</li>\n</ul>\nExpect questions comparing and contrasting these roles, their responsibilities, and the skills required for each.</p>\n```\n"},
            ],
          },
        ],
      });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
//   run();