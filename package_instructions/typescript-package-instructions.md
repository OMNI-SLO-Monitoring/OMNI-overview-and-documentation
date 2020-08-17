# How to create a reuseable TypeScript Package

Example: [monitoring-cpu-frontend](https://github.com/ccims/monitoring-cpu-frontend)

## Setup

1. Make sure you have TypeScript installed globally. If not, install with `npm i -g typescript`

2. Create Folder and initialize Node Package

```
    mkdir PACKAGE_NAME
    cd PACKAGE_NAME
    npm init    // Follow the steps to initialize npm package 
```

3. Afterwards go to your `package.json` and make sure `main` and `types` have the following values

```
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
```

4. Create `tsconfig.json` file in your folder

5. Add following code to `tsconfig.json`

```
    {
        "compilerOptions": {
            "module": "commonjs",
            "declaration": true,
            "removeComments": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "target": "es2017",
            "sourceMap": true,
            "outDir": "./dist",
            "baseUrl": "./",
            "incremental": true
        },
        "exclude": ["node_modules", "dist"]
    }
```


6. Create `src` folder. Add your TypeScript code in this folder.

7. Add a `index.ts` file in your `src` folder. In this file you export your TypeScript Modules, that you want to use outside of this package. For Example:

```
    import CpuObservationEndpoint from "./cpu-observation-endpoint.model";
    import CpuObservationStatus from "./cpu-observaton-status.model";

    export { CpuObservationStatus, CpuObservationEndpoint }
```

8. Run `npm install`

9. Run `tsc` or `tsc --watch` if you want to keep modifying your code. This will compile your TypeScript code to JavaScript code (compatible with the ECMA Version you have set in `tsconfig.js`) and your TypeScript Types into the `dist` folder.

10. Create a `.gitignore` file and ignore the node_modules folder by adding `/node_modules`

11. On GitHub create a repo and follow the steps to push your code to the repo

## How to use the Package

you can install the package with `npm i GITHUB_REPO_LINK`. In you Project you can now import the modules you have exported in `src/index.ts`
