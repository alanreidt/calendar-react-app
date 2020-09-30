# calendar-react-app
A calendar, that helps you to describe your week schedule.

[Demo-page](https://alanreidt.github.io/calendar-react-app/)

This app has brought up several challenges:
- It required consideration of how to store a task's date, 'cause tasks could be copied between days;
- In the context of state, it required to separate global state from local ones correctly, and to place the local state in the right component;
- Components required consideration too — there are several of them that are much alike, therefore they should represent a single unit;

Was realized as a part of [AGIMA](https://www.agima.ru/) Frontend Developer test tasks.

**Requirements**:
- [requirements in Russian](https://drive.google.com/file/d/1vlU_rxq_rifu6zqdm1ydGLX9ROdWlQar/view?usp=sharing).

## Aimed skills:
- React,
- Interaction with React libraries,
- Interaction with date,
- Storage of an application data,
- UI/UX considerations.

## Non-standard dependencies
- [react-easy-flip](https://github.com/jlkiri/react-easy-flip)

## Quick Start
To open the repo on your local machine use the following:
```bash
# clone the repo into the alanreidt-calendar-react-app folder
git clone https://github.com/alanreidt/calendar-react-app.git alanreidt-calendar-react-app

cd alanreidt-calendar-react-app

# install the repo dependencies
npm install
```

Available commands are:
```bash
# to build the dev version and open it in a browser
npm run start

# to build the production version into the build folder
npm run build
```

You can reach the page at http://localhost:4859/.

## Notes
The possible actions are: `add`, `remove`, `copy` and `update`. They are pretty obvious, but in order to update a task in a list, you need to hit `Enter`, otherwise it'd fallback after a page refresh.

## Possible improvements
There is a mistake in handling of data — `weekTasks` object is different with its version in a local storage at some point in time.

AntDesign form component causing trouble with the sorting animation of a tasks list. So, its replacement should solve the problem.
