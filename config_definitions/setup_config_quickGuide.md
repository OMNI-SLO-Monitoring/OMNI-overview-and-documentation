# How to setup & use config for service 

1. Copy .env file into root directory of your service (.env file can be found in this folder). File includes default configurations for every service of the system (Service Ids and URLs).

    ```
    Do not change .env file in documentation Repository, unsless you are changing config for the entire system!!
    ```

2. Enter custom configurations in your copied .env file for example:
    > ACCOUNT_ID=12345

3. Install nestjs config: 
    > $ npm i --save @nestjs/config

4. Register _ConfigModule_ in your AppModule.

    ![Register ConfigModule](pics/4.png)

    Use the **isGlobal: true,** tag if you want to use the config in every module. Otherwise import separately for every module. 

5. Inject ConfigService where you want to use data from config-file. 

    ![Inject ConfigService](pics/5.png)

6. Use config data via the _get()_ method of the configService. 

    ![Config _get()_ method](pics/6.png)

    Second parameter of the _get()_ method is an optional default value in case the filed does not exist in the configuration file. 

7. Congratulations: You have made it!