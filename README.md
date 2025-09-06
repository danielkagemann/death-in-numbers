# death in numbers

This is a web application to visualize mortality data from all over the world.
The data is taken from the [WHO database](https://www.who.int/data/data-collection-tools/who-mortality-database).

## motivation

I always wanted to start a project basedon on opendata. Mortality or death is not a lightweight topic but I thought it is worth to investigate
the data and visualize it to get some answers.
From a technical point I wanted to use the charting from shadcn ui :-)

## used dependencies/tech stack

- nextjs for client application
- tailwindcss as styling framework
- shadcn ui for design components
- nodejs for server scripting

## prepare the data

To make the data more useable we convert it into JSON format so in the `who` folder is some script which does the conversion.
To show the map with some data we use the coordinate information from https://restcountries.com/

Simply start via `npm run start` command to create the json file.

## web application

The web application is available in the application folder.
`npm run dev` for development environment.

Open the location `http://localhost:3000` in the browser.

### todos

- ascii skull as welcome screen
- ~~filter bar~~
- ~~world map~~
- ~~lots of filter routines~~
