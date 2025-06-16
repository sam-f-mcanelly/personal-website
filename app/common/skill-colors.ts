// src/common/colors.ts

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
    'DynamoDB': 'orange',
    'S3': 'orange',
    'IAM': 'orange',
    'SNS': 'orange',
  
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
  
  export const colorClasses = {
    pink: {
      bg: 'bg-pink-500/20',
      text: 'text-pink-300',
      border: 'border-pink-500/30',
      borderHover: 'hover:border-pink-500/50'
    },
    orange: {
      bg: 'bg-orange-500/20',
      text: 'text-orange-300',
      border: 'border-orange-500/30',
      borderHover: 'hover:border-orange-500/50'
    },
    blue: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-300',
      border: 'border-blue-500/30',
      borderHover: 'hover:border-blue-500/50'
    },
    red: {
      bg: 'bg-red-500/20',
      text: 'text-red-300',
      border: 'border-red-500/30',
      borderHover: 'hover:border-red-500/50'
    },
    green: {
      bg: 'bg-green-500/20',
      text: 'text-green-300',
      border: 'border-green-500/30',
      borderHover: 'hover:border-green-500/50'
    }
  } as const;
  
  export type ColorClasses = typeof colorClasses;
  
  // Helper function to get color classes
  export const getColorClasses = (color: Color) => {
    return colorClasses[color];
  };