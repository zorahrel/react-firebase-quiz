# React-Firebase Quiz App.

I made this Quiz demo for the GDG Campania DevFest and Christmas Hack Party. I'll improve it with next dev events.
This small app is using my [react-redux-atomic-boilerplate](https://github.com/zorahrel/react-redux-atomic-boilerplate).

## Install dependencies

Firstly get your [Firebase free account](https://firebase.google.com/console/), create a project, open your console and create a user in **Develop** / **Auth** section.
Then you will have to paste the Rules that you can find in `firebase.rules` file and substitute my Project's admin user UID with yours.

Now set the right configuration array in `app/containers/app.jsx`. You can generate your own clicking "Web configuration" on the top-right side in your console.

Make sure you have installed Node and cloned this repo than install global npm packages with:

```
npm setup
```

Then make sure you install the require dependencies:

```
npm install
```

## Development

You can run the dev server with:

```
npm start
```

## Build

Build the app inside the `/public` folder.

```
npm run build
```

## Play the Quiz

User can access the app through `http://YOUR-INNER-IP:8080/`, admin can instead access through `http://YOUR-INNER-IP:8080/dashboard`
