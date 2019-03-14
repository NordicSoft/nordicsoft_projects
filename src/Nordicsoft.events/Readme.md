## Template for ASP.NET Core Web Application


### Installation

Install [Node.js with NPM](https://nodejs.org/) and [NPM Task Runner](http://vsixgallery.com/extension/d7f89ba3-815c-4feb-89b9-68d1654e2138/) for Visual Stuido

Open Task Runner: View -> Other Windows -> Task Runner Explorer.

Install the dependencies and devDependencies.

```sh
$ npm install
```



### Manually build frontend from Visual Studio

Install [NPM Task Runner](http://vsixgallery.com/extension/d7f89ba3-815c-4feb-89b9-68d1654e2138/)


View -> Other Windows -> Task Runner Explorer.

Now it's looks like this: 

![TaskRunner](./docs/TaskRunner.jpg "Task Runner")

**build** – use for development building of js and css (with sourcemap)

**release** – use for production optimizated building of js and css (minimized without sourcemaps)

**publish_debug** – publish with Debug profile (into bin\Debug\netcoreapp2.1\publish)

**publish_release** – publish with Release profile (into bin\Release\netcoreapp2.1\publish)

---

**Note:** If you run project from Visual Studio in Debug (using IIS Express), you shouldn't manually build frontend. It'will automatically build development js an css bundles before start.
