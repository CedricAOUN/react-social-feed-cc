## How to start project

- Open 2 terminals/cmdlines
- Get your local IPV4 address with `ipconfig`(Windows) or `ip -4 a`(Linux)
- Set `API_URL` in file `api.ts` as the IPv4 address of your machine.
- Exec `npm run start` in a terminal
- Exec `npm run server` in the other terminal

## Resetting DB

To reset DB to original state, run one of the following command in the root:
- Linux/Bash/Mac: `npm run reset-db`
- Windows CMD: `npm run reset-db:cmd`
- Windows Powershell: `npm run reset-db:powershell`

Project should now be up and running.