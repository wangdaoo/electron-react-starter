import chalk from 'chalk';
import detectPort from 'detect-port';

const port = process.env.PORT || '1212';

/**
 * 检查端口是否被占用
 * @param {string} port 端口号
 */
detectPort(port, (err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`
      )
    );
  } else {
    process.exit(0);
  }
});
