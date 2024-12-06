import { environment } from 'src/environments/environment';

export const urls = {
  gateway: `http://${environment.apiUrl}:8080/dis`,
  user: `http://${environment.apiUrl}:8081`,
  academics: `http://${environment.apiUrl}:8082`,
  administration: `http://${environment.apiUrl}:8083`,
  infrastructure: `http://${environment.apiUrl}:8084`,
  moodle: `http://${environment.apiUrl}:8087`,
  phd: `http://${environment.apiUrl}:8089`,
  eureka: `http://${environment.apiUrl}:8761`,

};
