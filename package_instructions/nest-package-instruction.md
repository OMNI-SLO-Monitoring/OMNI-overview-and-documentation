## How to create a reuseable NestJS Package

This is useful, if you want to reuse Nest Modules/Components/Services/... in other Nest Projects.

Example: [cpu-utilization-observer](https://github.com/ccims/cpu-utilization-observer)

# Setup

1. Create Folder and initialize Node Package

```
    mkdir PACKAGE_NAME
    cd PACKAGE_NAME
    npm init    // Follow the steps to initialize npm package 
```

2. install the following dependencies and dev dependencies

```
    npm install @nest/common rxjs reflect-metadata
    npm install -d @types/node rimraf typescript
```

3. Afterwards go to your `package.json` and change/add `main`, `types`, `scripts` to the following

```
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "rimraf dist && tsc",
        "prepublish": "npm run build"
    },
```

4. Run `npm install`

5. Create `tsconfig.json` file in your folder

6. Add following code to `tsconfig.json`

```
    "compilerOptions": {
        "experimentalDecorators": true,
        "target": "es2017",
        "module": "commonjs",
        "lib": ["es2017", "es7", "es6"],
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "noImplicitAny": false,
        "strictNullChecks": false,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "emitDecoratorMetadata": true
    },
    "exclude": [
            "node_modules",
            "dist"
        ]
    }
```

7. Create `src` folder. Add your Nest code in this folder.

8. Add a `index.ts` file in your `src` folder. In this file you export your Nest Code, that you want to use outside of this package. For Example:

```
    import { CpuUtilizationModule } from "./cpu-utilization-observer.module";
    import { CpuUtilizationService } from "./cpu-utilization.service";

    export { CpuUtilizationModule, CpuUtilizationService }
```

This exports a Module and a Service, wich you can import/provide in your Nest Project

9. Run `npm run build`. This will compile your code to into the `dist` folder.

10. Create a `.gitignore` file and ignore the node_modules folder by adding `/node_modules`

11. On GitHub create a repo and follow the steps to push your code to the repo

# How to use the Package

You can install the package with `npm i GITHUB_REPO_LINK`. In you Project you can now import the modules you have exported in `src/index.ts`.

Alternatively you can also install a local package before pushing it to a repo wiht `npm i PATH_TO_PACKAGE`, this will make the developing process easier.
