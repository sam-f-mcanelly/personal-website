export const skillToColor = {
    // Tools - pink
    'VS Code': 'pink',
    'Postman': 'pink',
    'Jest': 'pink',
    'GitHub': 'pink',
    'Vercel': 'pink',
  
    // AWS Services - orange
    'Lambda': 'orange',
    'API Gateway': 'orange',
    'CloudFormation': 'orange',
    'CloudWatch': 'orange',
    'SQS': 'orange',
  
    // Languages - blue
    'Kotlin': 'blue',
    'Java': 'blue',
    'JavaScript': 'blue',
    'Python': 'blue',
    'TypeScript': 'blue',
    'TailwindCSS': 'blue',
  
    // Frameworks - red
    'Dagger': 'red',
    'Spring': 'red',
    'CDK': 'red',
    'MockK': 'red',
    'JUnit': 'red',
    'Next.js': 'red',
    'React': 'red',
    'Node.js': 'red',
    'Ktor': 'red',
  
    // Focus Areas - green
    'Infrastructure as Code': 'green',
    'Back-end (Ktor, RPC, REST)': 'green',
    'Serverless': 'green',
    'Scalability': 'green'
  } as const;
  
  export type Skill = keyof typeof skillToColor;
  export type Color = typeof skillToColor[Skill];