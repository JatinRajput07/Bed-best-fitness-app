module.exports = {
  apps: [
    {
      name: "my-project",
      script: "npx",
      args: "serve -s dist --listen 3200",
      cwd: "/var/www/Bed-best-fitness-app/Admin",
      interpreter: "none"
    }
  ]
};