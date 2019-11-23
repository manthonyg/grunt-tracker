module.exports = plop => {
    plop.setGenerator('component', {
      description: 'Create a reusable component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your component name?',
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
          templateFile:
            'plop-templates/Component.js.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/__tests__/{{pascalCase name}}.test.js',
          templateFile:
            'plop-templates/Component.test.js.hbs',
        },
        {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/__stories__/{{pascalCase name}}.stories.js',
        templateFile:
            'plop-templates/Component.stories.js.hbs',
        }
      ],
    })
  
    plop.setGenerator('screen', {
      description: 'Create a screen',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is the screen name?',
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/screens/{{pascalCase name}}/{{pascalCase name}}.js',
          templateFile:
            'plop-templates/Component.js.hbs',
        },
        {
          type: 'add',
          path: 'src/screens/{{pascalCase name}}/{{pascalCase name}}.test.js',
          templateFile:
            'plop-templates/Component.test.js',
        },
      ],
    })
  
}