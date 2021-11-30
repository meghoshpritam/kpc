# Psymargiotta Theme

Check the live demo [here](http://www.psymargiotta.it.s3-website.eu-south-1.amazonaws.com/)

## Quick start

```bash
# clone the repository and change the directory
git clone https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/psymargiotta
cd psymargiotta

# install the dependency
npm i 
# or
yarn 

# start hugo server
hugo server
```

And open, [http://localhost:1313/](http://localhost:1313/) to your web browser .

## Production

```bash
# clone the repository and change the directory
git clone https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/psymargiotta
cd psymargiotta

# install the dependency
npm i 
# or
yarn 
```

- Important step

  set the `baseUrl` in the `config.toml` file located at the root directory. The `baseUrl` will be the location of the server where it will hosted.

- Build the hugo site with `hugo` command.

- It will create an `public` directory at the root of the project just publish the content of the public directory in the server an its done!