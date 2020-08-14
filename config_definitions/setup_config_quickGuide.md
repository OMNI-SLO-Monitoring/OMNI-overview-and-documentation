# How to setup & use config for service 


## Nest:

1. Copy .env file into root directory of your service (.env file can be found in this folder). File includes default configurations for every service of the system (Service Ids and URLs).

    
    > Do not change .env file in documentation Repository, unsless you are changing config for the entire system!!
    

2. Enter custom configurations in your copied .env file for example:
    ```
    ACCOUNT_ID=12345
    ```

3. Install nestjs config: 
    ```
     $ npm i --save @nestjs/config
     ```

4. Register _ConfigModule_ in your AppModule.

    ``` typescript
    import { Module, HttpModule } from '@nestjs/common';
    import {ConfigModule} from '@nestjs/config';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { ConfigHandlerModule } from './config-handler/config-handler.module';

    @Module({
    imports: [ConfigHandlerModule, HttpModule, ConfigModule.forRoot({isGlobal:true})],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {
    
    }

    ```

    Use the **isGlobal: true,** tag if you want to use the config in every module. Otherwise import separately for every module. 

5. Inject ConfigService where you want to use data from config-file. 

    ``` typescript
    export class ConfigHandlerService {

    constructor(private readonly configService: ConfigService){
     
    }
    ```

6. Use config data via the _get()_ method of the configService. 

    ``` typescript
    this._databaseUrl = configService.get<string>('DB_SERVICE_URL');
    this.monitorUrl = configService.get<string>("RESPONSE_MONITOR_URL", "http://localhost:3400");
    ```

    Second parameter of the _get()_ method is an optional default value in case the filed does not exist in the configuration file. 

7. Congratulations: You have made it!

## Angular:

Temporary solution: Put all necessary environment variables into the environment.ts folder which can be found under src/environment. 

``` typescript
export const environment = {
  production: false,
  BACKEND_DB_SERVICE_URL: "http://localhost:3000/",
  BACKEND_PRICE_SRVICE_URL: "http://localhost:3300/",
  BACKEND_RESPONSE_MONITOR_URL: "http://localhost:3400/",
  BACKEND_CPU_MONITOR_URL: "http://localhost:3100/",
  BACKEND_ISSUE_CREATOR_URL: "http://localhost:3500/",

  FRONTEND_DB_SERVICE_URL: "http://localhost:4000/",
  FRONTEND_PRICE_SERVICE_URL: "http://localhost:4300/",
  FRONTEND_ACCOUNT_SERVICE_URL: "http://localhost:4100/",
  FRONTEND_MONITORING_SERVICE_URL: "http://localhost:4200/",
};
```

Whether a .env file should be inserted via a script will be discussed for future sprints. 

