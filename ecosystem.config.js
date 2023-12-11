// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  EXPRESS_PORT,
  DATABASE_NAME,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    script: './dist/app.js',
    env_env_production: {
      NODE_ENV: 'production',
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      EXPRESS_PORT,
      DATABASE_NAME,
    },
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
      ssh_options: 'ForwardAgent=yes',
    },
  },
};
