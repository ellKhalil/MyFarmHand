const fs = require('fs');
const files = [
  'resources/js/Pages/Modules/Users.jsx',
  'resources/js/Pages/Modules/Tasks.jsx',
  'resources/js/Pages/Modules/Finance.jsx',
  'resources/js/Pages/Modules/Inventory.jsx',
  'resources/js/Pages/Modules/Payroll.jsx',
  'resources/js/Pages/Modules/Settings.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // We are looking for an extra </div> followed by the form comment
    // e.g. </div>\n\n                    </div>\n\n                    {/*
    content = content.replace(/<\/div>\n+\s*<\/div>\n+\s*{\/\*/g, '</div>\n\n                    {/*');
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
});
