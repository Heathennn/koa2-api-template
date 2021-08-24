# TypeScript配置

### 在原有项目基础上加入TS

#### 1.添加相关库

```
yarn add -D @types/jsonwebtoken @types/koa @types/koa-compress @types/koa-favicon @types/koa-logger @types/koa-router @types/koa-static @types/koa2-cors @types/log4js @types/node ts-node gulp-typescript

```
#### 2. 在根目录添加tsconfig.json

```
{
    "compilerOptions": {
        "baseUrl": ".", // import的相对起始路径
        "outDir": "./dist", // 构建输出目录
        "module": "commonjs",
        "target": "esnext",// node 环境支持 esnext
        "allowSyntheticDefaultImports": true,
        "importHelpers": true,
        "strict": false,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "noImplicitAny": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedParameters": true,
        "noUnusedLocals": true,
        "noImplicitReturns": true,
        "experimentalDecorators": true, // 开启装饰器的使用
        "emitDecoratorMetadata": true,
        "allowJs": true,
        "sourceMap": true,
        "paths": {
          "@/*": [ "src/*" ]
        }
      },
    "include": [
        "src/**/*",
        "src/*.d.ts"
    ],
    "exclude": [
        "node_modules",
        "dist",
        "**/*.spec.ts"
    ]
}
```
#### 2. 修改app.js => app.ts
  - 修改报错

#### 3. 改造gulp部分 去除之前的逻辑

#### 4. 修改package.json中main

#### 5. 顺手升级了node版本